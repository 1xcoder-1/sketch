"use client";

import { useEffect, useRef, useState } from "react";

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const DWELL = 2600;

const FRAMES = [
  { src: "/stickers/cat.svg", name: "Cat" },
  { src: "/stickers/Flame.svg", name: "Flame" },
  { src: "/stickers/Curious%20blue%20globe.svg", name: "Globe" },
  { src: "/stickers/flower.svg", name: "Flower" },
  { src: "/stickers/Peace-hand.svg", name: "Peace" },
  { src: "/stickers/blueberry.svg", name: "Berry" },
];

export default function FlipStickers() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / DWELL, 1);
      if (bar.current) bar.current.style.transform = `scaleX(${t})`;
      if (t >= 1) {
        setIndex((i) => (i + 1) % FRAMES.length);
        if (bar.current) bar.current.style.transform = "scaleX(0)";
        start = now;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const frame = FRAMES[index];

  return (
    <section className="relative mx-4 mb-10 sm:mx-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[40px] border border-zinc-200/80 bg-zinc-50 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_auto] lg:py-16">
        <div>
          <h2 className="max-w-[12ch] font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-zinc-900 sm:text-5xl">
            One pack. A new face each beat.
          </h2>
        </div>

        <div className="mx-auto w-full max-w-[280px]">
          <div className="grid h-56 place-items-center" style={{ perspective: "800px" }}>
            <img
              key={frame.src}
              src={frame.src}
              alt={frame.name}
              draggable={false}
              className="h-40 w-40 object-contain"
              style={
                reduced
                  ? undefined
                  : { animation: `stickerFlip 420ms ${EASE_OUT} both` }
              }
            />
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-200">
              <div
              ref={bar}
              className="h-full origin-left rounded-full bg-zinc-900"
              style={{ transform: `scaleX(${reduced ? 1 : 0})` }}
            />
          </div>
          <p className="mt-3 text-center font-sans text-sm text-zinc-600">{frame.name}</p>
        </div>
      </div>
      <style>{`
        @keyframes stickerFlip {
          from { transform: rotateY(-50deg); opacity: 0.45; }
          to { transform: rotateY(0deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes stickerFlip { from, to { transform: none; opacity: 1; } }
        }
      `}</style>
    </section>
  );
}
