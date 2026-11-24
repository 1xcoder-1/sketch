"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------
   tokens (same language as the rest of the landing page)
------------------------------------------------------------------- */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const GRAIN =
  "radial-gradient(rgba(0,0,0,0.18) 0.6px, transparent 0.7px)";

function useInView({
  threshold = 0.05,
  rootMargin = "250px 0px 100px 0px",
}: {
  threshold?: number;
  rootMargin?: string;
} = {}) {
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
   data
------------------------------------------------------------------- */
type LegalModalTab = "privacy" | "disclaimer" | "takedown" | "license";

interface FooterLink {
  label: string;
  href?: string;
  action?: LegalModalTab;
  sticker: string;
  rot?: number;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Stickers", href: "/stickers", sticker: "/stickers/face.svg", rot: 12 },
      { label: "Docs", href: "/usage", sticker: "/stickers/panda-bear-1.svg", rot: -8 },
      { label: "npm", href: "https://www.npmjs.com/package/stick-it-up", sticker: "/stickers/panda-bear-1.svg", rot: 6 },
      { label: "Releases", href: "https://github.com/Sam721166/stick-it-up/releases", sticker: "/stickers/panda-bear-2.svg", rot: -10 },
    ],
  },
  {
    title: "Contribute",
    links: [
      { label: "Submit a Sticker", href: "https://github.com/Sam721166/stick-it-up/pulls", sticker: "/stickers/panda-garland.svg", rot: -10 },
      { label: "Contribution Guide", href: "https://github.com/Sam721166/stick-it-up/blob/main/CONTRIBUTING.md", sticker: "/stickers/panda-bear-1.svg", rot: 8 },
      { label: "Request a Sticker", href: "https://github.com/Sam721166/stick-it-up/issues/new?labels=sticker-request&title=[Sticker+Request]:+", sticker: "/stickers/face.svg", rot: 6 },
      { label: "Sticker Files", href: "https://github.com/Sam721166/stick-it-up/tree/main/public/stickers", sticker: "/stickers/panda-bear-1.svg", rot: -8 },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/Sam721166/stick-it-up", sticker: "/stickers/panda-bear-1.svg", rot: 8 },
      { label: "Sponsor (GitHub)", href: "https://github.com/sponsors/Sam721166", sticker: "/stickers/panda-bear-2.svg", rot: -8 },
      { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/samirande_", sticker: "/stickers/panda-garland.svg", rot: 10 },
      { label: "X / Twitter", href: "https://x.com/samirande_", sticker: "/stickers/panda-bear-1.svg", rot: 10 },
      { label: "Issues & Feedback", href: "https://github.com/Sam721166/stick-it-up/issues", sticker: "/stickers/face.svg", rot: -6 },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", action: "privacy", sticker: "/stickers/panda-bear-1.svg", rot: 8 },
      { label: "Art Disclaimer", action: "disclaimer", sticker: "/stickers/panda-bear-1.svg", rot: -10 },
      { label: "Takedown Request", action: "takedown", sticker: "/stickers/face.svg", rot: 6 },
      { label: "Community License", action: "license", sticker: "/stickers/panda-garland.svg", rot: -8 },
    ],
  },
];

/* ------------------------------------------------------------------
   small inline sticker in the tagline (click = spin, like the hero)
------------------------------------------------------------------- */
function InlineSticker({ src }: { src: string }) {
  const [turns, setTurns] = useState(0);
  const [hover, setHover] = useState(false);

  return (
    <img
      data-sticker
      src={src}
      alt=""
      draggable={false}
      onClick={() => setTurns((t) => t + 1)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="mx-1 inline-block h-[0.95em] w-[0.95em] cursor-pointer select-none align-[-0.1em]"
      style={{
        rotate: `${turns * 360 + (hover ? 14 : 0)}deg`,
        scale: hover ? 1.12 : 1,
        transition: `rotate 650ms ${SPRING}, scale 300ms ${SPRING}`,
      }}
    />
  );
}

/* ------------------------------------------------------------------
   draggable sticker (sits on top of the wordmark)
------------------------------------------------------------------- */
function DraggableSticker({
  src,
  size,
  left,
  top,
  rot = 0,
  inView,
  delay = 0,
}: {
  src: string;
  size: number;
  left: string;
  top: string;
  rot?: number;
  inView: boolean;
  delay?: number;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const start = useRef({ px: 0, py: 0, x: 0, y: 0 });

  return (
    // layer 1: placement + entrance pop
    <div
      className="absolute"
      style={{
        left,
        top,
        width: `clamp(36px, ${size / 10.24}vw, ${size}px)`,
        zIndex: drag ? 30 : 20,
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1) rotate(0deg)" : "scale(0) rotate(-20deg)",
        transition: `transform 650ms ${SPRING} ${delay}ms, opacity 300ms ease-out ${delay}ms`,
      }}
    >
      {/* layer 2: drag, hover, tilt */}
      <div
        data-sticker
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
          setDrag(true);
        }}
        onPointerMove={(e) => {
          if (!drag) return;
          setPos({
            x: start.current.x + e.clientX - start.current.px,
            y: start.current.y + e.clientY - start.current.py,
          });
        }}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="touch-none select-none"
        style={{
          translate: `${pos.x}px ${pos.y}px`,
          rotate: `${rot + (drag ? -5 : hover ? 8 : 0)}deg`,
          scale: drag ? 1.14 : hover ? 1.08 : 1,
          cursor: drag ? "grabbing" : "grab",
          filter: drag ? "drop-shadow(0 14px 12px rgba(10,40,100,0.28))" : "none",
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

/* ------------------------------------------------------------------
   footer
------------------------------------------------------------------- */
export default function Footer() {
  const [ref, inView] = useInView();
  const [modalTab, setModalTab] = useState<LegalModalTab | null>(null);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    if (!modalTab) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalTab(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalTab]);

  return (
    <>
      <footer
        ref={ref}
        className="relative z-10 w-full overflow-hidden px-6 pt-14 sm:px-12 sm:pt-16"
        style={{
          backgroundColor: "var(--paper-deep)",
          backgroundImage:
            "radial-gradient(circle at 50% -20%, rgba(255,255,255,0.85), transparent 60%), repeating-linear-gradient(to bottom, transparent 0 31px, rgba(219,228,242,0.9) 31px 32px)",
          borderTop: "2px solid rgba(36,36,42,0.28)",
        }}
      >
        {/* paper grain */}
        <div
          className="pointer-events-none absolute inset-0 mask-t-from-10% to-100%"
          style={{ backgroundImage: GRAIN, backgroundSize: "3px 3px", opacity: 0.06 }}
        />

        {/* top: tagline + links */}
        <div className="relative z-10 mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.85fr] lg:gap-14">
          <MotionBlur inView={inView} delay={0} className="text-center lg:text-left">
            <p className="font-display text-[1.9rem] font-[550] leading-[1.15] tracking-tight text-ink sm:text-4xl">
              Stick it on.
              <br />
              Ship it fun
              <InlineSticker src="/stickers/panda-bear-1.svg" />
            </p>
          </MotionBlur>

          <div className="grid grid-cols-2 items-start gap-x-6 gap-y-10 text-center sm:grid-cols-4 sm:text-left">
            {COLUMNS.map((col, ci) => (
              <MotionBlur
                key={col.title}
                inView={inView}
                delay={140 + ci * 80}
                className={["sm:mt-0", "sm:mt-10", "sm:mt-3", "sm:mt-14"][ci]}
              >
                <h3 className="font-hand text-[13px] uppercase tracking-[0.16em] text-ink-muted">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.action ? (
                        <button
                          type="button"
                          onClick={() => setModalTab(link.action!)}
                          className="group relative inline-flex cursor-pointer items-center py-0.5 text-[15px] text-ink-muted transition-colors duration-200 hover:text-ink text-left"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 opacity-0 scale-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
                            style={{
                              transitionTimingFunction: SPRING,
                            }}
                          >
                            <img
                              src={link.sticker}
                              alt=""
                              className="h-[24px] w-[24px] max-w-none select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                              style={{
                                transform: `rotate(${link.rot ?? 0}deg)`,
                              }}
                            />
                          </span>
                        </button>
                      ) : link.href?.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group relative inline-flex items-center py-0.5 text-[15px] text-ink-muted transition-colors duration-200 hover:text-ink"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 opacity-0 scale-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
                            style={{
                              transitionTimingFunction: SPRING,
                            }}
                          >
                            <img
                              src={link.sticker}
                              alt=""
                              className="h-[24px] w-[24px] max-w-none select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                              style={{
                                transform: `rotate(${link.rot ?? 0}deg)`,
                              }}
                            />
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={link.href || "#"}
                          className="group relative inline-flex items-center py-0.5 text-[15px] text-ink-muted transition-colors duration-200 hover:text-ink"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 opacity-0 scale-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
                            style={{
                              transitionTimingFunction: SPRING,
                            }}
                          >
                            <img
                              src={link.sticker}
                              alt=""
                              className="h-[24px] w-[24px] max-w-none select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                              style={{
                                transform: `rotate(${link.rot ?? 0}deg)`,
                              }}
                            />
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </MotionBlur>
            ))}
          </div>
        </div>

        {/* full-bleed wordmark + live stickers */}
        <MotionBlur
          inView={inView}
          delay={380}
          className="relative z-10 mt-14 sm:mt-20"
        >
          <div className="relative select-none" style={{ containerType: "inline-size" }}>
            <div
              aria-hidden
              className="overflow-hidden whitespace-nowrap text-center font-display font-[600] leading-[0.8] tracking-[-0.04em] text-ink"
              style={{
                fontSize: "21cqw",
                height: "14.5cqw",
                marginBottom: "-2cqw",
                textShadow: "0 0.02em 0 rgba(36,36,42,0.12)",
              }}
            >
              Sketch Up
            </div>
            <span className="sr-only">Sketch Up</span>

            <DraggableSticker inView={inView} delay={640} src="/stickers/face.svg" size={84} left="4%" top="-6%" rot={-12} />
            <DraggableSticker inView={inView} delay={720} src="/stickers/panda-bear-1.svg" size={92} left="28%" top="52%" rot={8} />
            <DraggableSticker inView={inView} delay={800} src="/stickers/panda-bear-1.svg" size={65} left="46%" top="-10%" rot={-6} />
            <DraggableSticker inView={inView} delay={880} src="/stickers/panda-bear-2.svg" size={70} left="66%" top="32%" rot={14} />
            <DraggableSticker inView={inView} delay={960} src="/stickers/panda-garland.svg" size={86} left="84%" top="-4%" rot={-10} />
          </div>
        </MotionBlur>
      </footer>

      {/* ------------------------------------------------------------------
         Minimal Pop-up Modal Window for Legal & Notices
      ------------------------------------------------------------------- */}
      {modalTab && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalTab(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs transition-opacity duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-xl flex-col rounded-[22px_14px_24px_14px/14px_24px_14px_22px] border-2 border-ink/45 bg-paper-card shadow-[5px_6px_0_rgba(36,36,42,0.14),0_24px_60px_rgba(0,0,0,0.2)] transition-transform duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-ink/15 px-6 py-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: "privacy", label: "Privacy Policy" },
                  { id: "disclaimer", label: "Art Disclaimer" },
                  { id: "takedown", label: "Takedown Request" },
                  { id: "license", label: "License" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setModalTab(tab.id as LegalModalTab)}
                    className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                      modalTab === tab.id
                        ? "bg-pen text-paper-card"
                        : "text-ink-muted hover:bg-paper-deep hover:text-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setModalTab(null)}
                className="ml-3 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink"
                title="Close (Esc)"
                aria-label="Close"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="max-h-[calc(85vh-72px)] overflow-y-auto px-6 py-6 text-[15px] text-ink-soft">
              {modalTab === "privacy" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display text-lg font-[550] tracking-tight text-ink">
                      Privacy Policy
                    </h3>
                    <p className="mt-1 font-hand text-[13px] text-ink-muted">
                      Zero tracking, zero ads, zero data selling.
                    </p>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">
                    Sketch Up is built with a minimal, privacy-first mindset. We do not track you across the web, use advertising cookies, or collect personal identifiers.
                  </p>
                  <div className="divide-y divide-ink/10 border-y-2 border-ink/12 text-[13.5px] text-ink-soft">
                    <div className="py-2.5">
                      <span className="font-medium text-ink">Zero Personal Data:</span> We do not collect names, emails, passwords, phone numbers, or payment info. No account registration is required to use the package or site.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-ink">Anonymous Visitor Counter:</span> When a visitor loads the site, an anonymous aggregate numeric counter increments. We do not record IP addresses, device fingerprints, or locations.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-ink">Local Storage Only:</span> Browser storage is strictly used on your own device for client-side UI states (such as remembering copied snippets or active preview preferences).
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "disclaimer" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display text-lg font-[550] tracking-tight text-ink">
                      Art &amp; Copyright Notice
                    </h3>
                    <p className="mt-1 font-hand text-[13px] text-ink-muted">
                      Curated for open-source &amp; educational fun.
                    </p>
                  </div>
                  <div className="space-y-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <p>
                      Stickers in this library are vector decals curated and adapted from creative hubs across the internet (such as Pinterest, community showcases, and open packs) for educational, personal, and open-source UI experimentation.
                    </p>
                    <p>
                      <strong>We do not claim copyright or ownership</strong> over original character illustrations or art styles. All original copyrights remain strictly with their respective creators and rights holders.
                    </p>
                  </div>
                  <div className="border-t-2 border-ink/12 pt-3.5 text-[13.5px] text-ink-soft">
                    <p>
                      If you are an artist or rights holder and see your artwork here, please reach out before filing strikes. We will gladly add full attribution with links to your shop/portfolio, or remove it within a few days with zero friction.
                    </p>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setModalTab("takedown")}
                        className="cursor-pointer text-xs font-medium text-ink underline underline-offset-4 hover:text-ink-soft"
                      >
                        View takedown request options &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "takedown" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display text-lg font-[550] tracking-tight text-ink">
                      Takedown &amp; Attribution Request
                    </h3>
                    <p className="mt-1 font-hand text-[13px] text-ink-muted">
                      Prompt removal or backlink attribution for rights holders.
                    </p>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">
                    If you own the rights to any artwork featured in this project, we want to respect your wishes. Send a message and we will handle it within a few days:
                  </p>
                  <div className="divide-y divide-ink/10 border-y-2 border-ink/12 text-[13.5px] text-ink-soft">
                    <div className="py-2.5">
                      <span className="font-medium text-ink">Want attribution?</span> We will gladly add your name, portfolio link, store, or social handles directly to the sticker&apos;s catalog entry.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-ink">Want it removed?</span> No paperwork or legal notices needed. Send a message and we will remove the file within a few days.
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href="https://github.com/Sam721166/stick-it-up/issues/new?labels=takedown&title=[Artwork+Takedown+Request]:+"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-[10px_7px_11px_7px/7px_11px_7px_10px] border-2 border-ink bg-ink px-3.5 py-2 text-[13px] font-medium text-paper-card shadow-[2px_2px_0_rgba(36,36,42,0.2)] transition-colors"
                    >
                      Open GitHub Request &rarr;
                    </a>
                    <a
                      href="https://x.com/samirande_"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-[10px_7px_11px_7px/7px_11px_7px_10px] border-2 border-ink/30 bg-paper-card px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink/55"
                    >
                      DM on X / Twitter (@samirande_) &rarr;
                    </a>
                  </div>
                </div>
              )}

              {modalTab === "license" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display text-lg font-[550] tracking-tight text-ink">
                      Community &amp; Fair-Use License
                    </h3>
                    <p className="mt-1 font-hand text-[13px] text-ink-muted">
                      Free to use, learn, and contribute. No paywalls or repackaged clones.
                    </p>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">
                    Sketch Up is an open project built to make web UI more expressive and fun. You are free to use it, explore the code, and contribute, subject to simple community fair-use terms:
                  </p>
                  <div className="divide-y divide-ink/10 border-y-2 border-ink/12 text-[13.5px] text-ink-soft">
                    <div className="py-2.5">
                      <span className="font-medium text-ink">Free to Use:</span> You are welcome to use these stickers and components freely in your personal projects, open-source apps, developer blogs, and documentation.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-ink">Learn &amp; Explore:</span> You can freely fork, clone, and inspect the repository to learn how the peel shaders, physics hooks, and React components are crafted.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-ink">Contribute:</span> You are encouraged to submit bug fixes, improvements, and new stickers directly to the official upstream repository.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-ink">No Paywalls or Reselling:</span> You may NOT sell, license, or lock this library, its sticker graphics, or derivative components behind a paid paywall or paid subscription.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-ink">No Repackaged Clones:</span> You may NOT make minor or trivial modifications and publicly re-host or deploy this project as your own competing sticker catalog or competing package.
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap rounded-[14px_10px_16px_10px/10px_16px_10px_14px] border-2 border-ink/20 bg-paper p-4 font-mono text-[11px] leading-relaxed text-ink-soft select-all">
                    {`Sketch Up Fair-Use & Community License
Version 1.0 (2026)

Copyright (c) 2026 Samiran De (https://github.com/Sam721166)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software, components, sticker assets, and associated documentation
(the "Software"), to inspect, use, copy, and modify the Software subject to
the following conditions:

1. PERMITTED USES:
   (a) Free Use: You may install and use the Software and sticker components
       freely in personal websites, educational materials, open-source projects,
       and non-commercial web applications.
   (b) Study & Learning: You are welcome to clone or fork the repository to
       explore, learn from the codebase, and experiment with motion and UI techniques.
   (c) Contributions: You are encouraged to submit bug fixes, improvements,
       and new features back to the official repository via Pull Requests.

2. RESTRICTIONS (NO COMMERCIAL PAYWALLS, NO REPACKAGED REDEPLOYMENT):
   (a) No Paywalls or Direct Sale: You may NOT sell, license, charge fees for,
       or place the Software, its sticker graphics, or derivative components
       behind any paid paywall, paid subscription, or commercial asset pack.
   (b) No Trivial Re-hosting / Competing Clones: You may NOT make minor or trivial
       modifications to this project and publicly deploy, host, or republish it
       as your own competing sticker catalog, component registry, or package.
   (c) Original Artist Rights: Character designs and artwork curated in this
       library remain the intellectual property of their original creators.

3. ATTRIBUTION:
   All copies, substantial portions, or permitted distributions of the Software
   must include this copyright notice and permission notice.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
