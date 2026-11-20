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
    id: "svg-monster-face-4",
    name: "monster-face-4",
    title: "Spooky Monster Face 4",
    category: "spooky",
    format: "component",
    componentName: "monster-face-4",
    svgSrc: "/stickers/monster-face-4.svg",
    description: "High-resolution editable vector tracing of spooky monster face 4 from the Halloween monster faces collection, with a transparent background.",
    tags: ["halloween", "monster", "spooky", "face", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-monster-face-5",
    name: "monster-face-5",
    title: "Spooky Monster Face 5",
    category: "spooky",
    format: "component",
    componentName: "monster-face-5",
    svgSrc: "/stickers/monster-face-5.svg",
    description: "High-resolution editable vector tracing of spooky monster face 5 from the Halloween monster faces collection, with a transparent background.",
    tags: ["halloween", "monster", "spooky", "face", "vector"],
    defaultRotation: 5,
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
    id: "svg-monster-icon-4",
    name: "monster-icon-4",
    title: "Monster Head Icon 4",
    category: "spooky",
    format: "component",
    componentName: "monster-icon-4",
    svgSrc: "/stickers/monster-icon-4.svg",
    description: "High-resolution editable vector tracing of monster head icon 4 from the monster head icon set, with a transparent background.",
    tags: ["halloween", "monster", "icon", "spooky", "vector"],
    defaultRotation: 6,
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
    id: "svg-halloween-sketch-1",
    name: "halloween-sketch-1",
    title: "Hand-Drawn Halloween Sketch 1",
    category: "spooky",
    format: "component",
    componentName: "halloween-sketch-1",
    svgSrc: "/stickers/halloween-sketch-1.svg",
    description: "High-resolution editable vector tracing of a hand-drawn Halloween character from the Halloween characters pack, with a transparent background.",
    tags: ["halloween", "hand-drawn", "character", "spooky", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-halloween-sketch-2",
    name: "halloween-sketch-2",
    title: "Hand-Drawn Halloween Sketch 2",
    category: "spooky",
    format: "component",
    componentName: "halloween-sketch-2",
    svgSrc: "/stickers/halloween-sketch-2.svg",
    description: "High-resolution editable vector tracing of a hand-drawn Halloween character from the Halloween characters pack, with a transparent background.",
    tags: ["halloween", "hand-drawn", "character", "spooky", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-halloween-sketch-3",
    name: "halloween-sketch-3",
    title: "Hand-Drawn Halloween Sketch 3",
    category: "spooky",
    format: "component",
    componentName: "halloween-sketch-3",
    svgSrc: "/stickers/halloween-sketch-3.svg",
    description: "High-resolution editable vector tracing of a hand-drawn Halloween character from the Halloween characters pack, with a transparent background.",
    tags: ["halloween", "hand-drawn", "character", "spooky", "vector"],
    defaultRotation: 4,
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
    id: "svg-halloween-prop-2",
    name: "halloween-prop-2",
    title: "Halloween Frankenstein Prop",
    category: "spooky",
    format: "component",
    componentName: "halloween-prop-2",
    svgSrc: "/stickers/halloween-prop-2.svg",
    description: "High-resolution editable vector tracing of a green Frankenstein-style Halloween character from the Halloween characters elements set, with a transparent background.",
    tags: ["halloween", "frankenstein", "prop", "spooky", "vector"],
    defaultRotation: -3,
  },
  {
    id: "svg-halloween-prop-3",
    name: "halloween-prop-3",
    title: "Halloween Black Cat Prop",
    category: "spooky",
    format: "component",
    componentName: "halloween-prop-3",
    svgSrc: "/stickers/halloween-prop-3.svg",
    description: "High-resolution editable vector tracing of a black Halloween cat character from the Halloween characters elements set, with a transparent background.",
    tags: ["halloween", "cat", "prop", "spooky", "vector"],
    defaultRotation: 3,
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
    id: "svg-cute-monster-4",
    name: "cute-monster-4",
    title: "Cute Halloween Monster 4",
    category: "spooky",
    format: "component",
    componentName: "cute-monster-4",
    svgSrc: "/stickers/cute-monster-4.svg",
    description: "High-resolution editable vector tracing of a cute cartoon Halloween monster from the cute monster character collection, with a transparent background.",
    tags: ["halloween", "cute", "monster", "cartoon", "vector"],
    defaultRotation: -6,
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
    id: "svg-watercolor-character-2",
    name: "watercolor-character-2",
    title: "Watercolor Halloween Character 2",
    category: "spooky",
    format: "component",
    componentName: "watercolor-character-2",
    svgSrc: "/stickers/watercolor-character-2.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween character from the watercolor character collection, with a transparent background.",
    tags: ["halloween", "watercolor", "character", "hand-painted", "vector"],
    defaultRotation: -5,
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
    id: "svg-watercolor-character-5",
    name: "watercolor-character-5",
    title: "Watercolor Halloween Character 5",
    category: "spooky",
    format: "component",
    componentName: "watercolor-character-5",
    svgSrc: "/stickers/watercolor-character-5.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween character from the watercolor character collection, with a transparent background.",
    tags: ["halloween", "watercolor", "character", "hand-painted", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-watercolor-character-6",
    name: "watercolor-character-6",
    title: "Watercolor Halloween Character 6",
    category: "spooky",
    format: "component",
    componentName: "watercolor-character-6",
    svgSrc: "/stickers/watercolor-character-6.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween character from the watercolor character collection, with a transparent background.",
    tags: ["halloween", "watercolor", "character", "hand-painted", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-watercolor-kid-1",
    name: "watercolor-kid-1",
    title: "Watercolor Halloween Kid 1",
    category: "spooky",
    format: "component",
    componentName: "watercolor-kid-1",
    svgSrc: "/stickers/watercolor-kid-1.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween kid character from the watercolor kid collection, with a transparent background.",
    tags: ["halloween", "watercolor", "kid", "character", "vector"],
    defaultRotation: 6,
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
    id: "svg-watercolor-kid-4",
    name: "watercolor-kid-4",
    title: "Watercolor Halloween Kid 4",
    category: "spooky",
    format: "component",
    componentName: "watercolor-kid-4",
    svgSrc: "/stickers/watercolor-kid-4.svg",
    description: "High-resolution editable vector tracing of a watercolor-style Halloween kid character from the watercolor kid collection, with a transparent background.",
    tags: ["halloween", "watercolor", "kid", "character", "vector"],
    defaultRotation: -6,
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
    id: "svg-videogame-collection-3",
    name: "videogame-collection-3",
    title: "Retro Videogame Character 3",
    category: "spooky",
    format: "component",
    componentName: "videogame-collection-3",
    svgSrc: "/stickers/videogame-collection-3.svg",
    description: "High-resolution editable vector tracing of a retro videogame character from the videogame character collection, with a transparent background.",
    tags: ["videogame", "retro", "character", "arcade", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-videogame-collection-4",
    name: "videogame-collection-4",
    title: "Retro Videogame Character 4",
    category: "spooky",
    format: "component",
    componentName: "videogame-collection-4",
    svgSrc: "/stickers/videogame-collection-4.svg",
    description: "High-resolution editable vector tracing of a retro videogame character from the videogame character collection, with a transparent background.",
    tags: ["videogame", "retro", "character", "arcade", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-videogame-collection-5",
    name: "videogame-collection-5",
    title: "Retro Videogame Character 5",
    category: "spooky",
    format: "component",
    componentName: "videogame-collection-5",
    svgSrc: "/stickers/videogame-collection-5.svg",
    description: "High-resolution editable vector tracing of a retro videogame character from the videogame character collection, with a transparent background.",
    tags: ["videogame", "retro", "character", "arcade", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-videogame-collection-6",
    name: "videogame-collection-6",
    title: "Retro Videogame Character 6",
    category: "spooky",
    format: "component",
    componentName: "videogame-collection-6",
    svgSrc: "/stickers/videogame-collection-6.svg",
    description: "High-resolution editable vector tracing of a retro videogame character from the videogame character collection, with a transparent background.",
    tags: ["videogame", "retro", "character", "arcade", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-videogame-set-1",
    name: "videogame-set-1",
    title: "Retro Videogame Hero 1",
    category: "spooky",
    format: "component",
    componentName: "videogame-set-1",
    svgSrc: "/stickers/videogame-set-1.svg",
    description: "High-resolution editable vector tracing of a retro videogame hero from the videogame character set, with a transparent background.",
    tags: ["videogame", "retro", "hero", "arcade", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-videogame-set-2",
    name: "videogame-set-2",
    title: "Retro Videogame Hero 2",
    category: "spooky",
    format: "component",
    componentName: "videogame-set-2",
    svgSrc: "/stickers/videogame-set-2.svg",
    description: "High-resolution editable vector tracing of a retro videogame hero from the videogame character set, with a transparent background.",
    tags: ["videogame", "retro", "hero", "arcade", "vector"],
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
    id: "svg-videogame-set-5",
    name: "videogame-set-5",
    title: "Retro Videogame Hero 5",
    category: "spooky",
    format: "component",
    componentName: "videogame-set-5",
    svgSrc: "/stickers/videogame-set-5.svg",
    description: "High-resolution editable vector tracing of a retro videogame hero from the videogame character set, with a transparent background.",
    tags: ["videogame", "retro", "hero", "arcade", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-videogame-set-6",
    name: "videogame-set-6",
    title: "Retro Videogame Hero 6",
    category: "spooky",
    format: "component",
    componentName: "videogame-set-6",
    svgSrc: "/stickers/videogame-set-6.svg",
    description: "High-resolution editable vector tracing of a retro videogame hero from the videogame character set, with a transparent background.",
    tags: ["videogame", "retro", "hero", "arcade", "vector"],
    defaultRotation: -4,
  },
  {
    id: "svg-watercolor-halloween-1",
    name: "watercolor-halloween-1",
    title: "Watercolor Halloween Spooky 1",
    category: "spooky",
    format: "component",
    componentName: "watercolor-halloween-1",
    svgSrc: "/stickers/watercolor-halloween-1.svg",
    description: "High-resolution editable vector tracing of a spooky watercolor Halloween character from the watercolor Halloween collection, with a transparent background.",
    tags: ["halloween", "watercolor", "spooky", "character", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-watercolor-halloween-2",
    name: "watercolor-halloween-2",
    title: "Watercolor Halloween Spooky 2",
    category: "spooky",
    format: "component",
    componentName: "watercolor-halloween-2",
    svgSrc: "/stickers/watercolor-halloween-2.svg",
    description: "High-resolution editable vector tracing of a spooky watercolor Halloween character from the watercolor Halloween collection, with a transparent background.",
    tags: ["halloween", "watercolor", "spooky", "character", "vector"],
    defaultRotation: -5,
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
    id: "svg-watercolor-halloween-4",
    name: "watercolor-halloween-4",
    title: "Watercolor Halloween Spooky 4",
    category: "spooky",
    format: "component",
    componentName: "watercolor-halloween-4",
    svgSrc: "/stickers/watercolor-halloween-4.svg",
    description: "High-resolution editable vector tracing of a spooky watercolor Halloween character from the watercolor Halloween collection, with a transparent background.",
    tags: ["halloween", "watercolor", "spooky", "character", "vector"],
    defaultRotation: -6,
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
    id: "svg-watercolor-halloween-6",
    name: "watercolor-halloween-6",
    title: "Watercolor Halloween Spooky 6",
    category: "spooky",
    format: "component",
    componentName: "watercolor-halloween-6",
    svgSrc: "/stickers/watercolor-halloween-6.svg",
    description: "High-resolution editable vector tracing of a spooky watercolor Halloween character from the watercolor Halloween collection, with a transparent background.",
    tags: ["halloween", "watercolor", "spooky", "character", "vector"],
    defaultRotation: -4,
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
    id: "svg-handdrawn-kid-2",
    name: "handdrawn-kid-2",
    title: "Hand-Drawn Halloween Kid 2",
    category: "spooky",
    format: "component",
    componentName: "handdrawn-kid-2",
    svgSrc: "/stickers/handdrawn-kid-2.svg",
    description: "High-resolution editable vector tracing of a hand-drawn Halloween kid character from the hand-drawn kid collection, with a transparent background.",
    tags: ["halloween", "hand-drawn", "kid", "character", "vector"],
    defaultRotation: -4,
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
    id: "svg-creepy-character-1",
    name: "creepy-character-1",
    title: "Creepy Halloween Character 1",
    category: "spooky",
    format: "component",
    componentName: "creepy-character-1",
    svgSrc: "/stickers/creepy-character-1.svg",
    description: "High-resolution editable vector tracing of a creepy hand-drawn Halloween character from the creepy character collection, with a transparent background.",
    tags: ["halloween", "creepy", "hand-drawn", "character", "vector"],
    defaultRotation: -6,
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
    id: "svg-retro-game-hero-1",
    name: "retro-game-hero-1",
    title: "Retro Game Hero 1",
    category: "spooky",
    format: "component",
    componentName: "retro-game-hero-1",
    svgSrc: "/stickers/retro-game-hero-1.svg",
    description: "High-resolution editable vector tracing of a cartoon video game hero character from the five character collection, with a transparent background.",
    tags: ["videogame", "retro", "hero", "cartoon", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-retro-game-hero-2",
    name: "retro-game-hero-2",
    title: "Retro Game Hero 2",
    category: "spooky",
    format: "component",
    componentName: "retro-game-hero-2",
    svgSrc: "/stickers/retro-game-hero-2.svg",
    description: "High-resolution editable vector tracing of a cartoon video game hero character from the five character collection, with a transparent background.",
    tags: ["videogame", "retro", "hero", "cartoon", "vector"],
    defaultRotation: -5,
  },
  {
    id: "svg-retro-game-hero-3",
    name: "retro-game-hero-3",
    title: "Retro Game Hero 3",
    category: "spooky",
    format: "component",
    componentName: "retro-game-hero-3",
    svgSrc: "/stickers/retro-game-hero-3.svg",
    description: "High-resolution editable vector tracing of a cartoon video game hero character from the five character collection, with a transparent background.",
    tags: ["videogame", "retro", "hero", "cartoon", "vector"],
    defaultRotation: 4,
  },
  {
    id: "svg-retro-game-hero-4",
    name: "retro-game-hero-4",
    title: "Retro Game Hero 4",
    category: "spooky",
    format: "component",
    componentName: "retro-game-hero-4",
    svgSrc: "/stickers/retro-game-hero-4.svg",
    description: "High-resolution editable vector tracing of a cartoon video game hero character from the five character collection, with a transparent background.",
    tags: ["videogame", "retro", "hero", "cartoon", "vector"],
    defaultRotation: -6,
  },
  {
    id: "svg-retro-game-hero-5",
    name: "retro-game-hero-5",
    title: "Retro Game Hero 5",
    category: "spooky",
    format: "component",
    componentName: "retro-game-hero-5",
    svgSrc: "/stickers/retro-game-hero-5.svg",
    description: "High-resolution editable vector tracing of a cartoon video game hero character from the five character collection, with a transparent background.",
    tags: ["videogame", "retro", "hero", "cartoon", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-costume-kid-1",
    name: "costume-kid-1",
    title: "Hand-Drawn Costume Kid 1",
    category: "spooky",
    format: "component",
    componentName: "costume-kid-1",
    svgSrc: "/stickers/costume-kid-1.svg",
    description: "High-resolution editable vector tracing of a hand-drawn child in a cute costume from the children collection, with a transparent background.",
    tags: ["kid", "hand-drawn", "costume", "character", "vector"],
    defaultRotation: -5,
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
    id: "svg-costume-kid-4",
    name: "costume-kid-4",
    title: "Hand-Drawn Costume Kid 4",
    category: "spooky",
    format: "component",
    componentName: "costume-kid-4",
    svgSrc: "/stickers/costume-kid-4.svg",
    description: "High-resolution editable vector tracing of a hand-drawn child in a cute costume from the children collection, with a transparent background.",
    tags: ["kid", "hand-drawn", "costume", "character", "vector"],
    defaultRotation: 6,
  },
  {
    id: "svg-costume-kid-5",
    name: "costume-kid-5",
    title: "Hand-Drawn Costume Kid 5",
    category: "spooky",
    format: "component",
    componentName: "costume-kid-5",
    svgSrc: "/stickers/costume-kid-5.svg",
    description: "High-resolution editable vector tracing of a hand-drawn child in a cute costume from the children collection, with a transparent background.",
    tags: ["kid", "hand-drawn", "costume", "character", "vector"],
    defaultRotation: -6,
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
    id: "svg-cute-halloween-buddy-1",
    name: "cute-halloween-buddy-1",
    title: "Cute Halloween Buddy 1",
    category: "spooky",
    format: "component",
    componentName: "cute-halloween-buddy-1",
    svgSrc: "/stickers/cute-halloween-buddy-1.svg",
    description: "High-resolution editable vector tracing of a cute Halloween cartoon character from the cute Halloween characters collection, with a transparent background.",
    tags: ["halloween", "cute", "cartoon", "character", "vector"],
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
    id: "svg-cute-halloween-buddy-3",
    name: "cute-halloween-buddy-3",
    title: "Cute Halloween Buddy 3",
    category: "spooky",
    format: "component",
    componentName: "cute-halloween-buddy-3",
    svgSrc: "/stickers/cute-halloween-buddy-3.svg",
    description: "High-resolution editable vector tracing of a cute Halloween cartoon character from the cute Halloween characters collection, with a transparent background.",
    tags: ["halloween", "cute", "cartoon", "character", "vector"],
    defaultRotation: 5,
  },
  {
    id: "svg-cute-halloween-buddy-4",
    name: "cute-halloween-buddy-4",
    title: "Cute Halloween Buddy 4",
    category: "spooky",
    format: "component",
    componentName: "cute-halloween-buddy-4",
    svgSrc: "/stickers/cute-halloween-buddy-4.svg",
    description: "High-resolution editable vector tracing of a cute Halloween cartoon character from the cute Halloween characters collection, with a transparent background.",
    tags: ["halloween", "cute", "cartoon", "character", "vector"],
    defaultRotation: -4,
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
    id: "svg-cute-halloween-buddy-6",
    name: "cute-halloween-buddy-6",
    title: "Cute Halloween Buddy 6",
    category: "spooky",
    format: "component",
    componentName: "cute-halloween-buddy-6",
    svgSrc: "/stickers/cute-halloween-buddy-6.svg",
    description: "High-resolution editable vector tracing of a cute Halloween cartoon character from the cute Halloween characters collection, with a transparent background.",
    tags: ["halloween", "cute", "cartoon", "character", "vector"],
    defaultRotation: -5,
  },
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
  if (item.format === "svg" && item.svgSrc) {
    return (
      <img
        src={item.svgSrc}
        alt={`${item.title} sticker`}
        width={size}
        height={size}
        draggable={false}
        className={className}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }
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
        : `<img src="/stickers/face.svg" alt="Coffee sticker" width={${guideSize}} height={${guideSize}} />`;

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
    const code =
      item.format === "svg" && item.svgSrc
        ? `<img src="${item.svgSrc}" alt="${item.name} sticker" width={96} height={96} />`
        : `import { ${compName} } from "stick-it-up";\n\n<${compName} size={96} peel />`;

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
            ).filter((tab) => tab.count > 0).map((tab) => {
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
                                { id: "monster-face-4", label: "monster-face-4" },
                                { id: "monster-face-5", label: "monster-face-5" },
                                { id: "monster-face-7", label: "monster-face-7" },
                                { id: "monster-face-8", label: "monster-face-8" },
                                { id: "monster-face-9", label: "monster-face-9" },
                                { id: "monster-icon-1", label: "monster-icon-1" },
                                { id: "monster-icon-3", label: "monster-icon-3" },
                                { id: "monster-icon-4", label: "monster-icon-4" },
                                { id: "monster-icon-5", label: "monster-icon-5" },
                                { id: "halloween-sketch-1", label: "halloween-sketch-1" },
                                { id: "halloween-sketch-2", label: "halloween-sketch-2" },
                                { id: "halloween-sketch-3", label: "halloween-sketch-3" },
                                { id: "halloween-sketch-4", label: "halloween-sketch-4" },
                                { id: "halloween-prop-1", label: "halloween-prop-1" },
                                { id: "halloween-prop-2", label: "halloween-prop-2" },
                                { id: "halloween-prop-3", label: "halloween-prop-3" },
                                { id: "cute-monster-1", label: "cute-monster-1" },
                                { id: "cute-monster-2", label: "cute-monster-2" },
                                { id: "cute-monster-3", label: "cute-monster-3" },
                                { id: "cute-monster-4", label: "cute-monster-4" },
                                { id: "cute-monster-5", label: "cute-monster-5" },
                                { id: "cute-monster-6", label: "cute-monster-6" },
                                { id: "watercolor-character-1", label: "watercolor-character-1" },
                                { id: "watercolor-character-2", label: "watercolor-character-2" },
                                { id: "watercolor-character-3", label: "watercolor-character-3" },
                                { id: "watercolor-character-4", label: "watercolor-character-4" },
                                { id: "watercolor-character-5", label: "watercolor-character-5" },
                                { id: "watercolor-character-6", label: "watercolor-character-6" },
                                { id: "watercolor-kid-1", label: "watercolor-kid-1" },
                                { id: "watercolor-kid-2", label: "watercolor-kid-2" },
                                { id: "watercolor-kid-3", label: "watercolor-kid-3" },
                                { id: "watercolor-kid-4", label: "watercolor-kid-4" },
                                { id: "watercolor-kid-5", label: "watercolor-kid-5" },
                                { id: "watercolor-kid-6", label: "watercolor-kid-6" },
                                { id: "videogame-collection-1", label: "videogame-collection-1" },
                                { id: "videogame-collection-2", label: "videogame-collection-2" },
                                { id: "videogame-collection-3", label: "videogame-collection-3" },
                                { id: "videogame-collection-4", label: "videogame-collection-4" },
                                { id: "videogame-collection-5", label: "videogame-collection-5" },
                                { id: "videogame-collection-6", label: "videogame-collection-6" },
                                { id: "videogame-set-1", label: "videogame-set-1" },
                                { id: "videogame-set-2", label: "videogame-set-2" },
                                { id: "videogame-set-3", label: "videogame-set-3" },
                                { id: "videogame-set-4", label: "videogame-set-4" },
                                { id: "videogame-set-5", label: "videogame-set-5" },
                                { id: "videogame-set-6", label: "videogame-set-6" },
                                { id: "watercolor-halloween-1", label: "watercolor-halloween-1" },
                                { id: "watercolor-halloween-2", label: "watercolor-halloween-2" },
                                { id: "watercolor-halloween-3", label: "watercolor-halloween-3" },
                                { id: "watercolor-halloween-4", label: "watercolor-halloween-4" },
                                { id: "watercolor-halloween-5", label: "watercolor-halloween-5" },
                                { id: "watercolor-halloween-6", label: "watercolor-halloween-6" },
                                { id: "handdrawn-kid-1", label: "handdrawn-kid-1" },
                                { id: "handdrawn-kid-2", label: "handdrawn-kid-2" },
                                { id: "handdrawn-kid-3", label: "handdrawn-kid-3" },
                                { id: "handdrawn-kid-4", label: "handdrawn-kid-4" },
                                { id: "frankenstein-boy-1", label: "frankenstein-boy-1" },
                                { id: "creepy-character-1", label: "creepy-character-1" },
                                { id: "creepy-character-2", label: "creepy-character-2" },
                                { id: "creepy-character-3", label: "creepy-character-3" },
                                { id: "creepy-character-4", label: "creepy-character-4" },
                                { id: "samurai-boy-1", label: "samurai-boy-1" },
                                { id: "ninja-airbender-1", label: "ninja-airbender-1" },
                                { id: "kimono-katana-boy-1", label: "kimono-katana-boy-1" },
                                { id: "chinese-vampire-1", label: "chinese-vampire-1" },
                                { id: "ninja-sitting-1", label: "ninja-sitting-1" },
                                { id: "japanese-merchant-1", label: "japanese-merchant-1" },
                                { id: "retro-game-hero-1", label: "retro-game-hero-1" },
                                { id: "retro-game-hero-2", label: "retro-game-hero-2" },
                                { id: "retro-game-hero-3", label: "retro-game-hero-3" },
                                { id: "retro-game-hero-4", label: "retro-game-hero-4" },
                                { id: "retro-game-hero-5", label: "retro-game-hero-5" },
                                { id: "costume-kid-1", label: "costume-kid-1" },
                                { id: "costume-kid-2", label: "costume-kid-2" },
                                { id: "costume-kid-3", label: "costume-kid-3" },
                                { id: "costume-kid-4", label: "costume-kid-4" },
                                { id: "costume-kid-5", label: "costume-kid-5" },
                                { id: "costume-kid-6", label: "costume-kid-6" },
                                { id: "cute-halloween-buddy-1", label: "cute-halloween-buddy-1" },
                                { id: "cute-halloween-buddy-2", label: "cute-halloween-buddy-2" },
                                { id: "cute-halloween-buddy-3", label: "cute-halloween-buddy-3" },
                                { id: "cute-halloween-buddy-4", label: "cute-halloween-buddy-4" },
                                { id: "cute-halloween-buddy-5", label: "cute-halloween-buddy-5" },
                                { id: "cute-halloween-buddy-6", label: "cute-halloween-buddy-6" },
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
    const svgCode = `<img src="${activeItem.svgSrc}" alt="${activeItem.title} sticker" width={${inspectorSize}} height={${inspectorSize}} />`;

    const namedCode = isSvg
      ? svgCode
      : `import { ${componentPascalName} } from "stick-it-up";\n\n<${componentPascalName}\n  size={${inspectorSize}}${
          inspectorPeel ? "\n  peel" : ""
        }\n/>`;

    const dynamicCode = isSvg
      ? svgCode
      : `import { Sticker } from "stick-it-up";\n\n<Sticker\n  name="${stickerName}"\n  size={${inspectorSize}}${
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
