"use client";

import { useEffect, useRef } from "react";

const STICKERS = [
  "/stickers/face.svg",
  "/stickers/panda-bear-1.svg",
  "/stickers/panda-bear-1.svg",
  "/stickers/panda-bear-2.svg",
  "/stickers/panda-garland.svg",
  "/stickers/panda-bear-1.svg",
  "/stickers/face.svg",
];

const POOL = 16;

type Bit = {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  spin: number;
  life: number;
  src: number;
};

function fresh(): Bit {
  return { active: false, x: 0, y: 0, vx: 0, vy: 0, rot: 0, spin: 0, life: 0, src: 0 };
}

export default function GravityTrail() {
  const area = useRef<HTMLDivElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const bits = useRef<Bit[]>(Array.from({ length: POOL }, fresh));
  const reduced = useRef(false);
  const playing = useRef(false);
  const lastSpawn = useRef(0);
  const dropped = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const areaEl = area.current;
    if (!areaEl) return;

    let frame = 0;
    const step = () => {
      if (!playing.current) {
        frame = requestAnimationFrame(step);
        return;
      }
      const height = areaEl.clientHeight;
      bits.current.forEach((bit, i) => {
        const img = imgs.current[i];
        if (!img || !bit.active) return;
        bit.vy += 0.32;
        bit.x += bit.vx;
        bit.y += bit.vy;
        bit.rot += bit.spin;
        bit.life -= 1;
        if (bit.life <= 0 || bit.y > height + 40) {
          bit.active = false;
          img.style.opacity = "0";
          return;
        }
        img.style.opacity = bit.life < 18 ? String(bit.life / 18) : "1";
        img.style.transform = `translate3d(${bit.x}px, ${bit.y}px, 0) rotate(${bit.rot}deg)`;
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    const io = new IntersectionObserver(([entry]) => {
      playing.current = entry.isIntersecting;
    });
    io.observe(areaEl);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  function spawn(x: number, y: number, burst = false) {
    const slot = bits.current.findIndex((bit) => !bit.active);
    if (slot < 0) return;
    const bit = bits.current[slot];
    const img = imgs.current[slot];
    if (!img) return;
    bit.active = true;
    bit.x = x - 28;
    bit.y = y - 28;
    bit.vx = (Math.random() - 0.5) * (burst ? 2.2 : 1.2);
    bit.vy = burst ? Math.random() * 0.6 : -0.6;
    bit.rot = Math.random() * 30 - 15;
    bit.spin = (Math.random() - 0.5) * 3;
    bit.life = burst ? 80 : 64;
    bit.src = Math.floor(Math.random() * STICKERS.length);
    img.src = STICKERS[bit.src];
    img.style.opacity = "1";
    img.style.transform = `translate3d(${bit.x}px, ${bit.y}px, 0) rotate(${bit.rot}deg)`;
  }

  function dropIn() {
    if (reduced.current || dropped.current || !area.current) return;
    dropped.current = true;
    const width = area.current.clientWidth;
    for (let i = 0; i < 7; i++) {
      spawn(40 + Math.random() * (width - 80), -20 - i * 18, true);
    }
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced.current) return;
    const now = performance.now();
    if (now - lastSpawn.current < 48) return;
    lastSpawn.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    spawn(e.clientX - rect.left, e.clientY - rect.top);
  }

  return (
    <section className="relative mx-4 mb-10 overflow-hidden rounded-[40px] border border-zinc-200/80 bg-white sm:mx-6">
      <div className="mx-auto max-w-6xl px-6 pt-16 text-center sm:pt-20">
        <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-zinc-900 sm:text-5xl">
          They fall where you go.
        </h2>
      </div>
      <div
        ref={area}
        onPointerEnter={dropIn}
        onPointerMove={onMove}
        className="relative mt-8 h-[420px] w-full sm:h-[520px]"
      >
        {Array.from({ length: POOL }, (_, i) => (
          <img
            key={i}
            ref={(node) => {
              imgs.current[i] = node;
            }}
            alt=""
            draggable={false}
            className="pointer-events-none absolute top-0 left-0 h-14 w-14 select-none opacity-0"
          />
        ))}
      </div>
    </section>
  );
}
