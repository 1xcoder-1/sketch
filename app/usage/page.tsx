"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sticker, type StickerName } from "stick-it-up";
import Footer from "../../components/landing/footer";
import { VisitorCounter, GitHubStarButton } from "../../components/landing/nav-actions";

/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------- */

function getComponentExportName(name: string): string {
  return (
    name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("") + "Sticker"
  );
}

export default function UsagePage() {
  // Quickstart guide interactive state
  const [guideTab, setGuideTab] = useState<"react" | "svg">("react");
  const [guidePm, setGuidePm] = useState<"npm" | "pnpm" | "bun" | "yarn">("npm");
  const [guideSticker, setGuideSticker] = useState<StickerName>("face");
  const [guideMode, setGuideMode] = useState<"direct" | "dynamic">("direct");
  const [guidePeel, setGuidePeel] = useState(true);
  const [guideSize, setGuideSize] = useState(96);
  const [guideCopied, setGuideCopied] = useState<"install" | "code" | null>(null);

  useEffect(() => {
    if (!guideCopied) return;
    const t = setTimeout(() => setGuideCopied(null), 1800);
    return () => clearTimeout(t);
  }, [guideCopied]);

  const pmCommands = {
    npm: "npm i stick-it-up@latest",
    pnpm: "pnpm add stick-it-up@latest",
    bun: "bun add stick-it-up@latest",
    yarn: "yarn add stick-it-up@latest",
  };

  async function copyGuideInstall() {
    try {
      await navigator.clipboard.writeText(pmCommands[guidePm]);
      setGuideCopied("install");
    } catch (err) {
      console.error(err);
    }
  }

  async function copyGuideCode() {
    const exportName = getComponentExportName(guideSticker);
    const directCode = `import { ${exportName} } from "stick-it-up";\n\nexport default function Hero() {\n  return (\n    <${exportName} \n      size={${guideSize}}${
      guidePeel ? " \n      peel" : ""
    } \n    />\n  );\n}`;

    const dynamicCode = `import { Sticker } from "stick-it-up";\n\nexport default function Hero() {\n  return (\n    <Sticker \n      name="${guideSticker}" \n      size={${guideSize}}${
      guidePeel ? " \n      peel" : ""
    } \n    />\n  );\n}`;

    const code =
      guideTab === "react"
        ? guideMode === "direct"
          ? directCode
          : dynamicCode
        : `<img src="/stickers/face.svg" alt="Coffee sticker" width={${guideSize}} height={${guideSize}} />`;

    try {
      await navigator.clipboard.writeText(code);
      setGuideCopied("code");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-clip w-full bg-white text-zinc-900 antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* ------------------------------------------------------------------
          HEADER
      ------------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <img
              src="/stickers/panda-bear-1.svg"
              alt="Sketch Up logo"
              className="h-9 w-9 rounded-lg transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
            />
            <span className="text-lg font-semibold tracking-tight text-zinc-900">
              Sketch Up
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            <li>
              <Link
                href="/"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/stickers"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
              >
                Stickers
              </Link>
            </li>
            <li>
              <Link
                href="/usage"
                aria-current="page"
                className="rounded-lg bg-zinc-100 px-3.5 py-2 text-sm font-medium text-zinc-900 transition-colors duration-150"
              >
                Usage
              </Link>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/stick-it-up"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
              >
                npm
              </a>
            </li>
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <VisitorCounter />
            <GitHubStarButton />
          </div>
        </nav>
      </header>

   {/* ------------------------------------------------------------------
    DEVELOPER GUIDE (minimal)
    Drop-in replacement. Uses the state/handlers already in the page:
    guideTab, guidePm, guideSticker, guidePeel, guideSize, guideCopied,
    pmCommands, copyGuideInstall, copyGuideCode
------------------------------------------------------------------- */}
        <section
        id="docs"
        className="scroll-mt-24 border-t border-zinc-200 bg-white px-6 py-20"
        >
        <div className="mx-auto max-w-3xl">
            {/* Header */}
            <header>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-zinc-900">
                Usage
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500">
                Add stickers to a React or Next.js app.
            </p>
            </header>

            {/* Tabs */}
            <div role="tablist" className="mt-8 flex gap-6 border-b border-zinc-200 text-sm">
            {(
                [
                { id: "react", label: "React" },
                { id: "svg", label: "SVG" },
                ] as const
            ).map((t) => (
                <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={guideTab === t.id}
                onClick={() => setGuideTab(t.id)}
                className={`-mb-px cursor-pointer border-b-2 pb-2.5 font-medium transition-colors ${
                    guideTab === t.id
                    ? "border-zinc-900 text-zinc-900"
                    : "border-transparent text-zinc-400 hover:text-zinc-700"
                }`}
                >
                {t.label}
                </button>
            ))}
            </div>

            {guideTab === "react" ? (
            <div className="mt-10 space-y-12">
                {/* 1. Install */}
                <div>
                <h3 className="text-sm font-medium text-zinc-900">
                    <span className="mr-2 font-mono text-zinc-400">01</span>Install
                </h3>

                <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
                    <div className="flex gap-4 border-b border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-[11px]">
                    {(["npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                        <button
                        key={pm}
                        type="button"
                        onClick={() => setGuidePm(pm)}
                        className={`cursor-pointer transition-colors ${
                            guidePm === pm
                            ? "font-semibold text-zinc-900"
                            : "text-zinc-400 hover:text-zinc-700"
                        }`}
                        >
                        {pm}
                        </button>
                    ))}
                    </div>
                    <div className="flex items-center justify-between bg-white px-4 py-3 font-mono text-xs text-zinc-800">
                    <span>
                        <span className="mr-2 select-none text-zinc-400">$</span>
                        {pmCommands[guidePm]}
                    </span>
                    <button
                        type="button"
                        onClick={copyGuideInstall}
                        className={`cursor-pointer font-sans text-[11px] font-medium transition-colors  px-2 py-1 ${
                        guideCopied === "install"
                            ? "text-emerald-500"
                            : "text-zinc-400 hover:text-zinc-600"
                        }`}
                    >
                        {guideCopied === "install" ? "Copied" : "Copy"}
                    </button>
                    </div>
                </div>
                </div>

                {/* 2. Use */}
                <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                  <h3 className="text-sm font-medium text-zinc-900">
                    <span className="mr-2 font-mono text-zinc-400">02</span>Use
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Choose <span className="font-medium text-zinc-800">Direct Use</span> (lightweight named import) or <span className="font-medium text-zinc-800">Dynamic</span> (generic &lt;Sticker /&gt;).
                  </p>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-5">
                    {/* Code */}
                    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white md:col-span-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-zinc-500">Hero.tsx</span>
                          <div className="flex items-center rounded-lg bg-zinc-200/70 p-0.5 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setGuideMode("direct")}
                              className={`cursor-pointer rounded-md px-2 py-0.5 font-medium transition-all ${
                                guideMode === "direct"
                                  ? "bg-white text-zinc-900 shadow-xs"
                                  : "text-zinc-500 hover:text-zinc-800"
                              }`}
                            >
                              Direct Use
                            </button>
                            <button
                              type="button"
                              onClick={() => setGuideMode("dynamic")}
                              className={`cursor-pointer rounded-md px-2 py-0.5 font-medium transition-all ${
                                guideMode === "dynamic"
                                  ? "bg-white text-zinc-900 shadow-xs"
                                  : "text-zinc-500 hover:text-zinc-800"
                              }`}
                            >
                              Dynamic
                            </button>
                          </div>
                        </div>
                        <button
                        type="button"
                        onClick={copyGuideCode}
                        className={`cursor-pointer rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium transition-colors ${
                            guideCopied === "code"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                            : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                        >
                        {guideCopied === "code" ? "Copied" : "Copy"}
                        </button>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-950">
                        <code>{guideMode === "direct" ? `import { ${getComponentExportName(guideSticker)} } from "stick-it-up";

export default function Hero() {
  return (
    <${getComponentExportName(guideSticker)}
      size={${guideSize}}${guidePeel ? "\n      peel" : ""}
    />
  );
}` : `import { Sticker } from "stick-it-up";

export default function Hero() {
  return (
    <Sticker
      name="${guideSticker}"
      size={${guideSize}}${guidePeel ? "\n      peel" : ""}
    />
  );
}`}</code>
                    </pre>
                    </div>

                    {/* Preview + controls */}
                    <div className="flex flex-col rounded-xl border border-zinc-200 md:col-span-2">
                    <div className="flex min-h-[160px] flex-1 items-center justify-center rounded-t-xl bg-zinc-50 p-6">
                        <Sticker name={guideSticker} size={guideSize} peel={guidePeel} />
                    </div>

                    <dl className="divide-y divide-zinc-200 rounded-b-xl border-t border-zinc-200 bg-white text-[11px]">
                        <div className="flex items-center justify-between gap-2 px-3 py-2">
                        <dt className="text-zinc-500">Sticker</dt>
                        <dd className="flex flex-wrap justify-end gap-1">
                            {(
                            [
                                { id: "face", label: "face" },
                                { id: "panda-bear-1", label: "panda-bear-1" },
                                { id: "panda-bear-2", label: "panda-bear-2" },
                                { id: "panda-garland", label: "panda-garland" },
                                { id: "panda-sack", label: "panda-sack" },
                                { id: "winter-doodle-4", label: "winter-doodle-4" },
                                { id: "xmas-character-1", label: "xmas-character-1" },
                                { id: "xmas-character-4", label: "xmas-character-4" },
                                { id: "forest-animal-4", label: "forest-animal-4" },
                                { id: "halloween-face-3", label: "halloween-face-3" },
                                { id: "monster-face-1", label: "monster-face-1" },
                                { id: "monster-face-2", label: "monster-face-2" },
                                { id: "monster-face-3", label: "monster-face-3" },
                                { id: "monster-face-7", label: "monster-face-7" },
                                { id: "monster-face-8", label: "monster-face-8" },
                                { id: "monster-face-9", label: "monster-face-9" },
                                { id: "monster-icon-1", label: "monster-icon-1" },
                                { id: "monster-icon-3", label: "monster-icon-3" },
                                { id: "monster-icon-5", label: "monster-icon-5" },
                                { id: "halloween-sketch-4", label: "halloween-sketch-4" },
                                { id: "halloween-prop-1", label: "halloween-prop-1" },
                                { id: "cute-monster-1", label: "cute-monster-1" },
                                { id: "cute-monster-2", label: "cute-monster-2" },
                                { id: "cute-monster-3", label: "cute-monster-3" },
                                { id: "cute-monster-5", label: "cute-monster-5" },
                                { id: "cute-monster-6", label: "cute-monster-6" },
                                { id: "watercolor-character-1", label: "watercolor-character-1" },
                                { id: "watercolor-character-3", label: "watercolor-character-3" },
                                { id: "watercolor-character-4", label: "watercolor-character-4" },
                                { id: "watercolor-kid-2", label: "watercolor-kid-2" },
                                { id: "watercolor-kid-3", label: "watercolor-kid-3" },
                                { id: "watercolor-kid-5", label: "watercolor-kid-5" },
                                { id: "watercolor-kid-6", label: "watercolor-kid-6" },
                                { id: "videogame-collection-1", label: "videogame-collection-1" },
                                { id: "videogame-collection-2", label: "videogame-collection-2" },
                                { id: "videogame-set-3", label: "videogame-set-3" },
                                { id: "videogame-set-4", label: "videogame-set-4" },
                                { id: "watercolor-halloween-3", label: "watercolor-halloween-3" },
                                { id: "watercolor-halloween-5", label: "watercolor-halloween-5" },
                                { id: "handdrawn-kid-1", label: "handdrawn-kid-1" },
                                { id: "handdrawn-kid-3", label: "handdrawn-kid-3" },
                                { id: "handdrawn-kid-4", label: "handdrawn-kid-4" },
                                { id: "frankenstein-boy-1", label: "frankenstein-boy-1" },
                                { id: "creepy-character-2", label: "creepy-character-2" },
                                { id: "creepy-character-3", label: "creepy-character-3" },
                                { id: "creepy-character-4", label: "creepy-character-4" },
                                { id: "samurai-boy-1", label: "samurai-boy-1" },
                                { id: "ninja-airbender-1", label: "ninja-airbender-1" },
                                { id: "kimono-katana-boy-1", label: "kimono-katana-boy-1" },
                                { id: "chinese-vampire-1", label: "chinese-vampire-1" },
                                { id: "ninja-sitting-1", label: "ninja-sitting-1" },
                                { id: "japanese-merchant-1", label: "japanese-merchant-1" },
                                { id: "costume-kid-2", label: "costume-kid-2" },
                                { id: "costume-kid-3", label: "costume-kid-3" },
                                { id: "costume-kid-6", label: "costume-kid-6" },
                                { id: "cute-halloween-buddy-2", label: "cute-halloween-buddy-2" },
                                { id: "cute-halloween-buddy-5", label: "cute-halloween-buddy-5" },
                                { id: "gamer-man", label: "gamer-man" },
                                { id: "happy-halloween-3", label: "happy-halloween-3" },
                                { id: "happy-halloween-4", label: "happy-halloween-4" },
                                { id: "happy-halloween-5", label: "happy-halloween-5" },
                                { id: "happy-halloween-8", label: "happy-halloween-8" },
                                { id: "retro-basketball-1", label: "retro-basketball-1" },
                                { id: "retro-basketball-2", label: "retro-basketball-2" },
                                { id: "retro-basketball-4", label: "retro-basketball-4" },
                                { id: "retro-cartoon-1", label: "retro-cartoon-1" },
                                { id: "retro-cartoon-2", label: "retro-cartoon-2" },
                                { id: "retro-cartoon-3", label: "retro-cartoon-3" },
                                { id: "retro-military-1", label: "retro-military-1" },
                                { id: "retro-military-2", label: "retro-military-2" },
                                { id: "retro-military-3", label: "retro-military-3" },
                                { id: "retro-military-4", label: "retro-military-4" },
                                { id: "retro-military-5", label: "retro-military-5" },
                                { id: "retro-military-6", label: "retro-military-6" },
                                { id: "retro-military-7", label: "retro-military-7" },
                                { id: "retro-military-8", label: "retro-military-8" },
                                { id: "rock-sticker-2", label: "rock-sticker-2" },
                                { id: "rock-sticker-3", label: "rock-sticker-3" },
                                { id: "rock-sticker-4", label: "rock-sticker-4" },
                                { id: "young-action-2", label: "young-action-2" },
                                { id: "young-action-3", label: "young-action-3" },
                                { id: "young-action-4", label: "young-action-4" },
                                { id: "young-action-5", label: "young-action-5" },
                                { id: "young-action-6", label: "young-action-6" },
                                { id: "funny-character-3", label: "funny-character-3" },
                                { id: "funny-character-4", label: "funny-character-4" },
                                { id: "funny-character-5", label: "funny-character-5" },
                                { id: "funny-character-6", label: "funny-character-6" },
                                { id: "funny-character-7", label: "funny-character-7" },
                                { id: "funny-character-8", label: "funny-character-8" },
                                { id: "rock-sticker-5", label: "rock-sticker-5" },
                                { id: "rock-sticker-6", label: "rock-sticker-6" },
                                { id: "rock-sticker-7", label: "rock-sticker-7" },
                                { id: "rock-sticker-8", label: "rock-sticker-8" },
                                { id: "wrestler-4", label: "wrestler-4" },
                                { id: "wrestler-6", label: "wrestler-6" },
                                { id: "funny-doodle-1", label: "funny-doodle-1" },
                                { id: "funny-doodle-2", label: "funny-doodle-2" },
                                { id: "funny-doodle-3", label: "funny-doodle-3" },
                                { id: "funny-doodle-4", label: "funny-doodle-4" },
                                { id: "graffiti-tag-1", label: "graffiti-tag-1" },
                                { id: "graffiti-tag-4", label: "graffiti-tag-4" },
                                { id: "graffiti-tag-16", label: "graffiti-tag-16" },
                                { id: "cute-pop-1", label: "cute-pop-1" },
                                { id: "doodle-beast-1", label: "doodle-beast-1" },
                                { id: "doodle-beast-2", label: "doodle-beast-2" },
                                { id: "doodle-beast-3", label: "doodle-beast-3" },
                                { id: "doodle-beast-4", label: "doodle-beast-4" },
                                { id: "doodle-beast-5", label: "doodle-beast-5" },
                                { id: "doodle-beast-6", label: "doodle-beast-6" },
                                { id: "doodle-beast-7", label: "doodle-beast-7" },
                                { id: "doodle-beast-8", label: "doodle-beast-8" },
                                { id: "doodle-beast-9", label: "doodle-beast-9" },
                                { id: "pattern-monster-1", label: "pattern-monster-1" },
                                { id: "pattern-monster-2", label: "pattern-monster-2" },
                                { id: "pattern-monster-3", label: "pattern-monster-3" },
                                { id: "pattern-monster-4", label: "pattern-monster-4" },
                                { id: "pattern-monster-5", label: "pattern-monster-5" },
                                { id: "pattern-monster-6", label: "pattern-monster-6" },
                                { id: "retro-badge-1", label: "retro-badge-1" },
                                { id: "retro-badge-2", label: "retro-badge-2" },
                                { id: "retro-badge-3", label: "retro-badge-3" },
                                { id: "retro-badge-4", label: "retro-badge-4" },
                                { id: "retro-badge-5", label: "retro-badge-5" },
                                { id: "retro-badge-6", label: "retro-badge-6" },
                                { id: "plant-buddy-1", label: "plant-buddy-1" },
                                { id: "plant-buddy-2", label: "plant-buddy-2" },
                                { id: "plant-buddy-3", label: "plant-buddy-3" },
                                { id: "funny-sketch-3", label: "funny-sketch-3" },
                                { id: "funny-sketch-4", label: "funny-sketch-4" },
                                { id: "happy-doodle-1", label: "happy-doodle-1" },
                                { id: "happy-doodle-2", label: "happy-doodle-2" },
                                { id: "happy-doodle-4", label: "happy-doodle-4" },
                                { id: "mad-beast-1", label: "mad-beast-1" },
                                { id: "mad-beast-2", label: "mad-beast-2" },
                                { id: "mad-beast-3", label: "mad-beast-3" },
                                { id: "mad-beast-4", label: "mad-beast-4" },
                                { id: "decor-sticker-1", label: "decor-sticker-1" },
                                { id: "decor-sticker-2", label: "decor-sticker-2" },
                                { id: "decor-sticker-3", label: "decor-sticker-3" },
                                { id: "decor-sticker-5", label: "decor-sticker-5" },
                                { id: "decor-sticker-6", label: "decor-sticker-6" },
                                { id: "lol-fun-1", label: "lol-fun-1" },
                                { id: "lol-fun-2", label: "lol-fun-2" },
                                { id: "lol-fun-3", label: "lol-fun-3" },
                                { id: "lol-fun-4", label: "lol-fun-4" },
                                { id: "lol-fun-5", label: "lol-fun-5" },
                                { id: "lol-fun-6", label: "lol-fun-6" },
                            ] as const
                            ).map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => setGuideSticker(s.id)}
                                className={`cursor-pointer rounded-md px-1.5 py-0.5 transition-colors ${
                                guideSticker === s.id
                                    ? "bg-zinc-900 text-white"
                                    : "text-zinc-500 hover:text-zinc-900"
                                }`}
                            >
                                {s.label}
                            </button>
                            ))}
                        </dd>
                        </div>

                        <div className="flex items-center justify-between px-3 py-2">
                        <dt className="text-zinc-500">Size</dt>
                        <dd className="flex gap-1 font-mono">
                            {[64, 96, 120].map((sz) => (
                            <button
                                key={sz}
                                type="button"
                                onClick={() => setGuideSize(sz)}
                                className={`cursor-pointer rounded-md px-1.5 py-0.5 transition-colors ${
                                guideSize === sz
                                    ? "bg-zinc-900 text-white"
                                    : "text-zinc-500 hover:text-zinc-900"
                                }`}
                            >
                                {sz}
                            </button>
                            ))}
                        </dd>
                        </div>

                        <div className="flex items-center justify-between px-3 py-2">
                        <dt className="text-zinc-500">Peel on hover</dt>
                        <dd>
                            <button
                            type="button"
                            role="switch"
                            aria-checked={guidePeel}
                            aria-label="Peel on hover"
                            onClick={() => setGuidePeel(!guidePeel)}
                            className={`relative inline-flex h-4 w-7 cursor-pointer items-center rounded-full transition-colors ${
                                guidePeel ? "bg-zinc-900" : "bg-zinc-300"
                            }`}
                            >
                            <span
                                className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${
                                guidePeel ? "translate-x-3.5" : "translate-x-0.5"
                                }`}
                            />
                            </button>
                        </dd>
                        </div>
                    </dl>
                    </div>
                </div>
                </div>

                {/* 3. Props */}
                <div>
                <h3 className="text-sm font-medium text-zinc-900">
                    <span className="mr-2 font-mono text-zinc-400">03</span>Props
                </h3>

                <dl className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
                    {[
                    { name: "name", type: "string", desc: 'Sticker ID (for generic <Sticker />), e.g. "face". Not needed when using direct component imports.' },
                    { name: "size", type: "number | string", desc: "Width and height in pixels. Default 96." },
                    { name: "peel", type: "boolean", desc: "3D tilt and shadow on hover." },
                    { name: "className", type: "string", desc: "Extra classes for rotation, margin, etc." },
                    ].map((p) => (
                    <div
                        key={p.name}
                        className="grid items-baseline gap-x-4 gap-y-1 py-3 text-xs sm:grid-cols-[7rem_9rem_1fr]"
                    >
                        <dt className="font-mono font-semibold text-zinc-900">{p.name}</dt>
                        <dd className="font-mono text-zinc-400">{p.type}</dd>
                        <dd className="text-zinc-600">{p.desc}</dd>
                    </div>
                    ))}
                </dl>
                </div>
            </div>
            ) : (
            <div className="mt-10 space-y-4">
                <p className="text-sm text-zinc-500">
                Static vector files live in{" "}
                <code className="font-mono text-xs text-zinc-800">/public/stickers/</code>. No
                dependencies needed.
                </p>

                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2">
                    <div className="flex items-center gap-2">
                    
                    <span className="ml-1.5 font-mono text-[11px] text-zinc-500">index.html</span>
                    </div>
                    <button
                    type="button"
                    onClick={copyGuideCode}
                    className={`cursor-pointer text-[11px] font-medium transition-colors ${
                        guideCopied === "code"
                        ? "text-emerald-400 font-semibold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    >
                    {guideCopied === "code" ? "Copied ✓" : "Copy"}
                    </button>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-900">
                    <code>{`<img
  src="/stickers/face.svg"
  alt="Flame sticker"
  width={${guideSize}}
  height={${guideSize}}
/>`}</code>
                </pre>
                </div>
            </div>
            )}
        </div>
        </section>

      <Footer />
    </div>
  );
}
