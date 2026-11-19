import type { SVGProps, CSSProperties } from "react";

export interface StickerProps extends SVGProps<SVGSVGElement> {
  /**
   * Shortcut for width and height (e.g. 120, "100px", "5rem")
   */
  size?: number | string;
  /**
   * If true, adds a physical vinyl sticker hover peel / tilt effect
   * @default false
   */
  peel?: boolean;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Custom inline styles
   */
  style?: CSSProperties;
}

export type StickerName =
  | "flame"
  | "metal"
  | "blob-burst"
  | "star-burst"
  | "devil-cone"
  | "flame-star"
  | "folded-paper"
  | "red-berry"
  | "blueberry"
  | "berries"
  | "badge-smiley"
  | "cosmic-pill"
  | "red-cat"
  | "pink-cat"
  | "pink-cat-stamp"
  | "yellow-cat"
  | "black-cat"
  | "cat"
  | "catbeats-cat"
  | "cat-serious"
  | "dog"
  | "face"
  | "black-face"
  | "flower"
  | "peace-hand"
  | "sparkles"
  | "sparkle-trio"
  | "cosmic-eye"
  | "curious-globe"
  | "spiral"
  | "eye-splat"
  | "japan-badge"
  | "cone"
  | "icy-fleur"
  | "app-badge"
  | "bunny"
  | "cat-sit"
  | "fish"
  | "luffy-hat"
  | "coffee"
  | "japan-flag"
  | "cat-cute"
  | "cherry"
  | "goo"
  | "heart"
  | "nazar"
  | "bad-cat"
  | "nori-coffee"
  | "nori-cool"
  | "nori-headphones"
  | "nori-heart"
  | "nori-laptop"
  | "nori-rocket"
  | "pip-coffee"
  | "pip-detective"
  | "pip-headphones"
  | "pip-rocket"
  | "pip-thinking"
  | "pip-wizard"
  | "kuro-coffee"
  | "kuro-cool"
  | "kuro-headphones"
  | "kuro-heart"
  | "kuro-laptop"
  | "kuro-rocket"
  | "mochi-coffee"
  | "mochi-cool"
  | "mochi-headphones"
  | "mochi-heart"
  | "mochi-laptop"
  | "mochi-rocket"
  // Quirky faces pack (Dribbble: What a Quirky)
  | "quirky-orange-haired"
  | "quirky-teal-haired"
  | "quirky-curly-blue"
  | "quirky-sunglasses"
  | "quirky-spiky-yellow"
  | "quirky-green-sad"
  | "quirky-crying-pink"
  | "quirky-green-down"
  | "quirky-hat-fish"
  | "quirky-red-beard"
  | "quirky-excited-purple"
  | "quirky-neutral-green"
  // Spooky Halloween pack (Dribbble: Spooky Stickers)
  | "spooky-witch"
  | "spooky-monster-stack"
  | "spooky-bigfoot"
  | "spooky-ghost"
  | "spooky-reaper"
  // Blob ghosts pack (Dribbble: Funny set of stickers)
  | "funny-yellow-ghost"
  | "funny-purple-ghost"
  | "funny-grey-ghost"
  | "funny-blue-ghost"
  | "funny-coral-fish-ghost"
  | "funny-green-ghost"
  | "funny-pink-ghost"
  | "funny-glasses-ghost"
  | "funny-orange-ghost";
