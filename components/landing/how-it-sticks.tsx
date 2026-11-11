"use client";

import { useEffect, useRef, useState } from "react";

const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "200px 0px 80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView] as const;
}

const NOTES: { kicker: string; title: string; body: string; code: string; rot: number; y: string }[] = [
  {
    kicker: "01",
    title: "Install",
    body: "One command. The pack lands in your project.",
    code: "npm i stick-it-up@latest",
    rot: -2.5,
    y: "0px",
  },
  {
    kicker: "02",
    title: "Import",
    body: "Pull in the sticker you actually want.",
    code: 'import { Sticker } from "stick-it-up"',
    rot: 1.6,
    y: "28px",
  },
  {
    kicker: "03",
    title: "Peel",
    body: "Drop it on a hero, a card, or an empty state.",
    code: "<Sticker name=\"pink-cat\" peel />",
    rot: -1.2,
    y: "8px",
  },
];

function Note({
  inView,
  delay,
  kicker,
  title,
  body,
  code,
  rot,
  y,
}: {
  inView: boolean;
  delay: number;
  kicker: string;
  title: string;
  body: string;
  code: string;
  rot: number;
  y: string;
}) {
  return (
    <article
      className="stick-note relative w-full max-w-sm rounded-[28px] px-6 py-7 sm:px-7"
      style={{
        background: "linear-gradient(180deg, #fffdf6 0%, #fff4d4 100%)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 24px rgba(0,0,0,0.06)",
        ["--note-rot" as string]: `${rot}deg`,
        ["--note-y" as string]: y,
        opacity: inView ? 1 : 0,
        transform: inView ? undefined : "translateY(16px)",
        transition: `opacity 500ms ${EASE_OUT} ${delay}ms, transform 500ms ${EASE_OUT} ${delay}ms`,
      }}
    >
      <p className="font-mono text-xs tracking-[0.16em] text-zinc-400">{kicker}</p>
      <h3 className="mt-2 font-sans text-2xl font-medium tracking-tight text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{body}</p>
      <p className="mt-5 overflow-x-auto rounded-xl bg-white/70 px-3 py-2 font-mono text-[13px] text-zinc-800">
        {code}
      </p>
    </article>
  );
}

export default function HowItSticks() {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} id="how" className="relative z-10 mx-auto mb-6 max-w-6xl px-4 py-16 sm:px-8">
      <style>{`
        .stick-note {
          transform: rotate(var(--note-rot)) translateY(var(--note-y));
        }
        @media (max-width: 767px) {
          .stick-note:nth-child(odd) { margin-left: 0; }
          .stick-note:nth-child(even) { margin-left: 12%; }
          .stick-note { --note-y: 0px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .stick-note { transform: none; transition: opacity 200ms ease; }
        }
      `}</style>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-sans text-4xl font-normal leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl">
          How it sticks.
        </h2>
        <p className="mt-4 text-base text-neutral-400">
          Three moves. Then the page has a personality.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-0">
        {NOTES.map((note, i) => (
          <div key={note.title} className={i === 1 ? "md:-mx-8 md:z-10" : "md:z-0"}>
            <Note inView={inView} delay={80 + i * 70} {...note} />
          </div>
        ))}
      </div>
    </section>
  );
}
