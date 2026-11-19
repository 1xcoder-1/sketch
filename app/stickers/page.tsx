"use client";

import React, { useState, useMemo, useEffect, useRef, useDeferredValue } from "react";
import Link from "next/link";
import { LuCopyCheck, LuCopy } from "react-icons/lu";
import { Sticker, type StickerName } from "stick-it-up";
import Footer from "../../components/landing/footer";
import { VisitorCounter, GitHubStarButton } from "../../components/landing/nav-actions";



/* ------------------------------------------------------------------
   Sticker Catalog Data
------------------------------------------------------------------- */

type StickerFormat = "component" | "svg";
type StickerCategory = "all" | "mascots" | "characters" | "components" | "symbols" | "die-cut" | "quirky" | "spooky" | "funny";

interface CatalogItem {
  id: string;
  name: string;
  title: string;
  category: "components" | "symbols" | "characters" | "mascots" | "die-cut" | "quirky" | "spooky" | "funny";
  format: StickerFormat;
  description: string;
  tags: string[];
  componentName?: StickerName;
  svgSrc?: string;
  defaultRotation?: number;
  previewSize?: number;
}

const CATALOG: CatalogItem[] = [
  /* Built-in React Components (stick-it-up) */
  {
    id: "svg-face",
    name: "face",
    title: "Smiley Face",
    category: "characters",
    format: "component",
    componentName: "face",
    svgSrc: "/stickers/face.svg",
    description: "Cheerful classic yellow smiley face with warm blushing eyes.",
    tags: ["face", "smiley", "yellow", "happy", "character"],
    defaultRotation: 8,
  },
  {
    id: "svg-luffy-hat",
    name: "luffy-hat",
    title: "Straw Hat",
    category: "symbols",
    format: "component",
    componentName: "luffy-hat",
    svgSrc: "/stickers/luffy-hat.svg",
    description: "Iconic anime straw hat with vibrant crimson band, stitched brim, and crosshatch shading.",
    tags: ["luffy", "straw-hat", "anime", "one-piece", "hat", "symbol", "pirate"],
    defaultRotation: 8,
  },
  {
    id: "svg-cat",
    name: "cat",
    title: "Monochrome Cat",
    category: "characters",
    format: "component",
    componentName: "cat",
    svgSrc: "/stickers/cat.svg",
    description: "Curious cat head with expressive round pupils and perked ears.",
    tags: ["cat", "pet", "animal", "black", "character"],
    defaultRotation: 0,
  },
  {
    id: "svg-peace-hand",
    name: "peace-hand",
    title: "Peace Hand",
    category: "symbols",
    format: "component",
    componentName: "peace-hand",
    svgSrc: "/stickers/Peace-hand.svg",
    description: "Pastel neon peace sign hand with a bold graphic contour line.",
    tags: ["peace", "hand", "v-sign", "victory", "neon"],
    defaultRotation: 14,
  },
  {
    id: "comp-flame",
    name: "flame",
    title: "Orange Flame",
    category: "components",
    format: "component",
    componentName: "flame",
    description: "Punchy dual-tone fire sticker with 3D vinyl hover peel.",
    tags: ["flame", "fire", "streak", "orange", "energy", "hot"],
    defaultRotation: -5,
  },
  {
    id: "svg-coffee",
    name: "coffee",
    title: "Coffee Mug",
    category: "symbols",
    format: "component",
    componentName: "coffee",
    svgSrc: "/stickers/coffee.svg",
    description: "Retro diner coffee mug with steaming aroma swirls and comic pop-art palette.",
    tags: ["coffee", "cup", "mug", "drink", "morning", "retro", "cafe"],
    defaultRotation: -5,
  },
  /* Die-cut */
  {
    id: "die-cut-catbeats",
    name: "catbeats-cat",
    title: "Catbeats Cat",
    category: "die-cut",
    format: "component",
    componentName: "catbeats-cat",
    description: "Kawaii Japanese-style cat sticker reproduced from the Catbeats die-cut artwork.",
    tags: ["cat", "kawaii", "japanese", "catbeats", "die-cut", "character"],
    defaultRotation: -4,
    previewSize: 78,
  },

  /* Quirky faces pack — Dribbble: What a Quirky */
  { id: "quirky-orange-haired", name: "quirky-orange-haired", title: "Orange Haired Man", category: "quirky", format: "component", componentName: "quirky-orange-haired", description: "Grey face with wild orange hair and mustache, tilted smirk.", tags: ["quirky", "face", "orange", "hair", "funny"], defaultRotation: -6 },
  { id: "quirky-teal-haired", name: "quirky-teal-haired", title: "Teal Haired Figure", category: "quirky", format: "component", componentName: "quirky-teal-haired", description: "Purple face, teal hair, pink nose and dark beard.", tags: ["quirky", "face", "teal", "purple", "beard"], defaultRotation: 7 },
  { id: "quirky-curly-blue", name: "quirky-curly-blue", title: "Curly Blue Hair", category: "quirky", format: "component", componentName: "quirky-curly-blue", description: "Orange face with huge bright blue curls and a surprised stare.", tags: ["quirky", "face", "blue", "curly", "surprised"], defaultRotation: -4 },
  { id: "quirky-sunglasses", name: "quirky-sunglasses", title: "Sunglasses Figure", category: "quirky", format: "component", componentName: "quirky-sunglasses", description: "Black cap, red shades and a thick red mustache. Cool.", tags: ["quirky", "face", "sunglasses", "red", "cool"], defaultRotation: 5 },
  { id: "quirky-spiky-yellow", name: "quirky-spiky-yellow", title: "Spiky Yellow Hair", category: "quirky", format: "component", componentName: "quirky-spiky-yellow", description: "Purple face, spiky yellow hair and white-framed glasses.", tags: ["quirky", "face", "yellow", "spiky", "glasses"], defaultRotation: -8 },
  { id: "quirky-green-sad", name: "quirky-green-sad", title: "Green Haired Sad Man", category: "quirky", format: "component", componentName: "quirky-green-sad", description: "Weary green-haired face with orange mustache and open mouth.", tags: ["quirky", "face", "green", "sad", "mustache"], defaultRotation: 8 },
  { id: "quirky-crying-pink", name: "quirky-crying-pink", title: "Crying Pink Hair", category: "quirky", format: "component", componentName: "quirky-crying-pink", description: "Yellow face, wind-blown pink hair and big blue tears.", tags: ["quirky", "face", "pink", "crying", "tears"], defaultRotation: -7 },
  { id: "quirky-green-down", name: "quirky-green-down", title: "Green Hair Downward", category: "quirky", format: "component", componentName: "quirky-green-down", description: "Purple face, green hair, red mustache and closed sad eyes.", tags: ["quirky", "face", "green", "sad", "purple"], defaultRotation: 6 },
  { id: "quirky-hat-fish", name: "quirky-hat-fish", title: "Hat and Fish", category: "quirky", format: "component", componentName: "quirky-hat-fish", description: "Dark green face, orange cap, green shades and a little fish.", tags: ["quirky", "face", "hat", "fish", "cool"], defaultRotation: -5 },
  { id: "quirky-red-beard", name: "quirky-red-beard", title: "Red Bearded Blue Face", category: "quirky", format: "component", componentName: "quirky-red-beard", description: "Blue face with vibrant red hair and a full serious beard.", tags: ["quirky", "face", "blue", "red", "beard"], defaultRotation: 4 },
  { id: "quirky-excited-purple", name: "quirky-excited-purple", title: "Excited Purple Figure", category: "quirky", format: "component", componentName: "quirky-excited-purple", description: "Purple face, yellow hair and a wide toothy excited grin.", tags: ["quirky", "face", "purple", "yellow", "happy"], defaultRotation: 9 },
  { id: "quirky-neutral-green", name: "quirky-neutral-green", title: "Neutral Green Face", category: "quirky", format: "component", componentName: "quirky-neutral-green", description: "Dark hair and green face with bold vertical brows.", tags: ["quirky", "face", "green", "neutral"], defaultRotation: -4 },

  /* Spooky Halloween pack — Dribbble: Spooky Stickers */
  { id: "spooky-witch", name: "spooky-witch", title: "Flying Witch", category: "spooky", format: "component", componentName: "spooky-witch", description: "Wicked witch leaning on a broomstick, orange polka-dot dress.", tags: ["spooky", "halloween", "witch", "broom", "retro"], defaultRotation: -8 },
  { id: "spooky-monster-stack", name: "spooky-monster-stack", title: "Monster Stack", category: "spooky", format: "component", componentName: "spooky-monster-stack", description: "Pumpkin, one-eyed horned monster and skull stacked high.", tags: ["spooky", "halloween", "monster", "pumpkin", "skull"], defaultRotation: 3 },
  { id: "spooky-bigfoot", name: "spooky-bigfoot", title: "Smartphone Bigfoot", category: "spooky", format: "component", componentName: "spooky-bigfoot", description: "Bigfoot on a pumpkin swiping a phone with a baked-in LMAO bubble.", tags: ["spooky", "halloween", "bigfoot", "phone", "lmao"], defaultRotation: -5 },
  { id: "spooky-ghost", name: "spooky-ghost", title: "Trick-or-Treat Ghost", category: "spooky", format: "component", componentName: "spooky-ghost", description: "Happy ghost dancing with a lollipop and pumpkin candy bucket.", tags: ["spooky", "halloween", "ghost", "candy", "lollipop"], defaultRotation: 5 },
  { id: "spooky-reaper", name: "spooky-reaper", title: "Grim Reaper", category: "spooky", format: "component", componentName: "spooky-reaper", description: "Reaper striding with a scythe past a baked-in R.I.P. tombstone.", tags: ["spooky", "halloween", "reaper", "scythe", "rip"], defaultRotation: -3 },

  /* Blob ghosts pack — Dribbble: Funny set of stickers */
  { id: "funny-yellow-ghost", name: "funny-yellow-ghost", title: "Yellow Blob Ghost", category: "funny", format: "component", componentName: "funny-yellow-ghost", description: "Bright yellow round ghost with a tiny smile and blush.", tags: ["funny", "ghost", "blob", "yellow", "cute"], defaultRotation: -6 },
  { id: "funny-purple-ghost", name: "funny-purple-ghost", title: "Purple Blob Ghost", category: "funny", format: "component", componentName: "funny-purple-ghost", description: "Tall purple ghost with wide surprised eyes.", tags: ["funny", "ghost", "blob", "purple", "surprised"], defaultRotation: 7 },
  { id: "funny-grey-ghost", name: "funny-grey-ghost", title: "Grey Blob Ghost", category: "funny", format: "component", componentName: "funny-grey-ghost", description: "Sleepy grey ghost with droopy eyes and a small frown.", tags: ["funny", "ghost", "blob", "grey", "sleepy"], defaultRotation: -4 },
  { id: "funny-blue-ghost", name: "funny-blue-ghost", title: "Blue Blob Ghost", category: "funny", format: "component", componentName: "funny-blue-ghost", description: "Excited blue ghost with both arms raised and a big smile.", tags: ["funny", "ghost", "blob", "blue", "happy"], defaultRotation: 5 },
  { id: "funny-coral-fish-ghost", name: "funny-coral-fish-ghost", title: "Coral Fish Ghost", category: "funny", format: "component", componentName: "funny-coral-fish-ghost", description: "Curious coral ghost holding a little orange fish.", tags: ["funny", "ghost", "blob", "coral", "fish"], defaultRotation: -7 },
  { id: "funny-green-ghost", name: "funny-green-ghost", title: "Green Blob Ghost", category: "funny", format: "component", componentName: "funny-green-ghost", description: "Silly green ghost sticking its tongue out.", tags: ["funny", "ghost", "blob", "green", "silly"], defaultRotation: 6 },
  { id: "funny-pink-ghost", name: "funny-pink-ghost", title: "Pink Blob Ghost", category: "funny", format: "component", componentName: "funny-pink-ghost", description: "Cheeky pink ghost winking with a tiny heart blush.", tags: ["funny", "ghost", "blob", "pink", "wink"], defaultRotation: -5 },
  { id: "funny-glasses-ghost", name: "funny-glasses-ghost", title: "Glasses Blob Ghost", category: "funny", format: "component", componentName: "funny-glasses-ghost", description: "Calm light-blue ghost wearing round black glasses.", tags: ["funny", "ghost", "blob", "glasses", "blue"], defaultRotation: 4 },
  { id: "funny-orange-ghost", name: "funny-orange-ghost", title: "Orange Blob Ghost", category: "funny", format: "component", componentName: "funny-orange-ghost", description: "Cheerful chunky orange ghost with arms out and two teeth.", tags: ["funny", "ghost", "blob", "orange", "cheerful"], defaultRotation: -3 },

];

/* ------------------------------------------------------------------
   Sticker Visual Renderer & Helpers
------------------------------------------------------------------- */

function getComponentExportName(name: string): string {
  return (
    name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("") + "Sticker"
  );
}

function StickerVisual({
  item,
  size = 80,
  peel = false,
  className = "",
}: {
  item: CatalogItem;
  size?: number;
  peel?: boolean;
  className?: string;
}) {
  const stickerName = (item.componentName || item.name) as StickerName;
  return (
    <Sticker
      name={stickerName}
      size={size}
      peel={peel}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------
   Catalog Page
------------------------------------------------------------------- */

export default function StickersCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<StickerCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);

  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [installCopied, setInstallCopied] = useState(false);

  // Progressive rendering & batching for 500-1,000+ items
  const BATCH_SIZE = 100;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Inspector modal states
  const [inspectorSize, setInspectorSize] = useState(130);
  const [inspectorPeel, setInspectorPeel] = useState(true);
  const [inspectorBg, setInspectorBg] = useState<"white" | "zinc" | "warm" | "blue">("white");
  const [snippetTab, setSnippetTab] = useState<"named" | "dynamic">("named");

  // Smart scroll navbar: intentional, jitter-free scroll direction tracking
  const [navVisible, setNavVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [headerMounted, setHeaderMounted] = useState(false);
  const lastScrollY = useRef(0);
  const scrollAcc = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setHeaderMounted(true), 750);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      // At resting top of the page
      if (y <= 20) {
        setIsAtTop(true);
        setNavVisible(true);
        scrollAcc.current = 0;
        lastScrollY.current = y;
        return;
      }

      setIsAtTop(false);

      // Accumulate scroll in current direction; reset on direction swap
      if ((delta > 0 && scrollAcc.current < 0) || (delta < 0 && scrollAcc.current > 0)) {
        scrollAcc.current = delta;
      } else {
        scrollAcc.current += delta;
      }

      // Scrolling UP with clear user intent (at least 8px continuous upward motion)
      if (scrollAcc.current <= -8) {
        setNavVisible(true);
      }
      // Scrolling DOWN past hero with clear intent (at least 14px continuous downward motion)
      else if (scrollAcc.current >= 14 && y > 70) {
        setNavVisible(false);
      }

      lastScrollY.current = y;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Quickstart guide interactive state
  const [guideTab, setGuideTab] = useState<"react" | "svg">("react");
  const [guidePm, setGuidePm] = useState<"npm" | "pnpm" | "bun" | "yarn">("npm");
  const [guideSticker, setGuideSticker] = useState<StickerName>("flame");
  const [guideMode, setGuideMode] = useState<"direct" | "dynamic">("direct");
  const [guidePeel, setGuidePeel] = useState(true);
  const [guideSize, setGuideSize] = useState(96);
  const [guideCopied, setGuideCopied] = useState<"install" | "code" | null>(null);

  useEffect(() => {
    if (!guideCopied) return;
    const t = setTimeout(() => setGuideCopied(null), 1800);
    return () => clearTimeout(t);
  }, [guideCopied]);

  // Scroll to #docs when requested by URL hash or navigation
  useEffect(() => {
    function scrollToDocs(behavior: ScrollBehavior = "smooth") {
      if (window.location.hash === "#docs") {
        const el = document.getElementById("docs");
        if (el) {
          el.scrollIntoView({ behavior });
        }
      }
    }

    if (window.location.hash === "#docs") {
      setVisibleCount(CATALOG.length);
      const t1 = setTimeout(() => scrollToDocs("smooth"), 100);
      const t2 = setTimeout(() => scrollToDocs("smooth"), 350);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    window.addEventListener("hashchange", () => scrollToDocs("smooth"));
    return () => {
      window.removeEventListener("hashchange", () => scrollToDocs("smooth"));
    };
  }, []);

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
        : `<img src="/stickers/coffee.svg" alt="Coffee sticker" width={${guideSize}} height={${guideSize}} />`;

    try {
      await navigator.clipboard.writeText(code);
      setGuideCopied("code");
    } catch (err) {
      console.error(err);
    }
  }

  // Copy feedback reset
  useEffect(() => {
    if (!copiedId) return;
    const t = setTimeout(() => setCopiedId(null), 1800);
    return () => clearTimeout(t);
  }, [copiedId]);

  useEffect(() => {
    if (!installCopied) return;
    const t = setTimeout(() => setInstallCopied(false), 1800);
    return () => clearTimeout(t);
  }, [installCopied]);

  // Escape key closes modal
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveItem(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Filtered stickers with deferred search to keep input 60fps
  const filteredStickers = useMemo(() => {
    const q = deferredSearch.toLowerCase().trim();
    return CATALOG.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, deferredSearch]);

  // Reset batch count on filter/search change
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setVisibleCount(BATCH_SIZE);
    });
    return () => cancelAnimationFrame(id);
  }, [selectedCategory, deferredSearch]);

  // Infinite scroll observer to progressively load batches
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredStickers.length));
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredStickers.length]);

  // Sliced items for render
  const visibleStickers = useMemo(() => {
    return filteredStickers.slice(0, visibleCount);
  }, [filteredStickers, visibleCount]);

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText("npm i stick-it-up@latest");
      setInstallCopied(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function copyCode(item: CatalogItem, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    const stickerName = item.componentName || item.name;
    const compName = getComponentExportName(stickerName);
    const code = `import { ${compName} } from "stick-it-up";\n\n<${compName} size={96} peel />`;

    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(item.id);
    } catch (err) {
      console.error(err);
    }
  }

  const categoryCounts = useMemo(() => {
    return {
      all: CATALOG.length,
      characters: CATALOG.filter((c) => c.category === "characters").length,
      components: CATALOG.filter((c) => c.category === "components").length,
      symbols: CATALOG.filter((c) => c.category === "symbols").length,
      "die-cut": CATALOG.filter((c) => c.category === "die-cut").length,
      quirky: CATALOG.filter((c) => c.category === "quirky").length,
      spooky: CATALOG.filter((c) => c.category === "spooky").length,
      funny: CATALOG.filter((c) => c.category === "funny").length,
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip w-full bg-white text-zinc-900 antialiased selection:bg-amber-100 selection:text-amber-900">
      <style>{`
        @keyframes headerRise {
          from { opacity: 0; transform: translateY(-10px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: none; }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(16px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: none; }
        }
        @keyframes pop {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
      `}</style>

      {/* ------------------------------------------------------------------
          STICKY NAVBAR (consistent with landing page)
      ------------------------------------------------------------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 py-2 transition-[background-color,border-color,box-shadow] duration-200 ${
          isAtTop
            ? "backdrop-blur-md bg-white/80 border-b border-zinc-100"
            : "backdrop-blur-md bg-white/90 border-b border-zinc-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)]"
        }`}
        style={{
          transform: navVisible ? "translate3d(0, 0, 0)" : "translate3d(0, -100%, 0)",
          transition: "transform 260ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
          willChange: "transform",
          pointerEvents: navVisible ? "auto" : "none",
          animation: !headerMounted ? "headerRise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both" : undefined,
        }}
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between">
          {/* brand */}
          <Link href="/" className="group flex items-center gap-2.5">
            <img
              src="/stickers/logo.svg"
              alt="Sketch Up logo"
              className="h-9 w-9 rounded-lg transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
            />
            <span className="text-lg font-semibold tracking-tight text-zinc-900">
              Sketch Up
            </span>
          </Link>

          {/* links */}
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
                className="rounded-lg bg-zinc-100 px-3.5 py-2 text-sm font-medium text-zinc-900 transition-colors duration-150"
              >
                Stickers
                <span className="ml-1.5 rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {CATALOG.length}
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#docs"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("docs")?.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", "#docs");
                }}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
              >
                Docs
              </a>
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

          {/* visitor counter & github star */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <VisitorCounter />
            <GitHubStarButton />
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------------------------
          HERO / INTRO SECTION
      ------------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 text-center">
        

        {/* Title */}
        <h1
          className=" font-sans text-4xl font-normal leading-[1.08] tracking-tight text-zinc-900 sm:text-6xl"
          style={{ animation: "rise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 80ms both" }}
        >
          Sketch Up.
          <br />
          <span className="text-zinc-500">Pick any sticker, drop it in.</span>
        </h1>

        
        {/* Quick Install Bar */}
        <div
          className="mt-8 flex items-center justify-center gap-2"
          style={{ animation: "rise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 240ms both" }}
        >
          {/* Install command pill */}
          <button
            onClick={copyInstall}
            type="button"
            aria-label={installCopied ? "Copied to clipboard" : "Copy npm i stick-it-up@latest"}
            className={`group inline-flex items-center gap-3 rounded-full border px-3.5 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 ${
              installCopied
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-100/60"
                : "border-zinc-200/90 bg-white hover:border-zinc-300 hover:bg-zinc-50/60"
            }`}
          >
            {/* Text swap: both states share one grid cell so the button width remains precise and never jumps */}
            <span className="relative grid place-items-center font-mono text-xs text-center" aria-live="polite">
              <span
                className={`col-start-1 row-start-1 flex items-center justify-center text-center transition-all duration-200 ease-out ${
                  installCopied
                    ? "-translate-y-1 opacity-0 blur-[1px] pointer-events-none"
                    : "translate-y-0 opacity-100 blur-0 text-zinc-500 group-hover:text-zinc-700"
                }`}
              >
                <span className="mr-1.5 select-none text-zinc-400">$</span>npm i stick-it-up@latest
              </span>

              <span
                className={`col-start-1 row-start-1 flex items-center justify-center text-center font-medium text-emerald-700 transition-all duration-200 ease-out ${
                  installCopied
                    ? "translate-y-0 opacity-100 blur-0"
                    : "translate-y-1 opacity-0 blur-[1px] pointer-events-none"
                }`}
              >
                Copied!
              </span>
            </span>

            <span className="flex items-center">
              {installCopied ? (
                <LuCopyCheck className="h-3.5 w-3.5 text-emerald-600 transition-transform duration-200 scale-110" />
              ) : (
                <LuCopy className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-zinc-600" />
              )}
            </span>
          </button>

          {/* GitHub button (icon-only circular) */}
          <a
            href="https://github.com/Sam721166/stick-it-up"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-zinc-200/90 bg-white text-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50/60 hover:text-zinc-900 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2"
            title="View on GitHub"
            aria-label="View on GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          CONTROLS: SEARCH & CATEGORY FILTER TABS
      ------------------------------------------------------------------- */}
      <section className=" top-[68px] z-30 mx-auto max-w-6xl px-6 pb-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-white/95 p-2 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {(
              [
                { id: "all", label: "All Stickers", count: categoryCounts.all },
                { id: "characters", label: "Characters", count: categoryCounts.characters },
                { id: "components", label: "Chrome & Badges", count: categoryCounts.components },
                { id: "symbols", label: "Symbols & Badges", count: categoryCounts.symbols },
                { id: "die-cut", label: "Die-cut", count: categoryCounts["die-cut"] },
                { id: "quirky", label: "Quirky", count: categoryCounts.quirky },
                { id: "spooky", label: "Spooky", count: categoryCounts.spooky },
                { id: "funny", label: "Funny Ghosts", count: categoryCounts.funny },
              ] as const
            ).map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-150 ${
                    active
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                      active ? "bg-zinc-700 text-zinc-200" : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stickers..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-1.5 pl-8 pr-8 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-400 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          STICKER GRID
      ------------------------------------------------------------------- */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        {filteredStickers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 py-20 text-center">
            <p className="font-sans text-xl font-medium text-zinc-700">No stickers found</p>
            <p className="mt-1 text-sm text-zinc-400">
              Try searching for &ldquo;cat&rdquo;, &ldquo;ghost&rdquo;, &ldquo;witch&rdquo;, &ldquo;face&rdquo;, or &ldquo;flame&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 cursor-pointer rounded-xl bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-4">
              {visibleStickers.map((item) => {
                const isCopied = copiedId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    style={{
                      contentVisibility: "auto",
                      containIntrinsicSize: "168px",
                    }}
                    className="group relative flex min-h-[168px] flex-col items-center justify-between rounded-2xl border border-zinc-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] cursor-pointer"
                  >
                    {/* Subtle top-right copy button on hover */}
                    <button
                      type="button"
                      onClick={(e) => copyCode(item, e)}
                      title="Copy lightweight JSX code"
                      className={`absolute right-2.5 top-2.5 rounded-lg p-1.5 transition-all ${
                        isCopied
                          ? "opacity-100 bg-emerald-50 text-emerald-600"
                          : "opacity-0 group-hover:opacity-100 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                      }`}
                    >
                      {isCopied ? (
                        <LuCopyCheck className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <LuCopy className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-600" />
                      )}
                    </button>

                    {/* Sticker visual */}
                    <div className="flex flex-1 items-center justify-center py-2">
                      <div
                        className="transition-transform duration-200 group-hover:scale-110"
                        style={{
                          transform: `rotate(${item.defaultRotation || 0}deg)`,
                        }}
                      >
                        <StickerVisual item={item} size={item.previewSize || 74} peel={false} />
                      </div>
                    </div>

                    {/* Name matches code prop */}
                    <span className="w-full truncate text-center font-sans text-xs font-medium text-zinc-600  transition-colors duration-150 group-hover:text-zinc-950">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Infinite scroll sentinel & count indicator for large catalogs */}
            {visibleCount < filteredStickers.length && (
              <div
                ref={loadMoreRef}
                className="mt-8 flex items-center justify-center py-4 text-xs text-zinc-400"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-50 px-3.5 py-1.5 font-medium text-zinc-600 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Showing {visibleStickers.length} of {filteredStickers.length} stickers — scroll for more
                </span>
              </div>
            )}
          </>
        )}
      </main>

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
                                { id: "luffy-hat", label: "luffy-hat" },
                                { id: "cat", label: "cat" },
                                { id: "peace-hand", label: "peace-hand" },
                                { id: "flame", label: "flame" },
                                { id: "coffee", label: "coffee" },
                                { id: "catbeats-cat", label: "catbeats" },
                                { id: "quirky-orange-haired", label: "quirky" },
                                { id: "spooky-witch", label: "witch" },
                                { id: "funny-yellow-ghost", label: "ghost" },
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
                    { name: "name", type: "string", desc: 'Sticker ID (for generic <Sticker />), e.g. "flame". Not needed when using direct component imports.' },
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
  src="/stickers/Flame.svg"
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

      {/* ------------------------------------------------------------------
          INSPECTOR / PREVIEW MODAL
      ------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------
    INSPECTOR MODAL (drop-in replacement)
    Uses existing page state: activeItem, setActiveItem, inspectorBg,
    setInspectorBg, inspectorSize, setInspectorSize, inspectorPeel,
    setInspectorPeel, copiedId, setCopiedId, StickerVisual
------------------------------------------------------------------- */}
{activeItem &&
  (() => {
    const stickerName = activeItem.componentName || activeItem.name;
    const componentPascalName = getComponentExportName(stickerName);

    const namedCode = `import { ${componentPascalName} } from "stick-it-up";\n\n<${componentPascalName}\n  size={${inspectorSize}}${
      inspectorPeel ? "\n  peel" : ""
    }\n/>`;

    const dynamicCode = `import { Sticker } from "stick-it-up";\n\n<Sticker\n  name="${stickerName}"\n  size={${inspectorSize}}${
      inspectorPeel ? "\n  peel" : ""
    }\n/>`;

    const code = snippetTab === "named" ? namedCode : dynamicCode;

    const copied = copiedId === activeItem.id;

    async function copySnippet() {
      try {
        await navigator.clipboard.writeText(code);
        setCopiedId(activeItem!.id);
      } catch (err) {
        console.error(err);
      }
    }

    function downloadSvg() {
      if (activeItem?.svgSrc) {
        const a = document.createElement("a");
        a.href = activeItem.svgSrc;
        a.download = `${activeItem.name}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
      const stage = document.getElementById("inspector-sticker-stage");
      const svgEl = stage?.querySelector("svg");
      if (svgEl) {
        const svgClone = svgEl.cloneNode(true) as SVGSVGElement;
        svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const svgData = new XMLSerializer().serializeToString(svgClone);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${activeItem?.name || "sticker"}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }

    const backgrounds = [
      { id: "white", label: "White", swatch: "bg-white border-zinc-300", stage: "bg-white" },
      { id: "zinc", label: "Dark", swatch: "bg-zinc-900 border-zinc-700", stage: "bg-zinc-950" },
      { id: "warm", label: "Warm", swatch: "bg-amber-100 border-amber-300", stage: "bg-[#fff7ed]" },
      { id: "blue", label: "Cool", swatch: "bg-blue-100 border-blue-300", stage: "bg-[#eff6ff]" },
    ] as const;

    const stage = backgrounds.find((b) => b.id === inspectorBg) ?? backgrounds[0];
    const dark = inspectorBg === "zinc";

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${activeItem.title} sticker`}
        onClick={() => setActiveItem(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-y-auto rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_24px_60px_rgba(0,0,0,0.18)] animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-6">
            <div>
              <h3 className="font-mono text-lg font-semibold tracking-tight text-zinc-900">
                {activeItem.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close"
              className="-mr-2 -mt-1 shrink-0 cursor-pointer rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Preview */}
          <div className="px-6 pt-5">
            <div
              className={`relative flex h-48 items-center justify-center rounded-2xl border border-zinc-200 transition-colors duration-300 ${stage.stage}`}
            >
              <div id="inspector-sticker-stage" className="relative">
                <StickerVisual
                  item={activeItem}
                  size={
                    activeItem.previewSize
                      ? Math.round(inspectorSize * (activeItem.previewSize / 74))
                      : inspectorSize
                  }
                  peel={inspectorPeel}
                />
              </div>
              
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3.5 px-6 pt-5 text-xs">
            <div className="flex items-center gap-4">
              <span className="w-20 shrink-0 font-medium text-zinc-500">Size</span>
              <input
                type="range"
                min="48"
                max="180"
                value={inspectorSize}
                onChange={(e) => setInspectorSize(Number(e.target.value))}
                aria-label="Sticker size"
                className="h-1 flex-1 cursor-pointer accent-zinc-900"
              />
              <span className="w-11 text-right font-mono text-[11px] text-zinc-500">
                {inspectorSize}px
              </span>
            </div>

            {/* Background + Peel effect (same flex row, justify-between) */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-medium text-zinc-500">Background</span>
                <div className="flex items-center gap-2">
                  {backgrounds.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      title={b.label}
                      aria-label={`${b.label} background`}
                      aria-pressed={inspectorBg === b.id}
                      onClick={() => setInspectorBg(b.id)}
                      className={`h-5 w-5 cursor-pointer rounded-full border transition-transform ${b.swatch} ${
                        inspectorBg === b.id
                          ? "scale-110 ring-2 ring-zinc-900 ring-offset-2"
                          : "hover:scale-110"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-medium text-zinc-500">Peel effect</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={inspectorPeel}
                  aria-label="Peel effect on hover"
                  onClick={() => setInspectorPeel(!inspectorPeel)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                    inspectorPeel ? "bg-zinc-900" : "bg-zinc-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      inspectorPeel ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="px-6 pb-6 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900">Usage</span>
              <button
                type="button"
                onClick={downloadSvg}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-900 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download SVG
              </button>
            </div>

            <div className="mt-2.5 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-white px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSnippetTab("named")}
                    className={`cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                      snippetTab === "named"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                    }`}
                  >
                    Direct Import
                  </button>
                  <button
                    type="button"
                    onClick={() => setSnippetTab("dynamic")}
                    className={`cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                      snippetTab === "dynamic"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                    }`}
                  >
                    Dynamic
                  </button>
                 
                </div>
                <button
                  type="button"
                  onClick={copySnippet}
                  className={`inline-flex h-[26px] items-center justify-center cursor-pointer rounded-md border px-2.5 text-[11px] font-medium leading-none transition-all active:scale-95 ${
                    copied
                      ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {copied ? (
                    <span className="inline-flex items-center gap-1 leading-none">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="h-3 w-3"
                      >
                        <path
                          d="m5 13 4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Copied
                    </span>
                  ) : (
                    "Copy code"
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-800">
                <code>{code}</code>
              </pre>
            </div>

            
          </div>
        </div>
      </div>
    );
  })()}


      {/* ------------------------------------------------------------------
          FOOTER (shared from landing page)
      ------------------------------------------------------------------- */}
      <Footer />
    </div>
  );
}
