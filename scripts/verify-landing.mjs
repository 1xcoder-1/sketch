import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = process.env.PREVIEW_URL || "http://localhost:3001";
const chrome = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifacts = path.resolve(".qoder/landing-checks");
await mkdir(artifacts, { recursive: true });
const browser = spawn(chrome, ["--headless", "--disable-gpu", "--no-first-run", "--remote-debugging-port=9223", `--user-data-dir=${path.join(artifacts, "profile")}`, "about:blank"], { stdio: "ignore" });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
let nextId = 0;
const pending = new Map();
const pageErrors = [];

async function until(check, label, timeout = 20000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const result = await check();
    if (result) return result;
    await delay(100);
  }
  throw new Error(`Timed out: ${label}`);
}
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 20000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true, userGesture: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function click(selector) {
  const point = await evaluate(`(() => { const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
  await send("Input.dispatchMouseEvent", { type: "mousePressed", ...point, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", ...point, button: "left", clickCount: 1 });
}
async function screenshot(name) {
  const image = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(path.join(artifacts, name), Buffer.from(image.data, "base64"));
}
async function viewport(width, height) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await delay(300);
}

try {
  const target = await until(async () => {
    try { return (await (await fetch("http://127.0.0.1:9223/json/list")).json()).find((page) => page.type === "page"); }
    catch { return false; }
  }, "headless Chrome startup");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === "Runtime.exceptionThrown") pageErrors.push(message.params.exceptionDetails.text);
    const entry = pending.get(message.id);
    if (!entry) return;
    clearTimeout(entry.timer);
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(JSON.stringify(message.error)));
    else entry.resolve(message.result);
  });
  await send("Runtime.enable");
  await send("Page.enable");
  await viewport(1440, 1100);
  await send("Page.navigate", { url: origin });
  await until(() => evaluate(`!!document.querySelector('.hero-backdrop[data-ready="true"]')`), "mountain image load");
  await evaluate("document.fonts.ready.then(() => true)");
  await delay(1200);

  const style = await evaluate(`(() => { const h=document.querySelector('h1'); const bg=document.querySelector('.hero-backdrop'); return {weight:getComputedStyle(h).fontWeight,font:getComputedStyle(h).fontFamily,mask:getComputedStyle(bg).maskImage,filter:getComputedStyle(bg).filter,height:bg.clientHeight,dot:getComputedStyle(document.querySelector('.studio-links li+li'),'::before').content,nav:document.querySelector('.studio-navigation').clientWidth}; })()`);
  assert.equal(style.weight, "400");
  assert.match(style.font, /Geist/);
  assert.equal(style.height, 480);
  assert.equal(style.filter, "none");
  assert.match(style.mask, /50%/);
  assert.equal(style.dot, "none");
  assert.equal(style.nav, 768);

  await click(".terminal-playback");
  const before = await evaluate("document.querySelector('.terminal-code').innerText");
  await delay(400);
  assert.equal(await evaluate("document.querySelector('.terminal-code').innerText"), before);
  await click(".terminal-playback");
  await until(() => evaluate("!!document.querySelector('.terminal-success')"), "terminal completion", 14000);
  await delay(600);
  assert.ok(await evaluate("document.querySelector('.terminal-viewport').scrollTop > 0"));
  await screenshot("desktop.png");
  await until(() => evaluate("!document.querySelector('.terminal-block')"), "terminal loop reset", 6000);

  await send("Browser.grantPermissions", { origin, permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] });
  await click(".hero-install");
  await until(() => evaluate("document.querySelector('.hero-install').getAttribute('aria-label') === 'Copied to clipboard'"), "clipboard feedback");
  assert.equal(await evaluate("navigator.clipboard.readText()"), "npm i stick-it-up@latest");

  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 40, y: 40 });
  await delay(2000);
  const base = await evaluate("document.querySelector('.hero-backdrop canvas').toDataURL()");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 720, y: 120 });
  await delay(1000);
  assert.notEqual(await evaluate("document.querySelector('.hero-backdrop canvas').toDataURL()"), base, "Pointer should change the canvas pixels");
  await screenshot("desktop-lens.png");

  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await delay(300);
  assert.equal(await evaluate("!!document.querySelector('.terminal-success') && !document.querySelector('.terminal-playback')"), true);
  const still = await evaluate("document.querySelector('.terminal-code').innerText");
  await delay(300);
  assert.equal(await evaluate("document.querySelector('.terminal-code').innerText"), still);
  const staticCanvas = await evaluate("document.querySelector('.hero-backdrop canvas').toDataURL()");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 600, y: 160 });
  await delay(300);
  assert.equal(await evaluate("document.querySelector('.hero-backdrop canvas').toDataURL()"), staticCanvas);

  for (const width of [390, 320]) {
    await viewport(width, 900);
    const layout = await evaluate(`(() => { const h=document.querySelector('h1'); const lines=[...h.querySelectorAll('.hero-heading-line')]; return {overflow:document.documentElement.scrollWidth>innerWidth,lines:lines.length,fits:lines.every(line=>line.scrollWidth<=line.clientWidth+1),weight:getComputedStyle(h).fontWeight}; })()`);
    assert.equal(layout.overflow, false, `Horizontal overflow at ${width}px`);
    assert.equal(layout.lines, 2);
    assert.equal(layout.fits, true, `Heading clipping at ${width}px`);
    assert.equal(layout.weight, "400");
    await click(".studio-menu-toggle");
    assert.equal(await evaluate("document.querySelector('.studio-menu-toggle').getAttribute('aria-expanded')"), "true");
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    assert.equal(await evaluate("document.querySelector('.studio-menu-toggle').getAttribute('aria-expanded')"), "false");
    await screenshot(`mobile-${width}.png`);
  }
  await click(".hero-docs");
  await until(() => evaluate("location.pathname === '/stickers' && location.hash === '#docs'"), "documentation link");
  assert.deepEqual(pageErrors, []);
  console.log("PASS: desktop/mobile layout, mountain load, lens response, prior typography, no nav dots, terminal playback/reset/scroll, reduced motion, clipboard, menu, docs.");
  console.log(`Screenshots: ${artifacts}`);
} finally {
  if (socket?.readyState === WebSocket.OPEN) {
    try { await send("Browser.close"); } catch { /* Chrome can close before replying. */ }
    socket.close();
  }
  if (browser.exitCode === null) browser.kill();
}
