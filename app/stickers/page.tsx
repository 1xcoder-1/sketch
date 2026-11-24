"use client";

import React, { useState, useMemo, useEffect, useRef, useDeferredValue } from "react";
import Link from "next/link";
import { LuCopyCheck, LuCopy, LuCopyX } from "react-icons/lu";
import { Sticker, type StickerName, toSvgString, findSticker, trazoCatalog } from "stick-it-up";
import Footer from "../../components/landing/footer";
import { VisitorCounter, GitHubStarButton } from "../../components/landing/nav-actions";
import { PhotoSticker } from "../../components/stickers/photo-sticker";
import { CEO_CATALOG } from "./ceo-catalog.generated";

/* ------------------------------------------------------------------
   Sticker Catalog Data
------------------------------------------------------------------- */

type StickerFormat = "component" | "svg" | "trazo" | "photo";
type StickerCategory = "all" | "tech-ceos" | "ocean" | "arrows" | "nature" | "hearts" | "symbols" | "characters" | "legacy";
type CopyFeedback = "idle" | "copied" | "failed";

interface StickerAttribution {
  filePageUrl: string;
  sourceTitle: string;
  author: string;
  license: string;
}

interface CatalogItem {
  id: string;
  name: string;
  title: string;
  category: string;
  format: StickerFormat;
  description: string;
  tags: string[];
  componentName?: string;
  svgSrc?: string;
  trazoId?: string;
  photoSrc?: string;
  aura?: string;
  attribution?: StickerAttribution;
  defaultRotation?: number;
  previewSize?: number;
}

const TRAZO_CATALOG: CatalogItem[] = trazoCatalog.map((s) => ({
    id: `trazo-${s.id}`,
    name: s.id,
    title: s.name,
    category: s.category,
    format: "trazo" as const,
    description: `${s.name} Trazo sticker`,
    tags: [...s.tags],
    trazoId: s.id,
    componentName: s.componentName,
    defaultRotation: 0,
  }))

const LEGACY_CATALOG: CatalogItem[] = [
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
  /* Static vector SVGs */
  {
    id: "svg-panda-bear-1",
    name: "panda-bear-1",
    title: "Panda Bear Set 1",
    category: "characters",
    format: "component",
    componentName: "panda-bear-1",
    svgSrc: "/stickers/panda-bear-1.svg",
    description: "Playful bear character from the bears and panda illustration set.",
    tags: ["panda", "bear", "animal", "cute"],
    defaultRotation: 4,
  },
  {
    id: "svg-panda-bear-2",
    name: "panda-bear-2",
    title: "Panda Bear Set 2",
    category: "characters",
    format: "component",
    componentName: "panda-bear-2",
    svgSrc: "/stickers/panda-bear-2.svg",
    description: "Second bear character from the bears and panda illustration set.",
    tags: ["panda", "bear", "animal", "cute"],
    defaultRotation: -5,
  },
  {
    id: "svg-panda-garland",
    name: "panda-garland",
    title: "Christmas Panda With Garland",
    category: "characters",
    format: "component",
    componentName: "panda-garland",
    svgSrc: "/stickers/panda-garland.svg",
    description: "Editable vector tracing of christmas panda with garland from the reference artwork, with a transparent background.",
    tags: ["panda", "christmas", "winter", "cute", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-panda-sack",
    name: "panda-sack",
    title: "Christmas Panda With Sack",
    category: "characters",
    format: "component",
    componentName: "panda-sack",
    svgSrc: "/stickers/panda-sack.svg",
    description: "Editable vector tracing of christmas panda with sack from the reference artwork, with a transparent background.",
    tags: ["panda", "christmas", "winter", "cute", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-winter-doodle-4",
    name: "winter-doodle-4",
    title: "Winter Doodle Animal 4",
    category: "characters",
    format: "component",
    componentName: "winter-doodle-4",
    svgSrc: "/stickers/winter-doodle-4.svg",
    description: "Editable vector tracing of winter doodle animal 4 from the reference artwork, with a transparent background.",
    tags: ["winter", "animal", "doodle", "cute", "vector"],
    defaultRotation: -3,
  },
  {
    id: "svg-xmas-character-1",
    name: "xmas-character-1",
    title: "Christmas Character 1",
    category: "characters",
    format: "component",
    componentName: "xmas-character-1",
    svgSrc: "/stickers/xmas-character-1.svg",
    description: "Editable vector tracing of christmas character 1 from the reference artwork, with a transparent background.",
    tags: ["christmas", "character", "cartoon", "cute", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-xmas-character-4",
    name: "xmas-character-4",
    title: "Christmas Character 4",
    category: "characters",
    format: "component",
    componentName: "xmas-character-4",
    svgSrc: "/stickers/xmas-character-4.svg",
    description: "Editable vector tracing of christmas character 4 from the reference artwork, with a transparent background.",
    tags: ["christmas", "character", "cartoon", "cute", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-forest-animal-4",
    name: "forest-animal-4",
    title: "Winter Forest Animal 4",
    category: "characters",
    format: "component",
    componentName: "forest-animal-4",
    svgSrc: "/stickers/forest-animal-4.svg",
    description: "Editable vector tracing of winter forest animal 4 from the reference artwork, with a transparent background.",
    tags: ["winter", "forest", "animal", "cute", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-halloween-face-3",
    name: "halloween-face-3",
    title: "Halloween Character Face 3",
    category: "spooky",
    format: "component",
    componentName: "halloween-face-3",
    svgSrc: "/stickers/halloween-face-3.svg",
    description: "Static editable vector tracing of halloween character face 3 from the Halloween character artwork, with a transparent background and no neighbouring artwork.",
    tags: ["halloween", "character", "spooky", "cartoon", "vector"],
    defaultRotation: -3,
  },
  {
    id: "svg-monster-face-1",
    name: "monster-face-1",
    title: "Spooky Monster Face 1",
    category: "spooky",
    format: "component",
    componentName: "monster-face-1",
    svgSrc: "/stickers/monster-face-1.svg",
    description: "High-resolution editable vector tracing of spooky monster face 1 from the Halloween monster faces collection, with a transparent background.",
    tags: ["halloween", "monster", "spooky", "face", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-monster-face-2",
    name: "monster-face-2",
    title: "Spooky Monster Face 2",
    category: "spooky",
    format: "component",
    componentName: "monster-face-2",
    svgSrc: "/stickers/monster-face-2.svg",
    description: "High-resolution editable vector tracing of spooky monster face 2 from the Halloween monster faces collection, with a transparent background.",
    tags: ["halloween", "monster", "spooky", "face", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-monster-face-3",
    name: "monster-face-3",
    title: "Spooky Monster Face 3",
    category: "spooky",
    format: "component",
    componentName: "monster-face-3",
    svgSrc: "/stickers/monster-face-3.svg",
    description: "High-resolution editable vector tracing of spooky monster face 3 from the Halloween monster faces collection, with a transparent background.",
    tags: ["halloween", "monster", "spooky", "face", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-monster-face-7",
    name: "monster-face-7",
    title: "Spooky Monster Face 7",
    category: "spooky",
    format: "component",
    componentName: "monster-face-7",
    svgSrc: "/stickers/monster-face-7.svg",
    description: "High-resolution editable vector tracing of spooky monster face 7 from the Halloween monster faces collection, with a transparent background.",
    tags: ["halloween", "monster", "spooky", "face", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-monster-face-8",
    name: "monster-face-8",
    title: "Spooky Monster Face 8",
    category: "spooky",
    format: "component",
    componentName: "monster-face-8",
    svgSrc: "/stickers/monster-face-8.svg",
    description: "High-resolution editable vector tracing of spooky monster face 8 from the Halloween monster faces collection, with a transparent background.",
    tags: ["halloween", "monster", "spooky", "face", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-monster-face-9",
    name: "monster-face-9",
    title: "Spooky Monster Face 9",
    category: "spooky",
    format: "component",
    componentName: "monster-face-9",
    svgSrc: "/stickers/monster-face-9.svg",
    description: "High-resolution editable vector tracing of spooky monster face 9 from the Halloween monster faces collection, with a transparent background.",
    tags: ["halloween", "monster", "spooky", "face", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-monster-icon-1",
    name: "monster-icon-1",
    title: "Monster Head Icon 1",
    category: "spooky",
    format: "component",
    componentName: "monster-icon-1",
    svgSrc: "/stickers/monster-icon-1.svg",
    description: "High-resolution editable vector tracing of monster head icon 1 from the monster head icon set, with a transparent background.",
    tags: ["halloween", "monster", "icon", "spooky", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-monster-icon-3",
    name: "monster-icon-3",
    title: "Monster Head Icon 3",
    category: "spooky",
    format: "component",
    componentName: "monster-icon-3",
    svgSrc: "/stickers/monster-icon-3.svg",
    description: "High-resolution editable vector tracing of monster head icon 3 from the monster head icon set, with a transparent background.",
    tags: ["halloween", "monster", "icon", "spooky", "vector"],
    defaultRotation: -3,
  },
  {
    id: "svg-monster-icon-5",
    name: "monster-icon-5",
    title: "Monster Head Icon 5",
    category: "spooky",
    format: "component",
    componentName: "monster-icon-5",
    svgSrc: "/stickers/monster-icon-5.svg",
    description: "High-resolution editable vector tracing of monster head icon 5 from the monster head icon set, with a transparent background.",
    tags: ["halloween", "monster", "icon", "spooky", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-halloween-sketch-4",
    name: "halloween-sketch-4",
    title: "Hand-Drawn Halloween Sketch 4",
    category: "spooky",
    format: "component",
    componentName: "halloween-sketch-4",
    svgSrc: "/stickers/halloween-sketch-4.svg",
    description: "High-resolution editable vector tracing of a hand-drawn Halloween character from the Halloween characters pack, with a transparent background.",
    tags: ["halloween", "hand-drawn", "character", "spooky", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-halloween-prop-1",
    name: "halloween-prop-1",
    title: "Halloween Pumpkin Prop",
    category: "spooky",
    format: "component",
    componentName: "halloween-prop-1",
    svgSrc: "/stickers/halloween-prop-1.svg",
    description: "High-resolution editable vector tracing of a carved Halloween pumpkin from the Halloween characters elements set, with a transparent background.",
    tags: ["halloween", "pumpkin", "prop", "spooky", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-cute-monster-1",
    name: "cute-monster-1",
    title: "Cute Halloween Monster 1",
    category: "spooky",
    format: "component",
    componentName: "cute-monster-1",
    svgSrc: "/stickers/cute-monster-1.svg",
    description: "High-resolution editable vector tracing of a cute cartoon Halloween monster from the cute monster character collection, with a transparent background.",
    tags: ["halloween", "cute", "monster", "cartoon", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-cute-monster-2",
    name: "cute-monster-2",
    title: "Cute Halloween Monster 2",
    category: "spooky",
    format: "component",
    componentName: "cute-monster-2",
    svgSrc: "/stickers/cute-monster-2.svg",
    description: "High-resolution editable vector tracing of a cute cartoon Halloween monster from the cute monster character collection, with a transparent background.",
    tags: ["halloween", "cute", "monster", "cartoon", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-cute-monster-3",
    name: "cute-monster-3",
    title: "Cute Halloween Monster 3",
    category: "spooky",
    format: "component",
    componentName: "cute-monster-3",
    svgSrc: "/stickers/cute-monster-3.svg",
    description: "High-resolution editable vector tracing of a cute cartoon Halloween monster from the cute monster character collection, with a transparent background.",
    tags: ["halloween", "cute", "monster", "cartoon", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-cute-monster-5",
    name: "cute-monster-5",
    title: "Cute Halloween Monster 5",
    category: "spooky",
    format: "component",
    componentName: "cute-monster-5",
    svgSrc: "/stickers/cute-monster-5.svg",
    description: "High-resolution editable vector tracing of a cute cartoon Halloween monster from the cute monster character collection, with a transparent background.",
    tags: ["halloween", "cute", "monster", "cartoon", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-cute-monster-6",
    name: "cute-monster-6",
    title: "Cute Halloween Monster 6",
    category: "spooky",
    format: "component",
    componentName: "cute-monster-6",
    svgSrc: "/stickers/cute-monster-6.svg",
    description: "High-resolution editable vector tracing of a cute cartoon Halloween monster from the cute monster character collection, with a transparent background.",
    tags: ["halloween", "cute", "monster", "cartoon", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-watercolor-character-1",
    name: "watercolor-character-1",
    title: "Watercolor Halloween Character 1",
    category: "spooky",
    format: "component",
    componentName: "watercolor-character-1",
    svgSrc: "/stickers/watercolor-character-1.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween character from the watercolor character collection, with a transparent background.",
    tags: ["halloween", "watercolor", "character", "hand-painted", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-watercolor-character-3",
    name: "watercolor-character-3",
    title: "Watercolor Halloween Character 3",
    category: "spooky",
    format: "component",
    componentName: "watercolor-character-3",
    svgSrc: "/stickers/watercolor-character-3.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween character from the watercolor character collection, with a transparent background.",
    tags: ["halloween", "watercolor", "character", "hand-painted", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-watercolor-character-4",
    name: "watercolor-character-4",
    title: "Watercolor Halloween Character 4",
    category: "spooky",
    format: "component",
    componentName: "watercolor-character-4",
    svgSrc: "/stickers/watercolor-character-4.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween character from the watercolor character collection, with a transparent background.",
    tags: ["halloween", "watercolor", "character", "hand-painted", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-watercolor-kid-2",
    name: "watercolor-kid-2",
    title: "Watercolor Halloween Kid 2",
    category: "spooky",
    format: "component",
    componentName: "watercolor-kid-2",
    svgSrc: "/stickers/watercolor-kid-2.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween kid character from the watercolor kid collection, with a transparent background.",
    tags: ["halloween", "watercolor", "kid", "character", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-watercolor-kid-3",
    name: "watercolor-kid-3",
    title: "Watercolor Halloween Kid 3",
    category: "spooky",
    format: "component",
    componentName: "watercolor-kid-3",
    svgSrc: "/stickers/watercolor-kid-3.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween kid character from the watercolor kid collection, with a transparent background.",
    tags: ["halloween", "watercolor", "kid", "character", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-watercolor-kid-5",
    name: "watercolor-kid-5",
    title: "Watercolor Halloween Kid 5",
    category: "spooky",
    format: "component",
    componentName: "watercolor-kid-5",
    svgSrc: "/stickers/watercolor-kid-5.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween kid character from the watercolor kid collection, with a transparent background.",
    tags: ["halloween", "watercolor", "kid", "character", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-watercolor-kid-6",
    name: "watercolor-kid-6",
    title: "Watercolor Halloween Kid 6",
    category: "spooky",
    format: "component",
    componentName: "watercolor-kid-6",
    svgSrc: "/stickers/watercolor-kid-6.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween kid character from the watercolor kid collection, with a transparent background.",
    tags: ["halloween", "watercolor", "kid", "character", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-videogame-collection-1",
    name: "videogame-collection-1",
    title: "Retro Videogame Character 1",
    category: "spooky",
    format: "component",
    componentName: "videogame-collection-1",
    svgSrc: "/stickers/videogame-collection-1.svg",
    description: "High-resolution editable vector tracing of a retro videogame character from the videogame character collection, with a transparent background.",
    tags: ["videogame", "retro", "character", "arcade", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-videogame-collection-2",
    name: "videogame-collection-2",
    title: "Retro Videogame Character 2",
    category: "spooky",
    format: "component",
    componentName: "videogame-collection-2",
    svgSrc: "/stickers/videogame-collection-2.svg",
    description: "High-resolution editable vector tracing of a retro videogame character from the videogame character collection, with a transparent background.",
    tags: ["videogame", "retro", "character", "arcade", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-videogame-set-3",
    name: "videogame-set-3",
    title: "Retro Videogame Hero 3",
    category: "spooky",
    format: "component",
    componentName: "videogame-set-3",
    svgSrc: "/stickers/videogame-set-3.svg",
    description: "High-resolution editable vector tracing of a retro videogame hero from the videogame character set, with a transparent background.",
    tags: ["videogame", "retro", "hero", "arcade", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-videogame-set-4",
    name: "videogame-set-4",
    title: "Retro Videogame Hero 4",
    category: "spooky",
    format: "component",
    componentName: "videogame-set-4",
    svgSrc: "/stickers/videogame-set-4.svg",
    description: "High-resolution editable vector tracing of a retro videogame hero from the videogame character set, with a transparent background.",
    tags: ["videogame", "retro", "hero", "arcade", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-watercolor-halloween-3",
    name: "watercolor-halloween-3",
    title: "Watercolor Halloween Spooky 3",
    category: "spooky",
    format: "component",
    componentName: "watercolor-halloween-3",
    svgSrc: "/stickers/watercolor-halloween-3.svg",
    description: "High-resolution editable vector tracing of a spooky watercolor Halloween character from the watercolor Halloween collection, with a transparent background.",
    tags: ["halloween", "watercolor", "spooky", "character", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-watercolor-halloween-5",
    name: "watercolor-halloween-5",
    title: "Watercolor Halloween Spooky 5",
    category: "spooky",
    format: "component",
    componentName: "watercolor-halloween-5",
    svgSrc: "/stickers/watercolor-halloween-5.svg",
    description: "High-resolution editable vector tracing of a spooky watercolor Halloween character from the watercolor Halloween collection, with a transparent background.",
    tags: ["halloween", "watercolor", "spooky", "character", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-handdrawn-kid-1",
    name: "handdrawn-kid-1",
    title: "Hand-Drawn Halloween Kid 1",
    category: "spooky",
    format: "component",
    componentName: "handdrawn-kid-1",
    svgSrc: "/stickers/handdrawn-kid-1.svg",
    description: "High-resolution editable vector tracing of a hand-drawn Halloween kid character from the hand-drawn kid collection, with a transparent background.",
    tags: ["halloween", "hand-drawn", "kid", "character", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-handdrawn-kid-3",
    name: "handdrawn-kid-3",
    title: "Hand-Drawn Halloween Kid 3",
    category: "spooky",
    format: "component",
    componentName: "handdrawn-kid-3",
    svgSrc: "/stickers/handdrawn-kid-3.svg",
    description: "High-resolution editable vector tracing of a hand-drawn Halloween kid character from the hand-drawn kid collection, with a transparent background.",
    tags: ["halloween", "hand-drawn", "kid", "character", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-handdrawn-kid-4",
    name: "handdrawn-kid-4",
    title: "Hand-Drawn Halloween Kid 4",
    category: "spooky",
    format: "component",
    componentName: "handdrawn-kid-4",
    svgSrc: "/stickers/handdrawn-kid-4.svg",
    description: "High-resolution editable vector tracing of a hand-drawn Halloween kid character from the hand-drawn kid collection, with a transparent background.",
    tags: ["halloween", "hand-drawn", "kid", "character", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-frankenstein-boy-1",
    name: "frankenstein-boy-1",
    title: "Happy Boy Frankenstein",
    category: "spooky",
    format: "component",
    componentName: "frankenstein-boy-1",
    svgSrc: "/stickers/frankenstein-boy-1.svg",
    description: "High-resolution editable vector tracing of a happy boy Frankenstein character wearing casual clothes, with a transparent background.",
    tags: ["halloween", "frankenstein", "boy", "cartoon", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-creepy-character-2",
    name: "creepy-character-2",
    title: "Creepy Halloween Character 2",
    category: "spooky",
    format: "component",
    componentName: "creepy-character-2",
    svgSrc: "/stickers/creepy-character-2.svg",
    description: "High-resolution editable vector tracing of a creepy hand-drawn Halloween character from the creepy character collection, with a transparent background.",
    tags: ["halloween", "creepy", "hand-drawn", "character", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-creepy-character-3",
    name: "creepy-character-3",
    title: "Creepy Halloween Character 3",
    category: "spooky",
    format: "component",
    componentName: "creepy-character-3",
    svgSrc: "/stickers/creepy-character-3.svg",
    description: "High-resolution editable vector tracing of a creepy hand-drawn Halloween character from the creepy character collection, with a transparent background.",
    tags: ["halloween", "creepy", "hand-drawn", "character", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-creepy-character-4",
    name: "creepy-character-4",
    title: "Creepy Halloween Character 4",
    category: "spooky",
    format: "component",
    componentName: "creepy-character-4",
    svgSrc: "/stickers/creepy-character-4.svg",
    description: "High-resolution editable vector tracing of a creepy hand-drawn Halloween character from the creepy character collection, with a transparent background.",
    tags: ["halloween", "creepy", "hand-drawn", "character", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-samurai-boy-1",
    name: "samurai-boy-1",
    title: "Cute Young Samurai",
    category: "spooky",
    format: "component",
    componentName: "samurai-boy-1",
    svgSrc: "/stickers/samurai-boy-1.svg",
    description: "High-resolution editable vector tracing of a cute young samurai cartoon character, with a transparent background.",
    tags: ["samurai", "japanese", "cartoon", "character", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-ninja-airbender-1",
    name: "ninja-airbender-1",
    title: "Cute Ninja Airbender",
    category: "spooky",
    format: "component",
    componentName: "ninja-airbender-1",
    svgSrc: "/stickers/ninja-airbender-1.svg",
    description: "High-resolution editable vector tracing of a cute ninja airbender cartoon character, with a transparent background.",
    tags: ["ninja", "cartoon", "character", "holiday", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-kimono-katana-boy-1",
    name: "kimono-katana-boy-1",
    title: "Kimono Boy With Katana",
    category: "spooky",
    format: "component",
    componentName: "kimono-katana-boy-1",
    svgSrc: "/stickers/kimono-katana-boy-1.svg",
    description: "High-resolution editable vector tracing of a kimono boy holding a katana sword cartoon character, with a transparent background.",
    tags: ["kimono", "samurai", "japanese", "cartoon", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-chinese-vampire-1",
    name: "chinese-vampire-1",
    title: "Cute Chinese Vampire",
    category: "spooky",
    format: "component",
    componentName: "chinese-vampire-1",
    svgSrc: "/stickers/chinese-vampire-1.svg",
    description: "High-resolution editable vector tracing of a cute Chinese vampire cartoon character, with a transparent background.",
    tags: ["halloween", "vampire", "chinese", "cartoon", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-ninja-sitting-1",
    name: "ninja-sitting-1",
    title: "Cute Ninja Sitting",
    category: "spooky",
    format: "component",
    componentName: "ninja-sitting-1",
    svgSrc: "/stickers/ninja-sitting-1.svg",
    description: "High-resolution editable vector tracing of a cute ninja sitting in a relaxed pose cartoon character, with a transparent background.",
    tags: ["ninja", "cartoon", "character", "flat", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-japanese-merchant-1",
    name: "japanese-merchant-1",
    title: "Japanese Merchant",
    category: "spooky",
    format: "component",
    componentName: "japanese-merchant-1",
    svgSrc: "/stickers/japanese-merchant-1.svg",
    description: "High-resolution editable vector tracing of a cute adult Japanese merchant in a proud present pose cartoon character, with a transparent background.",
    tags: ["merchant", "japanese", "cartoon", "character", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-costume-kid-2",
    name: "costume-kid-2",
    title: "Hand-Drawn Costume Kid 2",
    category: "spooky",
    format: "component",
    componentName: "costume-kid-2",
    svgSrc: "/stickers/costume-kid-2.svg",
    description: "High-resolution editable vector tracing of a hand-drawn child in a cute costume from the children collection, with a transparent background.",
    tags: ["kid", "hand-drawn", "costume", "character", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-costume-kid-3",
    name: "costume-kid-3",
    title: "Hand-Drawn Costume Kid 3",
    category: "spooky",
    format: "component",
    componentName: "costume-kid-3",
    svgSrc: "/stickers/costume-kid-3.svg",
    description: "High-resolution editable vector tracing of a hand-drawn child in a cute costume from the children collection, with a transparent background.",
    tags: ["kid", "hand-drawn", "costume", "character", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-costume-kid-6",
    name: "costume-kid-6",
    title: "Hand-Drawn Costume Kid 6",
    category: "spooky",
    format: "component",
    componentName: "costume-kid-6",
    svgSrc: "/stickers/costume-kid-6.svg",
    description: "High-resolution editable vector tracing of a hand-drawn child in a cute costume from the children collection, with a transparent background.",
    tags: ["kid", "hand-drawn", "costume", "character", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-cute-halloween-buddy-2",
    name: "cute-halloween-buddy-2",
    title: "Cute Halloween Buddy 2",
    category: "spooky",
    format: "component",
    componentName: "cute-halloween-buddy-2",
    svgSrc: "/stickers/cute-halloween-buddy-2.svg",
    description: "High-resolution editable vector tracing of a cute Halloween cartoon character from the cute Halloween characters collection, with a transparent background.",
    tags: ["halloween", "cute", "cartoon", "character", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-cute-halloween-buddy-5",
    name: "cute-halloween-buddy-5",
    title: "Cute Halloween Buddy 5",
    category: "spooky",
    format: "component",
    componentName: "cute-halloween-buddy-5",
    svgSrc: "/stickers/cute-halloween-buddy-5.svg",
    description: "High-resolution editable vector tracing of a cute Halloween cartoon character from the cute Halloween characters collection, with a transparent background.",
    tags: ["halloween", "cute", "cartoon", "character", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-gamer-man",
    name: "gamer-man",
    title: "Gamer Man",
    category: "characters",
    format: "component",
    componentName: "gamer-man",
    svgSrc: "/stickers/gamer-man.svg",
    description: "HD vector tracing of a gamer character with headset and controller, traced from the original artwork.",
    tags: ["gamer", "gaming", "controller", "headset", "character"],
    defaultRotation: -4,
  },
  {
    id: "svg-happy-halloween-3",
    name: "happy-halloween-3",
    title: "Happy Halloween 3",
    category: "spooky",
    format: "component",
    componentName: "happy-halloween-3",
    svgSrc: "/stickers/happy-halloween-3.svg",
    description: "HD vector tracing of a happy Halloween character from the original artwork.",
    tags: ["halloween", "cute", "character"],
    defaultRotation: -3,
  },
  {
    id: "svg-happy-halloween-4",
    name: "happy-halloween-4",
    title: "Happy Halloween 4",
    category: "spooky",
    format: "component",
    componentName: "happy-halloween-4",
    svgSrc: "/stickers/happy-halloween-4.svg",
    description: "HD vector tracing of a happy Halloween character from the original artwork.",
    tags: ["halloween", "cute", "character"],
    defaultRotation: 5,
  },
  {
    id: "svg-happy-halloween-5",
    name: "happy-halloween-5",
    title: "Happy Halloween 5",
    category: "spooky",
    format: "component",
    componentName: "happy-halloween-5",
    svgSrc: "/stickers/happy-halloween-5.svg",
    description: "HD vector tracing of a happy Halloween character from the original artwork.",
    tags: ["halloween", "cute", "character"],
    defaultRotation: -4,
  },
  {
    id: "svg-happy-halloween-8",
    name: "happy-halloween-8",
    title: "Happy Halloween 8",
    category: "spooky",
    format: "component",
    componentName: "happy-halloween-8",
    svgSrc: "/stickers/happy-halloween-8.svg",
    description: "HD vector tracing of a happy Halloween character from the original artwork.",
    tags: ["halloween", "cute", "character"],
    defaultRotation: 4,
  },
  {
    id: "svg-retro-basketball-1",
    name: "retro-basketball-1",
    title: "Retro Basketball 1",
    category: "characters",
    format: "component",
    componentName: "retro-basketball-1",
    svgSrc: "/stickers/retro-basketball-1.svg",
    description: "HD vector tracing of retro basketball character 1 from the original artwork.",
    tags: ["retro", "basketball", "cartoon", "sport", "character"],
    defaultRotation: -4,
  },
  {
    id: "svg-retro-basketball-2",
    name: "retro-basketball-2",
    title: "Retro Basketball 2",
    category: "characters",
    format: "component",
    componentName: "retro-basketball-2",
    svgSrc: "/stickers/retro-basketball-2.svg",
    description: "HD vector tracing of retro basketball character 2 from the original artwork.",
    tags: ["retro", "basketball", "cartoon", "sport", "character"],
    defaultRotation: 4,
  },
  {
    id: "svg-retro-basketball-4",
    name: "retro-basketball-4",
    title: "Retro Basketball 4",
    category: "characters",
    format: "component",
    componentName: "retro-basketball-4",
    svgSrc: "/stickers/retro-basketball-4.svg",
    description: "HD vector tracing of retro basketball character 4 from the original artwork.",
    tags: ["retro", "basketball", "cartoon", "sport", "character"],
    defaultRotation: 5,
  },
  {
    id: "svg-retro-cartoon-1",
    name: "retro-cartoon-1",
    title: "Retro Cartoon 1",
    category: "characters",
    format: "component",
    componentName: "retro-cartoon-1",
    svgSrc: "/stickers/retro-cartoon-1.svg",
    description: "HD vector tracing of retro cartoon character 1 from the original artwork.",
    tags: ["retro", "cartoon", "vintage", "character"],
    defaultRotation: 3,
  },
  {
    id: "svg-retro-cartoon-2",
    name: "retro-cartoon-2",
    title: "Retro Cartoon 2",
    category: "characters",
    format: "component",
    componentName: "retro-cartoon-2",
    svgSrc: "/stickers/retro-cartoon-2.svg",
    description: "HD vector tracing of retro cartoon character 2 from the original artwork.",
    tags: ["retro", "cartoon", "vintage", "character"],
    defaultRotation: -4,
  },
  {
    id: "svg-retro-cartoon-3",
    name: "retro-cartoon-3",
    title: "Retro Cartoon 3",
    category: "characters",
    format: "component",
    componentName: "retro-cartoon-3",
    svgSrc: "/stickers/retro-cartoon-3.svg",
    description: "HD vector tracing of retro cartoon character 3 from the original artwork.",
    tags: ["retro", "cartoon", "vintage", "character"],
    defaultRotation: 5,
  },
  {
    id: "svg-retro-military-1",
    name: "retro-military-1",
    title: "Retro Military 1",
    category: "characters",
    format: "component",
    componentName: "retro-military-1",
    svgSrc: "/stickers/retro-military-1.svg",
    description: "HD vector tracing of retro military character 1 from the original artwork.",
    tags: ["retro", "military", "cartoon", "character"],
    defaultRotation: -4,
  },
  {
    id: "svg-retro-military-2",
    name: "retro-military-2",
    title: "Retro Military 2",
    category: "characters",
    format: "component",
    componentName: "retro-military-2",
    svgSrc: "/stickers/retro-military-2.svg",
    description: "HD vector tracing of retro military character 2 from the original artwork.",
    tags: ["retro", "military", "cartoon", "character"],
    defaultRotation: 3,
  },
  {
    id: "svg-retro-military-3",
    name: "retro-military-3",
    title: "Retro Military 3",
    category: "characters",
    format: "component",
    componentName: "retro-military-3",
    svgSrc: "/stickers/retro-military-3.svg",
    description: "HD vector tracing of retro military character 3 from the original artwork.",
    tags: ["retro", "military", "cartoon", "character"],
    defaultRotation: 5,
  },
  {
    id: "svg-retro-military-4",
    name: "retro-military-4",
    title: "Retro Military 4",
    category: "characters",
    format: "component",
    componentName: "retro-military-4",
    svgSrc: "/stickers/retro-military-4.svg",
    description: "HD vector tracing of retro military character 4 from the original artwork.",
    tags: ["retro", "military", "cartoon", "character"],
    defaultRotation: -3,
  },
  {
    id: "svg-retro-military-5",
    name: "retro-military-5",
    title: "Retro Military 5",
    category: "characters",
    format: "component",
    componentName: "retro-military-5",
    svgSrc: "/stickers/retro-military-5.svg",
    description: "HD vector tracing of retro military character 5 from the original artwork.",
    tags: ["retro", "military", "cartoon", "character"],
    defaultRotation: 4,
  },
  {
    id: "svg-retro-military-6",
    name: "retro-military-6",
    title: "Retro Military 6",
    category: "characters",
    format: "component",
    componentName: "retro-military-6",
    svgSrc: "/stickers/retro-military-6.svg",
    description: "HD vector tracing of retro military character 6 from the original artwork.",
    tags: ["retro", "military", "cartoon", "character"],
    defaultRotation: -5,
  },
  {
    id: "svg-retro-military-7",
    name: "retro-military-7",
    title: "Retro Military 7",
    category: "characters",
    format: "component",
    componentName: "retro-military-7",
    svgSrc: "/stickers/retro-military-7.svg",
    description: "HD vector tracing of retro military character 7 from the original artwork.",
    tags: ["retro", "military", "cartoon", "character"],
    defaultRotation: 3,
  },
  {
    id: "svg-retro-military-8",
    name: "retro-military-8",
    title: "Retro Military 8",
    category: "characters",
    format: "component",
    componentName: "retro-military-8",
    svgSrc: "/stickers/retro-military-8.svg",
    description: "HD vector tracing of retro military character 8 from the original artwork.",
    tags: ["retro", "military", "cartoon", "character"],
    defaultRotation: -4,
  },
  {
    id: "svg-rock-sticker-2",
    name: "rock-sticker-2",
    title: "Rock Sticker 2",
    category: "characters",
    format: "component",
    componentName: "rock-sticker-2",
    svgSrc: "/stickers/rock-sticker-2.svg",
    description: "HD vector tracing of rock sticker character 2 from the original artwork.",
    tags: ["rock", "music", "cartoon", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-rock-sticker-3",
    name: "rock-sticker-3",
    title: "Rock Sticker 3",
    category: "characters",
    format: "component",
    componentName: "rock-sticker-3",
    svgSrc: "/stickers/rock-sticker-3.svg",
    description: "HD vector tracing of rock sticker character 3 from the original artwork.",
    tags: ["rock", "music", "cartoon", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-rock-sticker-4",
    name: "rock-sticker-4",
    title: "Rock Sticker 4",
    category: "characters",
    format: "component",
    componentName: "rock-sticker-4",
    svgSrc: "/stickers/rock-sticker-4.svg",
    description: "HD vector tracing of rock sticker character 4 from the original artwork.",
    tags: ["rock", "music", "cartoon", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-young-action-2",
    name: "young-action-2",
    title: "Young Action 2",
    category: "characters",
    format: "component",
    componentName: "young-action-2",
    svgSrc: "/stickers/young-action-2.svg",
    description: "HD vector tracing of young action character 2 from the original artwork.",
    tags: ["people", "action", "cartoon", "character"],
    defaultRotation: -4,
  },
  {
    id: "svg-young-action-3",
    name: "young-action-3",
    title: "Young Action 3",
    category: "characters",
    format: "component",
    componentName: "young-action-3",
    svgSrc: "/stickers/young-action-3.svg",
    description: "HD vector tracing of young action character 3 from the original artwork.",
    tags: ["people", "action", "cartoon", "character"],
    defaultRotation: 5,
  },
  {
    id: "svg-young-action-4",
    name: "young-action-4",
    title: "Young Action 4",
    category: "characters",
    format: "component",
    componentName: "young-action-4",
    svgSrc: "/stickers/young-action-4.svg",
    description: "HD vector tracing of young action character 4 from the original artwork.",
    tags: ["people", "action", "cartoon", "character"],
    defaultRotation: -3,
  },
  {
    id: "svg-young-action-5",
    name: "young-action-5",
    title: "Young Action 5",
    category: "characters",
    format: "component",
    componentName: "young-action-5",
    svgSrc: "/stickers/young-action-5.svg",
    description: "HD vector tracing of young action character 5 from the original artwork.",
    tags: ["people", "action", "cartoon", "character"],
    defaultRotation: 4,
  },
  {
    id: "svg-young-action-6",
    name: "young-action-6",
    title: "Young Action 6",
    category: "characters",
    format: "component",
    componentName: "young-action-6",
    svgSrc: "/stickers/young-action-6.svg",
    description: "HD vector tracing of young action character 6 from the original artwork.",
    tags: ["people", "action", "cartoon", "character"],
    defaultRotation: -5,
  },
  {
    id: "svg-funny-character-3",
    name: "funny-character-3",
    title: "Funny Character 3",
    category: "characters",
    format: "component",
    componentName: "funny-character-3",
    svgSrc: "/stickers/funny-character-3.svg",
    description: "HD vector tracing of funny character character 3 from the original artwork.",
    tags: ["funny", "cool", "cartoon", "character"],
    defaultRotation: -3,
  },
  {
    id: "svg-funny-character-4",
    name: "funny-character-4",
    title: "Funny Character 4",
    category: "characters",
    format: "component",
    componentName: "funny-character-4",
    svgSrc: "/stickers/funny-character-4.svg",
    description: "HD vector tracing of funny character character 4 from the original artwork.",
    tags: ["funny", "cool", "cartoon", "character"],
    defaultRotation: 5,
  },
  {
    id: "svg-funny-character-5",
    name: "funny-character-5",
    title: "Funny Character 5",
    category: "characters",
    format: "component",
    componentName: "funny-character-5",
    svgSrc: "/stickers/funny-character-5.svg",
    description: "HD vector tracing of funny character character 5 from the original artwork.",
    tags: ["funny", "cool", "cartoon", "character"],
    defaultRotation: -5,
  },
  {
    id: "svg-funny-character-6",
    name: "funny-character-6",
    title: "Funny Character 6",
    category: "characters",
    format: "component",
    componentName: "funny-character-6",
    svgSrc: "/stickers/funny-character-6.svg",
    description: "HD vector tracing of funny character character 6 from the original artwork.",
    tags: ["funny", "cool", "cartoon", "character"],
    defaultRotation: 3,
  },
  {
    id: "svg-funny-character-7",
    name: "funny-character-7",
    title: "Funny Character 7",
    category: "characters",
    format: "component",
    componentName: "funny-character-7",
    svgSrc: "/stickers/funny-character-7.svg",
    description: "HD vector tracing of funny character character 7 from the original artwork.",
    tags: ["funny", "cool", "cartoon", "character"],
    defaultRotation: -2,
  },
  {
    id: "svg-funny-character-8",
    name: "funny-character-8",
    title: "Funny Character 8",
    category: "characters",
    format: "component",
    componentName: "funny-character-8",
    svgSrc: "/stickers/funny-character-8.svg",
    description: "HD vector tracing of funny character character 8 from the original artwork.",
    tags: ["funny", "cool", "cartoon", "character"],
    defaultRotation: 4,
  },
  {
    id: "svg-rock-sticker-5",
    name: "rock-sticker-5",
    title: "Rock Sticker 5",
    category: "characters",
    format: "component",
    componentName: "rock-sticker-5",
    svgSrc: "/stickers/rock-sticker-5.svg",
    description: "HD vector tracing of rock sticker character 5 from the original artwork.",
    tags: ["rock", "music", "cartoon", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-rock-sticker-6",
    name: "rock-sticker-6",
    title: "Rock Sticker 6",
    category: "characters",
    format: "component",
    componentName: "rock-sticker-6",
    svgSrc: "/stickers/rock-sticker-6.svg",
    description: "HD vector tracing of rock sticker character 6 from the original artwork.",
    tags: ["rock", "music", "cartoon", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-rock-sticker-7",
    name: "rock-sticker-7",
    title: "Rock Sticker 7",
    category: "characters",
    format: "component",
    componentName: "rock-sticker-7",
    svgSrc: "/stickers/rock-sticker-7.svg",
    description: "HD vector tracing of rock sticker character 7 from the original artwork.",
    tags: ["rock", "music", "cartoon", "sticker"],
    defaultRotation: 3,
  },
  {
    id: "svg-rock-sticker-8",
    name: "rock-sticker-8",
    title: "Rock Sticker 8",
    category: "characters",
    format: "component",
    componentName: "rock-sticker-8",
    svgSrc: "/stickers/rock-sticker-8.svg",
    description: "HD vector tracing of rock sticker character 8 from the original artwork.",
    tags: ["rock", "music", "cartoon", "sticker"],
    defaultRotation: -5,
  },
  {
    id: "svg-wrestler-4",
    name: "wrestler-4",
    title: "Wrestler 4",
    category: "characters",
    format: "component",
    componentName: "wrestler-4",
    svgSrc: "/stickers/wrestler-4.svg",
    description: "HD vector tracing of wrestler character 4 from the original artwork.",
    tags: ["wrestler", "fighter", "mask", "cartoon", "character"],
    defaultRotation: -3,
  },
  {
    id: "svg-wrestler-6",
    name: "wrestler-6",
    title: "Wrestler 6",
    category: "characters",
    format: "component",
    componentName: "wrestler-6",
    svgSrc: "/stickers/wrestler-6.svg",
    description: "HD vector tracing of wrestler character 6 from the original artwork.",
    tags: ["wrestler", "fighter", "mask", "cartoon", "character"],
    defaultRotation: -5,
  },
  {
    id: "svg-funny-doodle-1",
    name: "funny-doodle-1",
    title: "Funny Doodle 1",
    category: "characters",
    format: "component",
    componentName: "funny-doodle-1",
    svgSrc: "/stickers/funny-doodle-1.svg",
    description: "HD vector tracing of funny doodle character 1 from the original artwork.",
    tags: ["funny", "doodle", "hand-drawn", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-funny-doodle-2",
    name: "funny-doodle-2",
    title: "Funny Doodle 2",
    category: "characters",
    format: "component",
    componentName: "funny-doodle-2",
    svgSrc: "/stickers/funny-doodle-2.svg",
    description: "HD vector tracing of funny doodle character 2 from the original artwork.",
    tags: ["funny", "doodle", "hand-drawn", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-funny-doodle-3",
    name: "funny-doodle-3",
    title: "Funny Doodle 3",
    category: "characters",
    format: "component",
    componentName: "funny-doodle-3",
    svgSrc: "/stickers/funny-doodle-3.svg",
    description: "HD vector tracing of funny doodle character 3 from the original artwork.",
    tags: ["funny", "doodle", "hand-drawn", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-funny-doodle-4",
    name: "funny-doodle-4",
    title: "Funny Doodle 4",
    category: "characters",
    format: "component",
    componentName: "funny-doodle-4",
    svgSrc: "/stickers/funny-doodle-4.svg",
    description: "HD vector tracing of funny doodle character 4 from the original artwork.",
    tags: ["funny", "doodle", "hand-drawn", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-graffiti-tag-1",
    name: "graffiti-tag-1",
    title: "Graffiti Tag 1",
    category: "characters",
    format: "component",
    componentName: "graffiti-tag-1",
    svgSrc: "/stickers/graffiti-tag-1.svg",
    description: "HD vector tracing of graffiti tag character 1 from the original artwork.",
    tags: ["graffiti", "street", "cartoon", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-graffiti-tag-4",
    name: "graffiti-tag-4",
    title: "Graffiti Tag 4",
    category: "characters",
    format: "component",
    componentName: "graffiti-tag-4",
    svgSrc: "/stickers/graffiti-tag-4.svg",
    description: "HD vector tracing of graffiti tag character 4 from the original artwork.",
    tags: ["graffiti", "street", "cartoon", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-graffiti-tag-16",
    name: "graffiti-tag-16",
    title: "Graffiti Tag 16",
    category: "characters",
    format: "component",
    componentName: "graffiti-tag-16",
    svgSrc: "/stickers/graffiti-tag-16.svg",
    description: "HD vector tracing of graffiti tag character 16 from the original artwork.",
    tags: ["graffiti", "street", "cartoon", "sticker"],
    defaultRotation: -2,
  },
  {
    id: "svg-cute-pop-1",
    name: "cute-pop-1",
    title: "Cute Pop 1",
    category: "characters",
    format: "component",
    componentName: "cute-pop-1",
    svgSrc: "/stickers/cute-pop-1.svg",
    description: "HD vector tracing of cute pop character 1 from the original artwork.",
    tags: ["cute", "colorful", "cartoon", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-doodle-beast-1",
    name: "doodle-beast-1",
    title: "Doodle Beast 1",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-1",
    svgSrc: "/stickers/doodle-beast-1.svg",
    description: "HD vector tracing of doodle beast character 1 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-doodle-beast-2",
    name: "doodle-beast-2",
    title: "Doodle Beast 2",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-2",
    svgSrc: "/stickers/doodle-beast-2.svg",
    description: "HD vector tracing of doodle beast character 2 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-doodle-beast-3",
    name: "doodle-beast-3",
    title: "Doodle Beast 3",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-3",
    svgSrc: "/stickers/doodle-beast-3.svg",
    description: "HD vector tracing of doodle beast character 3 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-doodle-beast-4",
    name: "doodle-beast-4",
    title: "Doodle Beast 4",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-4",
    svgSrc: "/stickers/doodle-beast-4.svg",
    description: "HD vector tracing of doodle beast character 4 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-doodle-beast-5",
    name: "doodle-beast-5",
    title: "Doodle Beast 5",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-5",
    svgSrc: "/stickers/doodle-beast-5.svg",
    description: "HD vector tracing of doodle beast character 5 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: 3,
  },
  {
    id: "svg-doodle-beast-6",
    name: "doodle-beast-6",
    title: "Doodle Beast 6",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-6",
    svgSrc: "/stickers/doodle-beast-6.svg",
    description: "HD vector tracing of doodle beast character 6 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: -5,
  },
  {
    id: "svg-doodle-beast-7",
    name: "doodle-beast-7",
    title: "Doodle Beast 7",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-7",
    svgSrc: "/stickers/doodle-beast-7.svg",
    description: "HD vector tracing of doodle beast character 7 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: 2,
  },
  {
    id: "svg-doodle-beast-8",
    name: "doodle-beast-8",
    title: "Doodle Beast 8",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-8",
    svgSrc: "/stickers/doodle-beast-8.svg",
    description: "HD vector tracing of doodle beast character 8 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: -2,
  },
  {
    id: "svg-doodle-beast-9",
    name: "doodle-beast-9",
    title: "Doodle Beast 9",
    category: "characters",
    format: "component",
    componentName: "doodle-beast-9",
    svgSrc: "/stickers/doodle-beast-9.svg",
    description: "HD vector tracing of doodle beast character 9 from the original artwork.",
    tags: ["monster", "doodle", "cute", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-pattern-monster-1",
    name: "pattern-monster-1",
    title: "Pattern Monster 1",
    category: "characters",
    format: "component",
    componentName: "pattern-monster-1",
    svgSrc: "/stickers/pattern-monster-1.svg",
    description: "HD vector tracing of pattern monster character 1 from the original artwork.",
    tags: ["monster", "pattern", "cute", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-pattern-monster-2",
    name: "pattern-monster-2",
    title: "Pattern Monster 2",
    category: "characters",
    format: "component",
    componentName: "pattern-monster-2",
    svgSrc: "/stickers/pattern-monster-2.svg",
    description: "HD vector tracing of pattern monster character 2 from the original artwork.",
    tags: ["monster", "pattern", "cute", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-pattern-monster-3",
    name: "pattern-monster-3",
    title: "Pattern Monster 3",
    category: "characters",
    format: "component",
    componentName: "pattern-monster-3",
    svgSrc: "/stickers/pattern-monster-3.svg",
    description: "HD vector tracing of pattern monster character 3 from the original artwork.",
    tags: ["monster", "pattern", "cute", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-pattern-monster-4",
    name: "pattern-monster-4",
    title: "Pattern Monster 4",
    category: "characters",
    format: "component",
    componentName: "pattern-monster-4",
    svgSrc: "/stickers/pattern-monster-4.svg",
    description: "HD vector tracing of pattern monster character 4 from the original artwork.",
    tags: ["monster", "pattern", "cute", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-pattern-monster-5",
    name: "pattern-monster-5",
    title: "Pattern Monster 5",
    category: "characters",
    format: "component",
    componentName: "pattern-monster-5",
    svgSrc: "/stickers/pattern-monster-5.svg",
    description: "HD vector tracing of pattern monster character 5 from the original artwork.",
    tags: ["monster", "pattern", "cute", "sticker"],
    defaultRotation: 3,
  },
  {
    id: "svg-pattern-monster-6",
    name: "pattern-monster-6",
    title: "Pattern Monster 6",
    category: "characters",
    format: "component",
    componentName: "pattern-monster-6",
    svgSrc: "/stickers/pattern-monster-6.svg",
    description: "HD vector tracing of pattern monster character 6 from the original artwork.",
    tags: ["monster", "pattern", "cute", "sticker"],
    defaultRotation: -5,
  },
  {
    id: "svg-retro-badge-1",
    name: "retro-badge-1",
    title: "Retro Badge 1",
    category: "characters",
    format: "component",
    componentName: "retro-badge-1",
    svgSrc: "/stickers/retro-badge-1.svg",
    description: "HD vector tracing of retro badge character 1 from the original artwork.",
    tags: ["retro", "vintage", "cartoon", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-retro-badge-2",
    name: "retro-badge-2",
    title: "Retro Badge 2",
    category: "characters",
    format: "component",
    componentName: "retro-badge-2",
    svgSrc: "/stickers/retro-badge-2.svg",
    description: "HD vector tracing of retro badge character 2 from the original artwork.",
    tags: ["retro", "vintage", "cartoon", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-retro-badge-3",
    name: "retro-badge-3",
    title: "Retro Badge 3",
    category: "characters",
    format: "component",
    componentName: "retro-badge-3",
    svgSrc: "/stickers/retro-badge-3.svg",
    description: "HD vector tracing of retro badge character 3 from the original artwork.",
    tags: ["retro", "vintage", "cartoon", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-retro-badge-4",
    name: "retro-badge-4",
    title: "Retro Badge 4",
    category: "characters",
    format: "component",
    componentName: "retro-badge-4",
    svgSrc: "/stickers/retro-badge-4.svg",
    description: "HD vector tracing of retro badge character 4 from the original artwork.",
    tags: ["retro", "vintage", "cartoon", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-retro-badge-5",
    name: "retro-badge-5",
    title: "Retro Badge 5",
    category: "characters",
    format: "component",
    componentName: "retro-badge-5",
    svgSrc: "/stickers/retro-badge-5.svg",
    description: "HD vector tracing of retro badge character 5 from the original artwork.",
    tags: ["retro", "vintage", "cartoon", "sticker"],
    defaultRotation: 3,
  },
  {
    id: "svg-retro-badge-6",
    name: "retro-badge-6",
    title: "Retro Badge 6",
    category: "characters",
    format: "component",
    componentName: "retro-badge-6",
    svgSrc: "/stickers/retro-badge-6.svg",
    description: "HD vector tracing of retro badge character 6 from the original artwork.",
    tags: ["retro", "vintage", "cartoon", "sticker"],
    defaultRotation: -5,
  },
  {
    id: "svg-plant-buddy-1",
    name: "plant-buddy-1",
    title: "Plant Buddy 1",
    category: "characters",
    format: "component",
    componentName: "plant-buddy-1",
    svgSrc: "/stickers/plant-buddy-1.svg",
    description: "HD vector tracing of plant buddy character 1 from the original artwork.",
    tags: ["plant", "funny", "hand-drawn", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-plant-buddy-2",
    name: "plant-buddy-2",
    title: "Plant Buddy 2",
    category: "characters",
    format: "component",
    componentName: "plant-buddy-2",
    svgSrc: "/stickers/plant-buddy-2.svg",
    description: "HD vector tracing of plant buddy character 2 from the original artwork.",
    tags: ["plant", "funny", "hand-drawn", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-plant-buddy-3",
    name: "plant-buddy-3",
    title: "Plant Buddy 3",
    category: "characters",
    format: "component",
    componentName: "plant-buddy-3",
    svgSrc: "/stickers/plant-buddy-3.svg",
    description: "HD vector tracing of plant buddy character 3 from the original artwork.",
    tags: ["plant", "funny", "hand-drawn", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-funny-sketch-3",
    name: "funny-sketch-3",
    title: "Funny Sketch 3",
    category: "characters",
    format: "component",
    componentName: "funny-sketch-3",
    svgSrc: "/stickers/funny-sketch-3.svg",
    description: "HD vector tracing of funny sketch character 3 from the original artwork.",
    tags: ["funny", "sketch", "hand-drawn", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-funny-sketch-4",
    name: "funny-sketch-4",
    title: "Funny Sketch 4",
    category: "characters",
    format: "component",
    componentName: "funny-sketch-4",
    svgSrc: "/stickers/funny-sketch-4.svg",
    description: "HD vector tracing of funny sketch character 4 from the original artwork.",
    tags: ["funny", "sketch", "hand-drawn", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-happy-doodle-1",
    name: "happy-doodle-1",
    title: "Happy Doodle 1",
    category: "characters",
    format: "component",
    componentName: "happy-doodle-1",
    svgSrc: "/stickers/happy-doodle-1.svg",
    description: "HD vector tracing of happy doodle character 1 from the original artwork.",
    tags: ["happy", "doodle", "cartoon", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-happy-doodle-2",
    name: "happy-doodle-2",
    title: "Happy Doodle 2",
    category: "characters",
    format: "component",
    componentName: "happy-doodle-2",
    svgSrc: "/stickers/happy-doodle-2.svg",
    description: "HD vector tracing of happy doodle character 2 from the original artwork.",
    tags: ["happy", "doodle", "cartoon", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-happy-doodle-4",
    name: "happy-doodle-4",
    title: "Happy Doodle 4",
    category: "characters",
    format: "component",
    componentName: "happy-doodle-4",
    svgSrc: "/stickers/happy-doodle-4.svg",
    description: "HD vector tracing of happy doodle character 4 from the original artwork.",
    tags: ["happy", "doodle", "cartoon", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-mad-beast-1",
    name: "mad-beast-1",
    title: "Mad Beast 1",
    category: "characters",
    format: "component",
    componentName: "mad-beast-1",
    svgSrc: "/stickers/mad-beast-1.svg",
    description: "HD vector tracing of mad beast character 1 from the original artwork.",
    tags: ["monster", "mad", "cartoon", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-mad-beast-2",
    name: "mad-beast-2",
    title: "Mad Beast 2",
    category: "characters",
    format: "component",
    componentName: "mad-beast-2",
    svgSrc: "/stickers/mad-beast-2.svg",
    description: "HD vector tracing of mad beast character 2 from the original artwork.",
    tags: ["monster", "mad", "cartoon", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-mad-beast-3",
    name: "mad-beast-3",
    title: "Mad Beast 3",
    category: "characters",
    format: "component",
    componentName: "mad-beast-3",
    svgSrc: "/stickers/mad-beast-3.svg",
    description: "HD vector tracing of mad beast character 3 from the original artwork.",
    tags: ["monster", "mad", "cartoon", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-mad-beast-4",
    name: "mad-beast-4",
    title: "Mad Beast 4",
    category: "characters",
    format: "component",
    componentName: "mad-beast-4",
    svgSrc: "/stickers/mad-beast-4.svg",
    description: "HD vector tracing of mad beast character 4 from the original artwork.",
    tags: ["monster", "mad", "cartoon", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-decor-sticker-1",
    name: "decor-sticker-1",
    title: "Decor Sticker 1",
    category: "characters",
    format: "component",
    componentName: "decor-sticker-1",
    svgSrc: "/stickers/decor-sticker-1.svg",
    description: "HD vector tracing of decor sticker character 1 from the original artwork.",
    tags: ["decorative", "funny", "cartoon", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-decor-sticker-2",
    name: "decor-sticker-2",
    title: "Decor Sticker 2",
    category: "characters",
    format: "component",
    componentName: "decor-sticker-2",
    svgSrc: "/stickers/decor-sticker-2.svg",
    description: "HD vector tracing of decor sticker character 2 from the original artwork.",
    tags: ["decorative", "funny", "cartoon", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-decor-sticker-3",
    name: "decor-sticker-3",
    title: "Decor Sticker 3",
    category: "characters",
    format: "component",
    componentName: "decor-sticker-3",
    svgSrc: "/stickers/decor-sticker-3.svg",
    description: "HD vector tracing of decor sticker character 3 from the original artwork.",
    tags: ["decorative", "funny", "cartoon", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-decor-sticker-5",
    name: "decor-sticker-5",
    title: "Decor Sticker 5",
    category: "characters",
    format: "component",
    componentName: "decor-sticker-5",
    svgSrc: "/stickers/decor-sticker-5.svg",
    description: "HD vector tracing of decor sticker character 5 from the original artwork.",
    tags: ["decorative", "funny", "cartoon", "sticker"],
    defaultRotation: 3,
  },
  {
    id: "svg-decor-sticker-6",
    name: "decor-sticker-6",
    title: "Decor Sticker 6",
    category: "characters",
    format: "component",
    componentName: "decor-sticker-6",
    svgSrc: "/stickers/decor-sticker-6.svg",
    description: "HD vector tracing of decor sticker character 6 from the original artwork.",
    tags: ["decorative", "funny", "cartoon", "sticker"],
    defaultRotation: -5,
  },
  {
    id: "svg-lol-fun-1",
    name: "lol-fun-1",
    title: "Lol Fun 1",
    category: "characters",
    format: "component",
    componentName: "lol-fun-1",
    svgSrc: "/stickers/lol-fun-1.svg",
    description: "HD vector tracing of lol fun character 1 from the original artwork.",
    tags: ["lol", "funny", "expression", "sticker"],
    defaultRotation: -4,
  },
  {
    id: "svg-lol-fun-2",
    name: "lol-fun-2",
    title: "Lol Fun 2",
    category: "characters",
    format: "component",
    componentName: "lol-fun-2",
    svgSrc: "/stickers/lol-fun-2.svg",
    description: "HD vector tracing of lol fun character 2 from the original artwork.",
    tags: ["lol", "funny", "expression", "sticker"],
    defaultRotation: 4,
  },
  {
    id: "svg-lol-fun-3",
    name: "lol-fun-3",
    title: "Lol Fun 3",
    category: "characters",
    format: "component",
    componentName: "lol-fun-3",
    svgSrc: "/stickers/lol-fun-3.svg",
    description: "HD vector tracing of lol fun character 3 from the original artwork.",
    tags: ["lol", "funny", "expression", "sticker"],
    defaultRotation: -3,
  },
  {
    id: "svg-lol-fun-4",
    name: "lol-fun-4",
    title: "Lol Fun 4",
    category: "characters",
    format: "component",
    componentName: "lol-fun-4",
    svgSrc: "/stickers/lol-fun-4.svg",
    description: "HD vector tracing of lol fun character 4 from the original artwork.",
    tags: ["lol", "funny", "expression", "sticker"],
    defaultRotation: 5,
  },
  {
    id: "svg-lol-fun-5",
    name: "lol-fun-5",
    title: "Lol Fun 5",
    category: "characters",
    format: "component",
    componentName: "lol-fun-5",
    svgSrc: "/stickers/lol-fun-5.svg",
    description: "HD vector tracing of lol fun character 5 from the original artwork.",
    tags: ["lol", "funny", "expression", "sticker"],
    defaultRotation: 3,
  },
  {
    id: "svg-lol-fun-6",
    name: "lol-fun-6",
    title: "Lol Fun 6",
    category: "characters",
    format: "component",
    componentName: "lol-fun-6",
    svgSrc: "/stickers/lol-fun-6.svg",
    description: "HD vector tracing of lol fun character 6 from the original artwork.",
    tags: ["lol", "funny", "expression", "sticker"],
    defaultRotation: -5,
  },
];

const CATALOG: CatalogItem[] = [...CEO_CATALOG, ...TRAZO_CATALOG, ...LEGACY_CATALOG.map((i)=>({ ...i, category: "legacy" as const }))];

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
  color,
  rotate,
}: {
  item: CatalogItem;
  size?: number;
  peel?: boolean;
  className?: string;
  color?: string;
  rotate?: number;
}) {
  if (item.format === "trazo" && item.trazoId) {
    const def = findSticker(item.trazoId);
    if (def) return <Sticker def={def} size={size} peel={peel} color={color} rotate={rotate} className={className} />;
  }
  if (item.format === "photo" && item.photoSrc) {
    return (
      <PhotoSticker
        src={item.photoSrc}
        alt={`${item.title} sticker`}
        size={size}
        aura={item.aura}
        className={className}
      />
    );
  }
  if (item.format === "svg" && item.svgSrc) {
    return (
      <img
        src={item.svgSrc}
        alt={`${item.title} sticker`}
        width={size}
        height={size}
        draggable={false}
        className={className}
        style={{ width: size, height: size, objectFit: "contain", transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      />
    );
  }
  const stickerName = (item.componentName || item.name) as StickerName;
  return <Sticker name={stickerName} size={size} peel={peel} className={className} />;
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
  const [installCopyState, setInstallCopyState] = useState<CopyFeedback>("idle");

  // Progressive rendering & batching for 500-1,000+ items
  const BATCH_SIZE = 100;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Inspector modal states
  const [inspectorSize, setInspectorSize] = useState(130);
  const [inspectorPeel, setInspectorPeel] = useState(true);
  const [inspectorBg, setInspectorBg] = useState<"white" | "zinc" | "warm" | "blue">("white");
  const [snippetTab, setSnippetTab] = useState<"named" | "dynamic">("named");
  const [inspectorColor, setInspectorColor] = useState<string>("mix");
  const [inspectorRotate, setInspectorRotate] = useState<number>(0);

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

  // Copy feedback reset
  useEffect(() => {
    if (!copiedId) return;
    const t = setTimeout(() => setCopiedId(null), 1800);
    return () => clearTimeout(t);
  }, [copiedId]);

  useEffect(() => {
    if (installCopyState === "idle") return;
    const t = setTimeout(() => setInstallCopyState("idle"), 1800);
    return () => clearTimeout(t);
  }, [installCopyState]);

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

  // Modern Clipboard API first; the legacy path is a last-resort fallback for
  // embedded or non-secure contexts where writeText is unavailable or denied.
  function legacyCopy(text: string): boolean {
    const previousFocus = document.activeElement as HTMLElement | null;
    const field = Object.assign(document.createElement("textarea"), { value: text });
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;inset-block-start:0;opacity:0;pointer-events:none";
    document.body.append(field);
    field.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      field.remove();
      previousFocus?.focus({ preventScroll: true });
    }
  }

  async function copyText(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {}
    return legacyCopy(text);
  }

  async function copyInstall() {
    setInstallCopyState((await copyText("npm i stick-it-up@latest")) ? "copied" : "failed");
  }

  async function copyCode(item: CatalogItem, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    const stickerName = item.componentName || item.name;
    const compName = getComponentExportName(stickerName);
    const code =
      item.format === "photo" && item.photoSrc
        ? `<img src="${item.photoSrc}" alt="${item.name} sticker" width={96} height={96} style={{ objectFit: "contain", filter: "drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px rgba(255,255,255,.9)) drop-shadow(0 6px 10px rgba(0,0,0,.22))" }} />`
        : item.format === "svg" && item.svgSrc
        ? `<img src="${item.svgSrc}" alt="${item.name} sticker" width={96} height={96} />`
        : `import { ${compName} } from "stick-it-up";\n\n<${compName} size={96} peel />`;

    if (await copyText(code)) setCopiedId(item.id);
  }

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CATALOG.length, "tech-ceos": 0, ocean:0, arrows:0, nature:0, hearts:0, symbols:0, characters:0, legacy:0 };
    CATALOG.forEach((item) => { counts[item.category] = (counts[item.category] || 0) + 1; });
    return counts as Record<StickerCategory, number>;
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
              src="/stickers/panda-bear-1.svg"
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
              <Link
                href="/usage"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900"
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
      <section className="catalog-intro" aria-labelledby="catalog-heading">
        <div className="catalog-doodles" aria-hidden="true">
          <span className="catalog-doodle catalog-doodle-peel">peel</span>
          <span className="catalog-doodle catalog-doodle-stick">stick</span>
          <svg className="catalog-mark catalog-mark-star" viewBox="0 0 64 64">
            <path d="M32 7c1.4 8.5 5 13.5 14 15.5-9 2-12.6 7-14 16-1.4-9-5.6-14-15-16 9.4-2 12.6-7 15-15.5z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <svg className="catalog-mark catalog-mark-arrow" viewBox="0 0 96 40">
            <path d="M6 24c18-12 34-9 52-4 10 2.5 16 1 26-3" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            <path d="M70 8c5 5 9 8 14 9-7 1.5-10 5-14 11" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="catalog-intro-inner relative mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="catalog-eyebrow">
            <span className="catalog-eyebrow-dot" aria-hidden="true" />
            The sticker library for React
          </span>

          <h1
            id="catalog-heading"
            className="catalog-title"
            style={{ animation: "rise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 80ms both" }}
          >
            <span className="catalog-title-strong">
              Sketch Up.
              <svg className="catalog-underline" viewBox="0 0 320 18" preserveAspectRatio="none" aria-hidden="true">
                <path d="M6 11c32-7 58 5 92-2s52-6 86 3 48 2 78-3 36-3 52 2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <span className="catalog-title-soft">
              Pick any sticker, <span className="catalog-ink-mark">drop it in.</span>
            </span>
          </h1>
          <p className="catalog-subtitle">
            Browse the full pack, copy the code, and make any interface feel less generic.
          </p>
        </div>

        {/* Quick install bar */}
        <div
          className="catalog-install-row"
          style={{ animation: "rise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 240ms both" }}
        >
          <button
            onClick={copyInstall}
            type="button"
            aria-label={
              installCopyState === "copied"
                ? "Install command copied to clipboard"
                : installCopyState === "failed"
                ? "Copy failed. Try again"
                : "Copy npm i stick-it-up@latest"
            }
            className={`catalog-install ${installCopyState === "copied" ? "is-copied" : ""} ${
              installCopyState === "failed" ? "is-failed" : ""
            }`}
          >
            <span className="catalog-install-prompt" aria-hidden="true">$</span>
            {/* Both states share one grid cell so the button width never jumps */}
            <span className="catalog-install-label">
              <span className="catalog-install-command">npm i stick-it-up@latest</span>
              <span className="catalog-install-copied" aria-hidden="true">
                {installCopyState === "failed" ? "Copy failed" : "Copied to clipboard"}
              </span>
            </span>
            <span className="catalog-install-icon" aria-hidden="true">
              {installCopyState === "copied" ? (
                <LuCopyCheck className="h-4 w-4" />
              ) : installCopyState === "failed" ? (
                <LuCopyX className="h-4 w-4" />
              ) : (
                <LuCopy className="h-4 w-4" />
              )}
            </span>
          </button>

          <span className="catalog-copy-status" role="status" aria-live="polite">
            {installCopyState === "copied"
              ? "Install command copied to clipboard"
              : installCopyState === "failed"
              ? "Copy failed. Select the command and copy it manually."
              : ""}
          </span>

          <a
            href="https://github.com/Sam721166/stick-it-up"
            target="_blank"
            rel="noreferrer"
            className="catalog-github"
            aria-label="View stick-it-up on GitHub (opens in a new tab)"
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
        </div>
      </section>

      {/* ------------------------------------------------------------------
          CONTROLS: CATEGORY FILTERS + SEARCH
      ------------------------------------------------------------------- */}
      <section className="catalog-controls top-[68px] z-30 mx-auto max-w-6xl px-6 pb-8">
        <fieldset className="catalog-filter-bar">
          <legend className="sr-only">Filter stickers by category</legend>

          <div className="catalog-filters">
            {(
              [
                { id: "all", label: "All Stickers", count: categoryCounts.all },
                { id: "tech-ceos", label: "Tech CEOs", count: categoryCounts["tech-ceos"] },
                { id: "ocean", label: "Ocean", count: categoryCounts.ocean },
                { id: "arrows", label: "Arrows", count: categoryCounts.arrows },
                { id: "nature", label: "Nature", count: categoryCounts.nature },
                { id: "hearts", label: "Hearts", count: categoryCounts.hearts },
                { id: "symbols", label: "Symbols", count: categoryCounts.symbols },
                { id: "characters", label: "Characters", count: categoryCounts.characters },
                { id: "legacy", label: "Legacy", count: categoryCounts.legacy },
              ] as const
            ).filter((tab) => tab.count > 0).map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  aria-pressed={active}
                  className={`catalog-chip ${active ? "is-active" : ""}`}
                >
                  <span className="catalog-chip-label">{tab.label}</span>
                  <span className="catalog-chip-count">{tab.count}</span>
                </button>
              );
            })}
          </div>

          <search className="catalog-search">
            <label htmlFor="sticker-search" className="sr-only">Search stickers</label>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="catalog-search-icon"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" strokeLinecap="round" />
            </svg>
            <input
              id="sticker-search"
              type="search"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stickers…"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              className="catalog-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="catalog-search-clear"
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            )}
          </search>
        </fieldset>
      </section>

      {/* ------------------------------------------------------------------
          STICKER GRID
      ------------------------------------------------------------------- */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        {filteredStickers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 py-20 text-center">
            <p className="font-sans text-xl font-medium text-zinc-700">No stickers found</p>
            <p className="mt-1 text-sm text-zinc-400">
              Try searching for &ldquo;face&rdquo;, &ldquo;metal&rdquo;, or &ldquo;sparkles&rdquo;.
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
                        <StickerVisual item={item} size={74} peel={false} />
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
    const isSvg = activeItem.format === "svg" && !!activeItem.svgSrc;
    const isTrazo = activeItem.format === "trazo" && !!activeItem.trazoId;
    const isPhoto = activeItem.format === "photo" && !!activeItem.photoSrc;
    const trazoDef = isTrazo ? findSticker(activeItem.trazoId!) : undefined;
    const trazoColorProp = isTrazo && inspectorColor && inspectorColor !== "mix" ? ` color="${inspectorColor}"` : "";
    const trazoRotateProp = isTrazo && inspectorRotate !== 0 ? ` rotate={${inspectorRotate}}` : "";
    const svgCode = `<img src="${activeItem.svgSrc}" alt="${activeItem.title} sticker" width={${inspectorSize}} height={${inspectorSize}} />`;
    const photoCode = `<img src="${activeItem.photoSrc}" alt="${activeItem.title} sticker" width={${inspectorSize}} height={${inspectorSize}} style={{ objectFit: "contain", filter: "drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px rgba(255,255,255,.9)) drop-shadow(0 6px 10px rgba(0,0,0,.22))" }} />`;

    const namedCode = isPhoto
      ? photoCode
      : isSvg
      ? svgCode
      : isTrazo
      ? `import { ${componentPascalName} } from "stick-it-up";\n\n<${componentPascalName}\n  size={${inspectorSize}}${trazoColorProp}${trazoRotateProp}${inspectorPeel ? "\n  peel" : ""}\n/>`
      : `import { ${componentPascalName} } from "stick-it-up";\n\n<${componentPascalName}\n  size={${inspectorSize}}${inspectorPeel ? "\n  peel" : ""}\n/>`;

    const dynamicCode = isPhoto
      ? photoCode
      : isSvg
      ? svgCode
      : isTrazo
      ? (() => { const defName = componentPascalName.replace(/Sticker$/, ""); const varName = defName.charAt(0).toLowerCase() + defName.slice(1) + "Def"; return `import { Sticker, ${varName} } from "stick-it-up";\n\n<Sticker\n  def={${varName}}\n  size={${inspectorSize}}${trazoColorProp}${trazoRotateProp}${inspectorPeel ? "\n  peel" : ""}\n/>`; })()
      : `import { Sticker } from "stick-it-up";\n\n<Sticker\n  name="${stickerName}"\n  size={${inspectorSize}}${inspectorPeel ? "\n  peel" : ""}\n/>`;

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
      if (activeItem?.format === "photo" && activeItem.photoSrc) {
        const a = document.createElement("a");
        a.href = activeItem.photoSrc; a.download = `${activeItem.name}.webp`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
        return;
      }
      if (activeItem?.format === "trazo" && trazoDef) {
        const markup = toSvgString(trazoDef, { size: inspectorSize, color: inspectorColor === "mix" ? undefined : inspectorColor, rotate: inspectorRotate, title: trazoDef.name });
        const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `${trazoDef.id}.svg`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        return;
      }
      if (activeItem?.svgSrc) {
        const a = document.createElement("a");
        a.href = activeItem.svgSrc; a.download = `${activeItem.name}.svg`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
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
        a.href = url; a.download = `${activeItem?.name || "sticker"}.svg`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
                    inspectorSize
                  }
                  peel={inspectorPeel}
                  color={activeItem.format === "trazo" ? inspectorColor : undefined}
                  rotate={activeItem.format === "trazo" ? inspectorRotate : undefined}
                />
              </div>
              
            </div>
            {activeItem.attribution && (
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                Photo source:{" "}
                <a
                  href={activeItem.attribution.filePageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-800"
                >
                  {activeItem.attribution.sourceTitle.replace("File:", "")}
                </a>{" "}
                by {activeItem.attribution.author} ({activeItem.attribution.license}), via Wikimedia Commons.
              </p>
            )}
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

            {activeItem.format === "trazo" && (
              <>
                <div className="flex items-center gap-4">
                  <span className="w-20 shrink-0 font-medium text-zinc-500">Color</span>
                  <select value={inspectorColor} onChange={(e)=>setInspectorColor(e.target.value)} className="flex-1 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs">
                    <option value="mix">Mix (original)</option>
                    <option value="#1f1e1b">Ink</option>
                    <option value="#ef4444">Coral</option>
                    <option value="#f97316">Tangerine</option>
                    <option value="#eab308">Sunny</option>
                    <option value="#16a34a">Grass</option>
                    <option value="#38bdf8">Sky</option>
                    <option value="#2563eb">Cobalt</option>
                    <option value="#ec4899">Pink</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 shrink-0 font-medium text-zinc-500">Rotate</span>
                  <input type="range" min="-180" max="180" value={inspectorRotate} onChange={(e)=>setInspectorRotate(Number(e.target.value))} className="h-1 flex-1 cursor-pointer accent-zinc-900" />
                  <span className="w-11 text-right font-mono text-[11px] text-zinc-500">{inspectorRotate}°</span>
                </div>
              </>
            )}
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
                Download {activeItem.format === "photo" ? "WebP" : "SVG"}
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
