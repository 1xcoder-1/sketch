"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const ShownCtx = createContext<boolean>(true);

/* ------------------------------------------------------------------
   tokens (same language as the folder section)
------------------------------------------------------------------- */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

function useInView({
  threshold = 0.05,
  rootMargin = "250px 0px 100px 0px",
  animateOnLoad = true,
  loadDelay = 280,
}: {
  threshold?: number;
  rootMargin?: string;
  animateOnLoad?: boolean;
  loadDelay?: number;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (animateOnLoad) {
      timer = setTimeout(() => {
        setInView(true);
      }, loadDelay);
    }

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
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [threshold, rootMargin, animateOnLoad, loadDelay]);

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

const GRAIN =
  "radial-gradient(rgba(0,0,0,0.18) 0.6px, transparent 0.7px)";

const TONES = {
  yellow: { from: "#fff6c2", to: "#ffdf59" },
  red: { from: "#e8404e", to: "#cf2f3d" },
  green: { from: "#effbd8", to: "#c6ee9a" },
  blue: { from: "#eef4ff", to: "#cedeFF" },
  lilac: { from: "#f8f0ff", to: "#e6d4ff" },
} as const;

type Tone = keyof typeof TONES;

const cardShadow: CSSProperties = {
  boxShadow: [
    "4px 6px 0 rgba(36,36,42,0.10)",
    "0 18px 36px -24px rgba(36,36,42,0.35)",
  ].join(","),
};

/* ------------------------------------------------------------------
   shell + type
------------------------------------------------------------------- */
function Card({
  tone,
  className = "",
  children,
}: {
  tone: Tone;
  className?: string;
  children: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[26px_16px_28px_14px/16px_28px_14px_26px] border-2 p-6 sm:p-8 ${className}`}
      style={{
        background: `linear-gradient(180deg, ${t.from} 0%, ${t.to} 100%)`,
        borderColor: "rgba(36,36,42,0.42)",
        ...cardShadow,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "3px 3px", opacity: 0.06 }}
      />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function Title({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h3
      className={`font-display text-2xl font-[550] leading-[1.15] tracking-tight sm:text-[28px] ${
        light ? "text-white" : "text-ink"
      }`}
      style={{ textShadow: light ? "0 1px 1px rgba(90,0,10,0.35)" : "none" }}
    >
      {children}
    </h3>
  );
}

function Lead({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mt-3 max-w-[18rem] text-[15px] leading-relaxed ${
        light ? "text-white/90" : "text-ink-soft"
      }`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------
   draggable sticker
------------------------------------------------------------------- */
function Sticker({
  src,
  size,
  left,
  top,
  rot,
  z,
}: {
  src: string;
  size: number;
  left: string;
  top: string;
  rot: number;
  z?: number;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const start = useRef({ px: 0, py: 0, x: 0, y: 0 });
  const dragging = useRef(false);
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);

  function writePos() {
    const el = elRef.current;
    if (!el) return;
    el.style.translate = `${pos.current.x}px ${pos.current.y}px`;
  }

  return (
    <div className="absolute" style={{ left, top, width: size, zIndex: z }}>
      <div
        ref={elRef}
        data-sticker
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          start.current = { px: e.clientX, py: e.clientY, x: pos.current.x, y: pos.current.y };
          dragging.current = true;
          setDrag(true);
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          pos.current = {
            x: start.current.x + e.clientX - start.current.px,
            y: start.current.y + e.clientY - start.current.py,
          };
          writePos();
        }}
        onPointerUp={() => {
          dragging.current = false;
          setDrag(false);
        }}
        onPointerCancel={() => {
          dragging.current = false;
          setDrag(false);
        }}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="touch-none select-none"
        style={{
          rotate: `${rot + (drag ? -5 : hover ? 7 : 0)}deg`,
          scale: drag ? 1.14 : hover ? 1.06 : 1,
          cursor: drag ? "grabbing" : "grab",
          filter: drag ? "drop-shadow(0 14px 12px rgba(0,0,0,0.22))" : "none",
          transition: drag
            ? "scale 200ms ease-out"
            : `scale 450ms ${SPRING}, rotate 450ms ${SPRING}`,
        }}
      >
        <img src={src} alt="" draggable={false} className="block h-auto w-full" />
      </div>
    </div>
  );
}

function PeelDemo() {
  return (
    <div className="peel-demo relative mt-auto flex h-44 items-end justify-center pb-2">
      <div aria-hidden className="peel-shadow absolute bottom-6 h-10 w-24 rounded-full bg-black/25" />
      <img
        src="/stickers/face.svg"
        alt=""
        draggable={false}
        className="peel-sticker relative h-28 w-28 select-none"
      />
      <style>{`
        .peel-sticker {
          transform: rotate(-8deg);
          transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .peel-shadow {
          transform: translateY(0) scale(0.85);
          opacity: 0.28;
          filter: blur(8px);
          transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 220ms ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .peel-demo:hover .peel-sticker {
            transform: rotate(8deg) translateY(-12px);
          }
          .peel-demo:hover .peel-shadow {
            transform: translate(10px, 6px) scale(1);
            opacity: 0.2;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .peel-sticker, .peel-shadow { transition: opacity 200ms ease; }
          .peel-demo:hover .peel-sticker { transform: rotate(-8deg); }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------
   small pieces
------------------------------------------------------------------- */
function Check() {
  return (
    <span
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
      style={{
        background: "linear-gradient(180deg,#ffffff,#f1ece0)",
        boxShadow: "inset 0 1px 0 #fff, 0 1px 1px rgba(0,0,0,0.2), 0 2px 3px rgba(120,80,0,0.01)",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2.6" className="h-3.5 w-3.5">
        <path d="m6 12.5 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function AppleLogo() {
  return (
    <svg
      viewBox="0 0 22.773 22.773"
      width={44}
      height={44}
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Apple logo"
      role="img"
    >
      <path d="M15.769,0c.053,0,.106,0,.162,0,.13,1.606-.483,2.806-1.228,3.675-.731.863-1.732,1.7-3.351,1.573-.108-1.583.506-2.694,1.25-3.561C13.292,.879,14.557,.16,15.769,0Z" />
      <path d="M20.67,16.716c0,.016,0,.03,0,.045-.455,1.378-1.104,2.559-1.896,3.655-.723.995-1.609,2.334-3.191,2.334-1.367,0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926-.155,0-.31,0-.462,0-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482,1.311-4.5,2.914-5.478.846-.52,2.009-.963,3.304-.765.555.086,1.122.276,1.619.464.471.181,1.06.502,1.618.485.378-.011.754-.208,1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262,2.963,1.032,3.723,2.22-1.466.933-2.625,2.339-2.427,4.74.114,2.181,1.382,3.457,2.966,4.209Z" />
    </svg>

  );
}

/* tactile keycap with a sticker on top */
function Key({ label, src, rot }: { label: string; src: string; rot: number }) {
  const [down, setDown] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        aria-label={label}
        onPointerDown={() => setDown(true)}
        onPointerUp={() => setDown(false)}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => {
          setDown(false);
          setHover(false);
        }}
        className="relative h-[76px] w-[76px] cursor-pointer rounded-[22px] outline-none"
        style={{
          background: "linear-gradient(180deg,#ffffff 0%,#eef6dc 100%)",
          translate: down ? "0 4px" : "0 0",
          boxShadow: down
            ? "inset 0 2px 5px rgba(0,0,0,0.12), 0 1px 0 #fff"
            : "inset 0 1px 0 #fff, 0 6px 0 #a9d77a",
          transition: `translate 160ms ${SPRING}, box-shadow 160ms ease-out`,
        }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[64px] w-[64px] select-none"
          style={{
            translate: "-50% -50%",
            rotate: `${rot + (hover ? 8 : 0) + (down ? -4 : 0)}deg`,
            scale: down ? 0.94 : hover ? 1.08 : 1,
            transition: `rotate 400ms ${SPRING}, scale 300ms ${SPRING}`,
          }}
        />
      </button>
      <span className="text-xs font-medium text-green-900/60" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.7)" }}>
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------
   yellow card: phone
------------------------------------------------------------------- */
function Phone() {
  return (
    <div className="relative mx-auto -mb-2.5 w-[272px] transition-transform duration-300 ease-out hover:-translate-y-2.5">
      {/* body */}
      <div
        className="relative h-[380px]"
        style={{
          borderRadius: "44px 44px 0 0",
          padding: "9px 9px 0",
          background: "linear-gradient(145deg,#44444b 0%,#17171a 55%,#2b2b30 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 0 0 1px rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.25), 0 28px 44px rgba(150,90,0,0.35)",
        }}
      >
        {/* side buttons */}
        <span className="absolute -left-[3px] top-[84px] h-8 w-[3px] rounded-l bg-ink/70" />
        <span className="absolute -left-[3px] top-[130px] h-12 w-[3px] rounded-l bg-ink/70" />
        <span className="absolute -right-[3px] top-[110px] h-16 w-[3px] rounded-r bg-ink/70" />

        {/* screen */}
        <div
          className="relative h-full overflow-hidden"
          style={{
            borderRadius: "36px 36px 0 0",
            background: "linear-gradient(180deg,#ffffff 0%,#f6f3ff 100%)",
          }}
        >
          {/* island + status */}
          <span className="absolute left-1/2 top-2 z-20 h-[20px] w-[68px] -translate-x-1/2 rounded-full bg-ink" />
          <span className="absolute left-5 top-[11px] text-[10px] font-semibold text-ink">9:41</span>
          <span className="absolute right-5 top-[13px] flex items-end  gap-[3px]">
            <span className="h-[7px] w-[3px] rounded-sm bg-ink" />
            <span className="h-[9px] w-[3px] rounded-sm bg-ink" />
            <span className="h-[11px] w-[3px] rounded-sm bg-ink" />
          </span>

          <div className="px-4 pt-11">
            {/* header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-ink-muted">Hello,</p>
                <p className="text-[17px] font-semibold leading-tight tracking-tight text-ink">
                  Good vibes only
                </p>
              </div>
              <span
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{
                  background: "#ffd6e6",
                  boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.08), 0 2px 5px rgba(0,0,0,0.12)",
                  border: "2px solid #fff",
                }}
              >
                <img src="/stickers/face.svg" alt="" draggable={false} className="h-6 w-6" />
              </span>
            </div>

            {/* hero tile */}
 <div
  className="relative mt-4 h-[124px]"
  style={{
    borderRadius: 20,
    background: "linear-gradient(180deg, #FFFCF4 0%, #FFE8B6 100%)",
    border: "1px solid #F8E8C5",
    boxShadow: `
      inset 0 1.5px 0 rgba(255,255,255,0.95),
      inset 0 -1px 0 rgba(221,177,91,0.18),
      0 1px 2px rgba(125,88,20,0.06),
      0 5px 12px rgba(125,88,20,0.08)
    `,
  }}
>
  <div className="absolute left-4 top-4">
    <p className="text-[10px] font-medium text-ink-muted">
      Today&rsquo;s pack
    </p>
    <p className="mt-0.5 text-[18px] font-semibold leading-tight text-ink">
      12 new
      <br />
      stickers
    </p>
    <span className="mt-2.5 inline-block rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium text-white shadow-sm">
      Open
    </span>
  </div>

  <Sticker src="/stickers/panda-bear-1.svg" size={78} left="56%" top="14%" rot={10} />
  <Sticker src="/stickers/panda-bear-2.svg" size={34} left="44%" top="62%" rot={0} />
</div>

            {/* tiles */}
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {[
                { src: "/stickers/panda-garland.svg", bg: "#e4eaff" },
                { src: "/stickers/panda-bear-1.svg", bg: "#fff1c2" },
                { src: "/stickers/face.svg", bg: "#ffe0ea" },
              ].map((t) => (
                <div
                  key={t.src}
                  className="relative aspect-square"
                  style={{
                    borderRadius: 18,
                    background: t.bg,

                  }}
                >
                  <img
                    src={t.src}
                    alt=""
                    draggable={false}
                    className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* loose stickers around the phone */}
      <Sticker src="/stickers/panda-bear-1.svg" size={78} left="-8%" top="-21%" rot={-12} z={20} />
      <Sticker src="/stickers/panda-bear-1.svg" size={60} left="58%" top="80%" rot={14} z={20} />
    </div>
  );
}

/* ------------------------------------------------------------------
   blue card: stack of UI cards
------------------------------------------------------------------- */
function Glass({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className="flex items-center gap-3 px-3.5"
      style={{
        height: 72,
        borderRadius: 22,
        background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,250,255,0.9))",
        border: "1px solid #fff",
        boxShadow:
          "inset 0 1px 0 #fff, 0 1px 2px rgba(30,60,130,0.1), 0 8px 18px rgba(30,60,130,0.12), 0 20px 36px rgba(30,60,130,0.08)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Tile({ src, bg }: { src: string; bg: string }) {
  return (
    <span
      className="relative h-11 w-11 shrink-0"
      style={{
        borderRadius: 14,
        background: bg,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2"
      />
    </span>
  );
}

function UiStack() {
  const shown = useContext(ShownCtx) ?? true;
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  /* after the entrance finishes, hover responses stop using the entrance delays */
  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, [shown]);

  const layers = [
    {
      y: open ? 0 : 12,
      scale: open ? 0.88 : 0.90,
      node: (
        <Glass>
          <Tile src="/stickers/panda-bear-2.svg" bg="#ffeed9" />
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-semibold text-ink-soft">Daily streak</p>
            <p className="truncate text-[11.5px] text-ink-muted">12 days in a row</p>
          </div>
          <span className="rounded-full bg-amber-100/90 px-2.5 py-0.5 text-[10.5px] font-semibold text-amber-700">
            +1
          </span>
        </Glass>
      ),
    },
    {
      y: open ? 86 : 50,
      scale: open ? 0.95 : 0.955,
      node: (
        <Glass>
          <Tile src="/stickers/panda-garland.svg" bg="#ffe3ec" />
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-semibold text-ink-soft">Mochi replied</p>
            <p className="truncate text-[11.5px] text-ink-muted">this site has so much personality</p>
          </div>
          <span className="text-[11px] font-medium text-ink/50">now</span>
        </Glass>
      ),
    },
    {
      y: open ? 172 : 88,
      scale: 1,
      node: (
        <Glass style={{ height: 76 }}>
          <Tile src="/stickers/panda-bear-1.svg" bg="#fff0b3" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-ink">Welcome back</p>
            <p className="truncate text-[11.5px] text-ink-muted">3 new stickers are waiting</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="rounded-full px-4 py-1.5 text-[12px] font-medium text-white shadow-sm transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer outline-none select-none"
            style={{
              background: "linear-gradient(180deg,#2b2b30,#18181b)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Open
          </button>
        </Glass>
      ),
    },
  ];

  return (
    <div
      className="relative mx-auto h-[272px] w-full max-w-[380px] cursor-pointer select-none md:mx-0 py-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
    >
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute inset-x-0"
          style={{
            top: 0,
            transform: `translate3d(0, ${l.y}px, 0) scale(${l.scale})`,
            zIndex: i + 1,
            transformOrigin: "center top",
            willChange: "transform",
            transition: ready
              ? "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)"
              : `transform 550ms ${SPRING} ${i * 45}ms`,
          }}
        >
          {l.node}
        </div>
      ))}
      <div
        className="pointer-events-none absolute select-none"
        style={{
          right: "2%",
          top: "-8%",
          zIndex: 10,
          transform: `translate3d(0, ${open ? 0 : 12}px, 0) rotate(14deg)`,
          transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        <img
          src="/stickers/face.svg"
          alt=""
          draggable={false}
          className="h-[54px] w-[54px]"
        />
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------
   section
------------------------------------------------------------------- */
export default function Bento() {
  const [sectionRef, inView] = useInView({ loadDelay: 280 });
  const [copied, setCopied] = useState(false);

  /* copy button feedback reset */
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText("npm i stick-it-up@latest");
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy command:", error);
    }
  }

  return (
    <ShownCtx.Provider value={inView}>
      <section
        ref={sectionRef}
        id="showcase"
        className="hand-panel mx-4 mb-10 overflow-hidden px-4 py-20 sm:px-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(36,36,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,36,42,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 20%, black 15%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 20%, black 15%, transparent 72%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          {/* heading */}
          <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
            <MotionBlur inView={inView} delay={0}>
              <h2 className="mt-5 font-display text-[2rem] font-[550] leading-[1.18] tracking-tight text-ink sm:text-5xl">
                Everything you need to <span className="marker">stick around.</span>
              </h2>
            </MotionBlur>
            <MotionBlur inView={inView} delay={100}>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Grab, drag and drop. Every sticker below is live, so go ahead and play.
              </p>
            </MotionBlur>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            {/* ---------- yellow: phone ---------- */}
            <MotionBlur inView={inView} delay={180} className="flex flex-col lg:col-span-4 lg:row-span-2">
              <Card tone="yellow" className="h-full min-h-[600px]">
                <Title>What&rsquo;s in the pack</Title>
                <ul className="mt-6 space-y-3.5">
                  {[
                    "Hand-drawn pastel stickers",
                    "Crisp SVG at any size",
                    "Drag, tilt and pop built in",
                    "One npm install",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[15px] font-medium text-ink-soft">
                      <Check />
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto -mb-6 pt-10 sm:-mb-8">
                  <div
                    style={{
                      transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 96px, 0)",
                      opacity: inView ? 1 : 0,
                      filter: inView ? "blur(0px)" : "blur(8px)",
                      transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 220ms, opacity 800ms ${EASE_OUT} 220ms, filter 700ms ${EASE_OUT} 220ms`,
                    }}
                  >
                    <Phone />
                  </div>
                </div>
              </Card>
            </MotionBlur>

            {/* ---------- red: laptop ---------- */}
            <MotionBlur inView={inView} delay={260} className="flex flex-col lg:col-span-5">
              <Card tone="red" className="h-full min-h-[360px]">
                <Title light>Stick it anywhere</Title>
                <Lead light>
                  Heroes, cards, empty states, 404s. Drop one in and the page gets a personality.
                </Lead>

                <div className="mt-auto -mb-6 -mr-12 ml-12 flex justify-center pt-10 sm:-mb-8">
                  <div
                    className="relative -mb-5 h-[180px] w-[92%]"
                    style={{
                      borderRadius: "12px 12px 0 0",
                      background: "linear-gradient(180deg,#f4f6f9 0%,#d6dbe2 60%,#c5cbd4 100%)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      boxShadow:
                        "inset 0 1px 0 #fff, inset 0 -6px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.12), 0 16px 28px rgba(120,0,15,0.35)",
                      transform: inView ? "translate3d(0, 0, 0)" : "translate3d(110px, 0, 0)",
                      opacity: inView ? 1 : 0,
                      filter: inView ? "blur(0px)" : "blur(8px)",
                      transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 280ms, opacity 800ms ${EASE_OUT} 280ms, filter 700ms ${EASE_OUT} 280ms`,
                    }}
                  >
                    <div className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2">
                      <AppleLogo />
                    </div>
                    <Sticker src="/stickers/face.svg" size={62} left="7%" top="-14%" rot={-10} />
                    <Sticker src="/stickers/panda-bear-1.svg" size={56} left="66%" top="-10%" rot={12} />
                    <Sticker src="/stickers/panda-bear-2.svg" size={52} left="76%" top="46%" rot={-6} />
                    <Sticker src="/stickers/panda-garland.svg" size={44} left="12%" top="52%" rot={6} />
                  </div>
                </div>
              </Card>
            </MotionBlur>

            {/* ---------- lilac: peel ---------- */}
            <MotionBlur inView={inView} delay={300} className="flex flex-col lg:col-span-3">
              <Card tone="lilac" className="h-full min-h-[280px]">
                <Title>Peel on hover</Title>
                <Lead>The vinyl lifts when a pointer arrives. That is the whole trick.</Lead>
                <PeelDemo />
              </Card>
            </MotionBlur>

            {/* ---------- green: sticker keys ---------- */}
            <MotionBlur inView={inView} delay={340} className="flex flex-col lg:col-span-8">
              <Card tone="green" className="h-full min-h-[360px]">
                <Title>Light to ship. Fun to touch.</Title>
                <Lead>Press the keys. Everything on the page behaves like the real thing.</Lead>

                <div className="mt-auto flex items-end justify-between gap-2 px-1 pb-2 pt-10">
                  <Key label="Vector" src="/stickers/panda-bear-1.svg" rot={-6} />
                  <Key label="Drag" src="/stickers/face.svg" rot={4} />
                  <Key label="Pop" src="/stickers/panda-bear-1.svg" rot={0} />
                </div>
              </Card>
            </MotionBlur>

            {/* ---------- blue: developers ---------- */}
            <MotionBlur inView={inView} delay={420} className="flex flex-col lg:col-span-7 lg:col-start-6">
              <Card tone="blue" className="h-full min-h-[340px]">
                <div className="flex flex-1 flex-col gap-10 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-sm">
                    <Title>
                      Designed
                      <br />
                      for developers
                    </Title>
                    <Lead>
                      Install once, import what you need, and give every screen of your site or app a
                      sticker-sized dose of character.
                    </Lead>

                    {/* Install button (identical to page.tsx) */}
                    <button
                      onClick={copyCommand}
                      aria-label={copied ? "Copied to clipboard" : "Copy npm i stick-it-up@latest"}
                      className={`group relative mt-6 inline-flex cursor-pointer items-center gap-3
                        border-2 py-3 pl-4 pr-5 font-mono text-sm
                        transition-all duration-300 ease-out
                        hover:-translate-y-px active:translate-y-px
                        ${
                          copied
                            ? "border-[#8fbf6a] bg-[#eefbd8] text-[#2f5a12]"
                            : "border-ink/45 bg-[#1b1c21] text-[#f4f1e8] hover:border-ink/70"
                        }`}
                      style={{ borderRadius: "14px 10px 16px 10px / 10px 16px 10px 14px" }}
                    >
                      {/* Text swap */}
                      <span className="relative grid" aria-live="polite">
                        <span
                          className={`col-start-1 row-start-1 transition-all duration-300 ease-out ${
                            copied
                              ? "-translate-y-1 opacity-0 blur-[2px]"
                              : "translate-y-0 opacity-100 blur-0"
                          }`}
                        >
                          npm i stick-it-up@latest
                        </span>

                        <span
                          className={`col-start-1 row-start-1 font-medium transition-all duration-300 ease-out ${
                            copied
                              ? "translate-y-0 opacity-100 blur-0 delay-75"
                              : "translate-y-1 opacity-0 blur-[2px]"
                          }`}
                        >
                          Copied!
                        </span>
                      </span>

                      {/* Copy icon -> check badge that draws itself */}
                      <span className="relative grid h-4 w-4 place-items-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className={`col-start-1 row-start-1 h-4 w-4 transition-all duration-200 ease-out ${
                            copied ? "scale-75 opacity-0" : "scale-100 opacity-100"
                          }`}
                        >
                          <rect x="8" y="3" width="12" height="15" rx="2" />
                          <path d="M5 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" />
                        </svg>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="col-start-1 row-start-1 h-4 w-4 overflow-visible"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            className="fill-emerald-500"
                            style={{
                              transformOrigin: "center",
                              transformBox: "fill-box",
                              transform: copied ? "scale(1)" : "scale(0.4)",
                              opacity: copied ? 1 : 0,
                              transition:
                                "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 150ms ease-out",
                            }}
                          />
                          <path
                            d="m7 12.5 3.2 3.2L17 8.8"
                            pathLength={1}
                            stroke="white"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              strokeDasharray: 1,
                              strokeDashoffset: copied ? 0 : 1,
                              transition: copied
                                ? "stroke-dashoffset 280ms ease-out 140ms"
                                : "stroke-dashoffset 120ms ease-in",
                            }}
                          />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <UiStack />
                </div>
              </Card>
            </MotionBlur>
          </div>
        </div>
      </section>
    </ShownCtx.Provider>
  );
}
