"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------
   tokens & constants
------------------------------------------------------------------- */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const GITHUB_URL = "https://github.com/sponsors/Sam721166";
const COFFEE_URL = "https://buymeacoffee.com/samirande_";
const TWITTER_URL = "https://x.com/samirande_";

const EMPTY_SLOT_COUNT = 5;

function useInView({
  threshold = 0.08,
  rootMargin = "150px 0px 50px 0px",
}: { threshold?: number; rootMargin?: string } = {}) {
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
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
}

function MotionBlur({
  inView,
  delay = 0,
  blur = 8,
  children,
  className = "",
}: {
  inView: boolean;
  delay?: number;
  blur?: number;
  children: ReactNode;
  className?: string;
}) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setSettled(true), delay + 850);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <div
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
        filter: settled ? "none" : inView ? "blur(0px)" : `blur(${blur}px)`,
        transition: settled
          ? "none"
          : `opacity 650ms ${EASE_OUT} ${delay}ms, transform 750ms ${EASE_OUT} ${delay}ms, filter 650ms ${EASE_OUT} ${delay}ms`,
        willChange: settled ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   tooltip pill that pops above a tile on hover / keyboard focus
------------------------------------------------------------------- */
function Tip({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 -translate-x-1/2
        scale-75 whitespace-nowrap rounded-2xl bg-ink px-3.5 py-1.5 text-center
        text-xs font-medium text-white opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.28)]
        group-hover:scale-100 group-hover:opacity-100
        group-focus-visible:scale-100 group-focus-visible:opacity-100"
      style={{
        transformOrigin: "50% 100%",
        transition: `transform 260ms ${SPRING}, opacity 160ms ease-out`,
      }}
    >
      <span className="block font-semibold leading-tight text-white">{label}</span>
      {sublabel && (
        <span className="mt-0.5 block text-[10px] font-normal text-ink-muted">
          {sublabel}
        </span>
      )}
      <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 rounded-[2px] bg-ink" />
    </span>
  );
}

/* ------------------------------------------------------------------
   first box: website logo with matching light lime background
------------------------------------------------------------------- */
function FaviconTile({
  inView,
  index,
}: {
  inView: boolean;
  index: number;
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative list-none"
      style={{
        opacity: 0,
        animation: inView ? `sponsorPop 600ms ${SPRING} ${420 + index * 60}ms both` : "none",
      }}
    >
      <Link
        href="/"
        aria-label="Sketch Up website"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="group relative block h-[76px] w-[76px] cursor-pointer outline-none sm:h-24 sm:w-24 "
      >
        {/* Inner visual box: ONLY this translates on group-hover to prevent edge flickering */}
        <div
          className="relative flex h-full w-full items-center justify-center rounded-[18px_12px_20px_12px/12px_20px_12px_18px] group-hover:-translate-y-1.5 active:scale-95"
          style={{
            background: "#ecfccb", // light lime matching logo (#B5EE0A / #CEFF65)

            boxShadow: "inset 0 1px 0 #fff, 0 2px 8px rgba(181,238,10,0.22), 0 1px 2px rgba(0,0,0,0.04)",
            transition: `transform 350ms ${SPRING}, box-shadow 250ms ease, border-color 150ms`,
          }}
        >
          <img
            src="/logo.svg"
            alt="Sketch Up logo"
            draggable={false}
            className="h-full w-full select-none rounded-[18px_12px_20px_12px/12px_20px_12px_18px] transition-[rotate,scale] duration-300 group-hover:scale-105 border-2 border-ink/25"
            style={{
              rotate: hover ? "-8deg" : "0deg",
              transitionTimingFunction: SPRING,
            }}
          />
        </div>

        <Tip label="Sketch Up" sublabel="Official website" />
      </Link>
    </li>
  );
}

/* ------------------------------------------------------------------
   empty grey boxes with plus: available sponsor slots
------------------------------------------------------------------- */
function EmptySlotTile({
  index,
  inView,
  href = GITHUB_URL,
}: {
  index: number;
  inView: boolean;
  href?: string;
}) {
  return (
    <li
      className="relative list-none"
      style={{
        opacity: 0,
        animation: inView ? `sponsorPop 600ms ${SPRING} ${420 + index * 60}ms both` : "none",
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Empty sponsor slot — Click to sponsor"
        className="group relative block h-[76px] w-[76px] cursor-pointer outline-none sm:h-24 sm:w-24 focus-visible:ring-2 focus-visible:ring-pen focus-visible:ring-offset-2 rounded-[18px_12px_20px_12px/12px_20px_12px_18px]"
      >
        {/* Inner visual box: ONLY this translates on group-hover to prevent edge flickering */}
        <div
          className="relative flex h-full w-full items-center justify-center rounded-[18px_12px_20px_12px/12px_20px_12px_18px] group-hover:-translate-y-1.5 active:scale-95"
          style={{
            background: "var(--paper-card)", // empty grey div box
            border: "2px solid rgba(36,36,42,0.28)",
            boxShadow: "3px 3px 0 rgba(36,36,42,0.08)",
            transition: `transform 350ms ${SPRING}, box-shadow 250ms ease, border-color 150ms`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="h-7 w-7 sm:h-8 sm:w-8 text-ink-muted transition-[transform,color] duration-300 group-hover:rotate-90 group-hover:text-ink-soft"
            style={{ transitionTimingFunction: SPRING }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>

        <Tip label="Your company/name logo here" />
      </a>
    </li>
  );
}

/* ------------------------------------------------------------------
   under box 1: github (light grey background + github icon)
------------------------------------------------------------------- */
function GitHubTile({
  index,
  inView,
}: {
  index: number;
  inView: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative list-none"
      style={{
        opacity: 0,
        animation: inView ? `sponsorPop 600ms ${SPRING} ${420 + index * 60}ms both` : "none",
      }}
    >
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Sponsor on GitHub"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="group relative block h-[76px] w-[76px] cursor-pointer outline-none sm:h-24 sm:w-24 focus-visible:ring-2 focus-visible:ring-pen focus-visible:ring-offset-2 rounded-[18px_12px_20px_12px/12px_20px_12px_18px]"
      >
        {/* Inner visual box: ONLY this translates on group-hover to prevent edge flickering */}
        <div
          className="relative flex h-full w-full items-center justify-center rounded-[18px_12px_20px_12px/12px_20px_12px_18px] group-hover:-translate-y-1.5 active:scale-95"
          style={{
            background: "var(--paper-card)", // light grey background from GitHub
            border: "2px solid rgba(36,36,42,0.28)",
            boxShadow: "inset 0 1px 0 #fff, 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px -2px rgba(0,0,0,0.04)",
            transition: `transform 350ms ${SPRING}, box-shadow 250ms ease, border-color 150ms`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 sm:h-9 sm:w-9 text-ink transition-[transform,color] duration-300 group-hover:scale-110 group-hover:text-black"
            style={{
              rotate: hover ? "-6deg" : "0deg",
              transitionTimingFunction: SPRING,
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>

          {/* Mini Plus Badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white shadow-xs transition-transform duration-300 group-hover:scale-125">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="h-3 w-3">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </div>

        <Tip label="Sponsor on GitHub" />
      </a>
    </li>
  );
}

/* ------------------------------------------------------------------
   under box 2: buy me a coffee (light yellow background + coffee mug)
------------------------------------------------------------------- */
function CoffeeTile({
  index,
  inView,
}: {
  index: number;
  inView: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative list-none"
      style={{
        opacity: 0,
        animation: inView ? `sponsorPop 600ms ${SPRING} ${420 + index * 60}ms both` : "none",
      }}
    >
      <a
        href={COFFEE_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Buy me a coffee"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="group relative block h-[76px] w-[76px] cursor-pointer outline-none sm:h-24 sm:w-24 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-[18px_12px_20px_12px/12px_20px_12px_18px]"
      >
        {/* Inner visual box: ONLY this translates on group-hover to prevent edge flickering */}
        <div
          className="relative flex h-full w-full items-center justify-center rounded-[18px_12px_20px_12px/12px_20px_12px_18px] group-hover:-translate-y-1.5 active:scale-95"
          style={{
            background: "#fdf6d4", // light yellow background from Buy Me a Coffee
            border: "2px solid rgba(36,36,42,0.24)",
            boxShadow: "3px 3px 0 rgba(36,36,42,0.08)",
            transition: `transform 350ms ${SPRING}, box-shadow 250ms ease, border-color 150ms`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 sm:h-9 sm:w-9 text-amber-950 transition-[transform,color] duration-300 group-hover:scale-110 group-hover:text-amber-800"
            style={{
              rotate: hover ? "8deg" : "0deg",
              transitionTimingFunction: SPRING,
            }}
          >
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" y1="2" x2="6" y2="4" />
            <line x1="10" y1="2" x2="10" y2="4" />
            <line x1="14" y1="2" x2="14" y2="4" />
          </svg>

          {/* Mini Plus Badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white shadow-xs transition-transform duration-300 group-hover:scale-125">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="h-3 w-3">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </div>

        <Tip label="Buy me a coffee" />
      </a>
    </li>
  );
}

/* ------------------------------------------------------------------
   under box 3: twitter / X (light sky/blue background + X logo + DM badge)
------------------------------------------------------------------- */
function TwitterTile({
  index,
  inView,
}: {
  index: number;
  inView: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative list-none"
      style={{
        opacity: 0,
        animation: inView ? `sponsorPop 600ms ${SPRING} ${420 + index * 60}ms both` : "none",
      }}
    >
      <a
        href={TWITTER_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Talk in DM on X"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="group relative block h-[76px] w-[76px] cursor-pointer outline-none sm:h-24 sm:w-24 focus-visible:ring-2 focus-visible:ring-pen focus-visible:ring-offset-2 rounded-[18px_12px_20px_12px/12px_20px_12px_18px]"
      >
        {/* Inner visual box: ONLY this translates on group-hover to prevent edge flickering */}
        <div
          className="relative flex h-full w-full items-center justify-center rounded-[18px_12px_20px_12px/12px_20px_12px_18px] group-hover:-translate-y-1.5 active:scale-95"
          style={{
            background: "#ece6d8", // light blackish / graphite to match the other 2
            border: "1px solid #d4d4d8",
            boxShadow: "inset 0 1px 0 #fff, 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px -2px rgba(0,0,0,0.05)",
            transition: `transform 350ms ${SPRING}, box-shadow 250ms ease, border-color 150ms`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 sm:h-8 sm:w-8 text-black transition-[transform,opacity] duration-300 group-hover:scale-110"
            style={{
              rotate: hover ? "-6deg" : "0deg",
              transitionTimingFunction: SPRING,
            }}
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>

          {/* Mini DM Badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white shadow-xs transition-transform duration-300 group-hover:scale-125">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
              <path d="M4.5 3.75A2.25 2.25 0 002.25 6v9a2.25 2.25 0 002.25 2.25h1.5v3.25a.75.75 0 001.28.53l3.78-3.78h7.44A2.25 2.25 0 0020.75 15V6a2.25 2.25 0 00-2.25-2.25H4.5z" />
            </svg>
          </span>
        </div>

        <Tip label="Talk in DM" sublabel="@samirande_ on X" />
      </a>
    </li>
  );
}

/* ------------------------------------------------------------------
   section
------------------------------------------------------------------- */
export default function Sponsor() {
  const [sectionRef, inView] = useInView();
  const [starTurns, setStarTurns] = useState(0);

  return (
    <section
      ref={sectionRef}
      id="sponsor"
      className="relative z-10 mx-auto max-w-6xl px-4 pt-5 pb-20 overflow-visible"
    >
      <style>{`
        @keyframes sponsorPop {
          0% { opacity: 0; transform: translateY(14px) scale(0.6) rotate(-6deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
        .sponsor-sheet {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 18px 14px;
          margin: 0;
          padding: 8px 0 28px;
          list-style: none;
        }
        .sponsor-sheet > li:nth-child(3n) > a { transform: rotate(4deg) translateY(10px); }
        .sponsor-sheet > li:nth-child(3n+2) > a { transform: rotate(-3.5deg) translateY(-6px); }
        @media (min-width: 768px) {
          .sponsor-sheet {
            position: relative;
            display: block;
            height: 340px;
          }
          .sponsor-sheet > li { position: absolute; }
          .sponsor-sheet > li:nth-child(1) { left: 4%; top: 18%; }
          .sponsor-sheet > li:nth-child(2) { left: 18%; top: 4%; }
          .sponsor-sheet > li:nth-child(3) { left: 32%; top: 28%; }
          .sponsor-sheet > li:nth-child(4) { left: 46%; top: 6%; }
          .sponsor-sheet > li:nth-child(5) { left: 58%; top: 30%; }
          .sponsor-sheet > li:nth-child(6) { left: 72%; top: 8%; }
          .sponsor-sheet > li:nth-child(7) { left: 14%; top: 52%; }
          .sponsor-sheet > li:nth-child(8) { left: 40%; top: 58%; }
          .sponsor-sheet > li:nth-child(9) { left: 66%; top: 50%; }
          .sponsor-sheet > li > a { transform: none; }
          .sponsor-sheet > li:nth-child(1) > a { transform: rotate(-7deg); }
          .sponsor-sheet > li:nth-child(2) > a { transform: rotate(5deg); }
          .sponsor-sheet > li:nth-child(3) > a { transform: rotate(-3deg); }
          .sponsor-sheet > li:nth-child(4) > a { transform: rotate(6deg); }
          .sponsor-sheet > li:nth-child(5) > a { transform: rotate(-5deg); }
          .sponsor-sheet > li:nth-child(6) > a { transform: rotate(3deg); }
          .sponsor-sheet > li:nth-child(7) > a { transform: rotate(4deg); }
          .sponsor-sheet > li:nth-child(8) > a { transform: rotate(-6deg); }
          .sponsor-sheet > li:nth-child(9) > a { transform: rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          #sponsor * { animation-duration: 0.01ms !important; }
          .sponsor-sheet > li > a { transform: none !important; }
        }
      `}</style>


      {/* Clean section content without border or shadow */}
      <div className="relative mx-auto max-w-3xl sm:max-w-4xl px-2 sm:px-4">
        {/* Heading: Geist font, normal font weight font-sans */}
        <MotionBlur inView={inView} delay={0}>
          <h2 className="flex items-center gap-3 font-display text-[2.25rem] font-[550] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Sponsors.
            <img
              src="/stickers/face.svg"
              alt=""
              draggable={false}
              onClick={() => setStarTurns((t) => t + 1)}
              className="h-10 w-10 sm:h-15 sm:w-15 cursor-pointer select-none transition-transform duration-500 hover:rotate-[24deg] hover:scale-120"
              style={{
                transitionTimingFunction: SPRING,
                rotate: `${starTurns * 360 - 8}deg`,
              }}
            />
          </h2>
        </MotionBlur>

        {/* Narrative paragraph */}
        <MotionBlur inView={inView} delay={100}>
          <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-ink-soft sm:text-xl">
            You just scrolled to the good part of the page. Sketch Up is built by
            one student, for everyone, and it keeps going because of kind sponsors like you.
          </p>
        </MotionBlur>

        {/* "Slots are empty" text note */}
        <MotionBlur inView={inView} delay={160}>
          <div className="mt-7 flex items-center gap-2 font-hand text-[15px] text-ink-muted sm:mt-8 sm:text-base">

            <span>Slots are empty, click any slot to add your logo</span>
          </div>
        </MotionBlur>

        {/* Sponsor boxes */}
        <ul className="sponsor-sheet mt-6 sm:mt-7">
          <FaviconTile inView={inView} index={0} />
          {Array.from({ length: EMPTY_SLOT_COUNT }).map((_, i) => (
            <EmptySlotTile key={i} index={i + 1} inView={inView} />
          ))}
          <GitHubTile index={EMPTY_SLOT_COUNT + 1} inView={inView} />
          <CoffeeTile index={EMPTY_SLOT_COUNT + 2} inView={inView} />
          <TwitterTile index={EMPTY_SLOT_COUNT + 3} inView={inView} />
        </ul>

        {/* Sign-off linking to portfolio */}
        <MotionBlur inView={inView} delay={450}>
          <p className="mt-10 font-display text-xl leading-snug text-ink-soft sm:mt-12 sm:text-2xl">
            Thank you all.
            <br />
            <a
              href="https://samworks.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-ink underline decoration-pen decoration-2 underline-offset-4 transition-colors hover:text-pen"
            >
              Sam.
            </a>
          </p>
        </MotionBlur>
      </div>
    </section>
  );
}
