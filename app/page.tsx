"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import Folder from "../components/landing/folder";
import Bento from "../components/landing/bento";
import Sponsor from "../components/landing/sponsor";
import GetStarted from "../components/landing/get-started";
import Footer from "../components/landing/footer";
import { GitHubStarButton } from "../components/landing/nav-actions";
import TerminalPreview from "../components/landing/terminal-preview";
import HeroBackdrop from "../components/landing/hero-backdrop";

const INSTALL_COMMAND = "npm i stick-it-up@latest";
const NAV_LINKS = [
  { label: "Stickers", href: "/stickers" },
  { label: "Docs", href: "/usage" },
  { label: "npm", href: "https://www.npmjs.com/package/stick-it-up" },
];

export default function Home() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const copyingRef = useRef(false);

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timer = window.setTimeout(() => setCopyStatus("idle"), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  async function copyCommand() {
    if (copyingRef.current) return;
    copyingRef.current = true;
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    } finally {
      copyingRef.current = false;
    }
  }

  return (
    <main className="landing-page sheet-margin relative min-h-screen w-full overflow-x-clip bg-paper">
      <div className="hero-surface">
        <HeroBackdrop />
        <header className="studio-header">
          <nav className="studio-navigation" aria-label="Main navigation" ref={navRef}>
            <div className="studio-navbar">
              <Link href="/" className="studio-brand" aria-label="Sketch Up home">
                <img src="/logo.svg" alt="" width={36} height={36} />
                <span>Sketch Up</span>
              </Link>
              <ul className="studio-links">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="studio-actions">
                <GitHubStarButton />
                <button
                  type="button"
                  className="studio-menu-toggle"
                  ref={menuButtonRef}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
            {menuOpen && (
              <ul id="mobile-navigation" className="studio-mobile-links">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} onClick={() => setMenuOpen(false)} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                      {link.label}<ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </header>

        <section className="studio-hero" aria-labelledby="hero-heading">
          {/* pencil doodles: a star, a squiggle and a hand-lettered margin note */}
          <div className="pointer-events-none absolute inset-0 -z-0 hidden lg:block" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="doodle left-[6%] top-[24%] h-14 w-14 rotate-[-10deg]">
              <path d="M32 7c1.4 8.5 5 13.5 14 15.5-9 2-12.6 7-14 16-1.4-9-5.6-14-15-16 9.4-2 12.6-7 15-15.5z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <svg viewBox="0 0 120 60" className="doodle right-[5%] top-[30%] h-16 w-32 rotate-[8deg]">
              <path d="M4 34c22-16 42-14 62-6 12 4 20 2 34-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              <path d="M90 12c4 6 8 10 14 12-9 1-13 4-18 10" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="doodle right-[12%] top-[52%] rotate-[6deg] font-hand text-[15px] text-ink-muted">
              just peel &amp; stick
            </span>
          </div>

          <h1 id="hero-heading" className="relative studio-heading">
            <span className="hero-heading-line">Give your site personality.<img src="/stickers/face.svg" alt="" width={64} height={64} /></span>
            <span className="hero-heading-line">Make people <span className="hero-highlight">stick around.</span><img src="/stickers/panda-bear-1.svg" alt="" width={64} height={64} /></span>
            <svg viewBox="0 0 320 18" preserveAspectRatio="none" aria-hidden="true" className="hand-rule mx-auto mt-4 max-w-md">
              <path d="M6 11c32-7 58 5 92-2s52-6 86 3 48 2 78-3 36-3 52 2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </h1>
          <div className="hero-buttons">
            <button
              type="button"
              onClick={copyCommand}
              className="hero-install"
              aria-label={copyStatus === "copied" ? "Copied to clipboard" : `Copy ${INSTALL_COMMAND}`}
            >
              <span className="hero-command-prefix" aria-hidden="true">$</span>
              <span className="copy-label-stack">
                <span style={{ opacity: copyStatus === "copied" ? 0 : 1 }}>{INSTALL_COMMAND}</span>
                <span style={{ opacity: copyStatus === "copied" ? 1 : 0 }} aria-hidden="true">Copied to clipboard</span>
              </span>
              {copyStatus === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            </button>
            <Link href="/usage" className="hero-docs">Read docs<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <p className={copyStatus === "error" ? "copy-feedback" : "sr-only"} role="status">
            {copyStatus === "error" ? `Couldn't copy. Select the command and copy it manually: ${INSTALL_COMMAND}` : copyStatus === "copied" ? "Install command copied to clipboard." : ""}
          </p>
          <TerminalPreview />
        </section>
      </div>

      <div className="w-full"><Folder /></div>
      <Bento />
      <Sponsor />
      <GetStarted />
      <Footer />
    </main>
  );
}
