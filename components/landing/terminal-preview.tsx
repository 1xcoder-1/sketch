"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { getTerminalFrame, TERMINAL_CYCLE_MS } from "./terminal-timeline";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function getReducedMotion() {
  return window.matchMedia(MOTION_QUERY).matches;
}
function getServerMotion() {
  return false;
}

export default function TerminalPreview() {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { stage, progress, spinner } = getTerminalFrame(elapsed, reducedMotion);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const element = containerRef.current;
    if (!element) return;
    let inView = false;
    let last = performance.now();
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      last = performance.now();
    });
    observer.observe(element);
    const interval = window.setInterval(() => {
      const now = performance.now();
      const delta = now - last;
      last = now;
      if (inView && !document.hidden) {
        setElapsed((previous) => (previous + delta) % TERMINAL_CYCLE_MS);
      }
    }, 100);
    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, [paused, reducedMotion]);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport || paused) return;
    const target = stage === 0 ? 0 : viewport.scrollHeight - viewport.clientHeight;
    if (reducedMotion || stage === 0) {
      viewport.scrollTop = target;
      return;
    }
    const from = viewport.scrollTop;
    const start = performance.now();
    let animation = 0;
    function scroll(now: number) {
      if (!viewport) return;
      const fraction = Math.min((now - start) / 450, 1);
      viewport.scrollTop = from + (target - from) * (1 - Math.pow(1 - fraction, 3));
      if (fraction < 1) animation = requestAnimationFrame(scroll);
    }
    animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, [stage, reducedMotion, paused]);

  return (
    <div className="terminal-demo" ref={containerRef}>
      <div className="terminal-preview">
        <div className="terminal-titlebar">
          <div className="terminal-dots" aria-hidden="true"><i /><i /><i /></div>
          <span>Terminal — stick-it-up</span>
          {!reducedMotion && (
            <button
              type="button"
              className="terminal-playback"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "Play terminal demo" : "Pause terminal demo"}
              title={paused ? "Play demo" : "Pause demo"}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          )}
        </div>
        <div className="terminal-tabbar" aria-hidden="true">
          <span key={stage >= 3 ? "code" : "shell"} className="terminal-tab-label">
            {stage >= 3 ? "app.tsx" : "~/your-next-big-thing"}
          </span>
          <span className="terminal-tab-plus">+</span>
        </div>
        <p className="sr-only">
          Installation example: run npm i stick-it-up@latest, then import
          BlueberrySticker from stick-it-up and render it in your React component.
          This is an illustrative demo, not a live installation.
        </p>
        <div className="terminal-viewport" ref={scrollRef} aria-hidden="true" data-scrolled={stage >= 4}>
          <div className="terminal-code">
            <p><span className="term-muted">$ </span>npm i stick-it-up@latest{stage === 0 && <span className="terminal-cursor" />}</p>
            {stage >= 1 && (
              <div className="terminal-block">
                <p className="term-muted"><span className="term-blue">{stage >= 2 ? "✓" : spinner}</span> Resolving package…</p>
                <p><span className="term-green">{stage >= 2 ? "✓" : spinner}</span> Installing stick-it-up <span className="term-amber">{progress}%</span></p>
                <div className="terminal-progress"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
              </div>
            )}
            {stage >= 2 && (
              <div className="terminal-block">
                <p><span className="term-green">✓</span> Package installed. A little personality, ready to go.</p>
                <p className="term-muted">SVG stickers. React components. Yours to play with.</p>
              </div>
            )}
            {stage >= 3 && (
              <div className="terminal-block terminal-example">
                <div className="terminal-file"><span>app.tsx</span><span className="term-muted">React</span></div>
                <pre><code><span className="term-pink">import</span>{" { "}<span className="term-blue">BlueberrySticker</span>{" } "}<span className="term-pink">from</span>{" "}<span className="term-green">&quot;stick-it-up&quot;</span>{";\n\n"}<span className="term-pink">export default function</span>{" "}<span className="term-blue">App</span>{"() {\n  "}<span className="term-pink">return</span>{" (\n    <main>\n"}<span className="terminal-diff">{"      <BlueberrySticker size={120} />"}</span>{"\n    </main>\n  );\n}"}</code></pre>
              </div>
            )}
            {stage >= 4 && (
              <div className="terminal-block">
                <p><span className="term-blue">{stage >= 5 ? "✓" : spinner}</span> {stage >= 5 ? "Your component is ready." : "Adding a little personality…"}</p>
                <p className="term-muted">One import. One component. That’s it.</p>
              </div>
            )}
            {stage >= 5 && (
              <div className="terminal-block terminal-success">
                <img src="/stickers/blueberry.svg" alt="" width={48} height={48} />
                <div><p className="term-green">Ready to stick around.</p><p className="term-muted">Make something that feels like you.</p></div>
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="terminal-caption"><span /> A tiny install. A lot of personality. <span className="terminal-demo-label">Installation demo</span></p>
    </div>
  );
}
