import assert from "node:assert/strict";
import { test } from "node:test";

const lens = await import("./hero-lens.ts").catch(() => null);

test("cover crop fills a wide viewport without stretching the mountain image", () => {
  assert.ok(lens, "Canvas lens geometry is not implemented yet");
  assert.deepEqual(lens.getCoverCrop(1600, 900, 1200, 480), {
    x: 0, y: 130, width: 1600, height: 640,
  });
});

test("cover crop centers the image on a narrow mobile viewport", () => {
  assert.deepEqual(lens.getCoverCrop(1600, 900, 300, 480), {
    x: 518.75, y: 0, width: 562.5, height: 900,
  });
});

test("lens influence peaks at the pointer and fades to zero at its radius", () => {
  assert.equal(lens.getLensInfluence(100, 100, 100, 100, 200), 1);
  assert.equal(lens.getLensInfluence(200, 100, 100, 100, 200), 0.5);
  assert.equal(lens.getLensInfluence(300, 100, 100, 100, 200), 0);
  assert.equal(lens.getLensInfluence(400, 100, 100, 100, 200), 0);
  assert.equal(lens.getLensInfluence(100, 100, 100, 100, 0), 0);
});

test("lens magnifies the center of each tile using the reference crop depth", () => {
  assert.equal(typeof lens.getLensCrop, "function", "Lens sampling geometry is missing");
  assert.deepEqual(lens.getLensCrop({ x: 120, y: 60, width: 60, height: 60 }, 0.5), {
    x: 135, y: 75, width: 30, height: 30,
  });
  assert.deepEqual(lens.getLensCrop({ x: 120, y: 60, width: 60, height: 60 }, 1), {
    x: 150, y: 90, width: 1, height: 1,
  });
  assert.deepEqual(lens.getLensCrop({ x: 20, y: 40, width: 80, height: 40 }, 0), {
    x: 20, y: 40, width: 80, height: 40,
  });
});

test("frame-rate-independent damping matches the measured 60fps response", () => {
  assert.equal(lens.damp(0, 1, 0.08, 1), 0.07999999999999996);
  const twoFrames = lens.damp(lens.damp(0, 1, 0.08, 1), 1, 0.08, 1);
  assert.ok(Math.abs(lens.damp(0, 1, 0.08, 2) - twoFrames) < 1e-10);
  assert.equal(lens.damp(1, 0, 0.025, 0), 1);
});
