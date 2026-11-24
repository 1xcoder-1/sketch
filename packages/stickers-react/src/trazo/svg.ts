export {
  resolveConcreteColor,
  toSvgString,
  type StickerCategory,
  type StickerDef,
  type StickerLayer,
  type ToSvgStringOptions,
} from "./core";

export * from "./catalog/ocean";
export * from "./catalog/arrows";
export * from "./catalog/nature";
export * from "./catalog/hearts";
export * from "./catalog/symbols";
export * from "./catalog/characters";

import { oceanStickers } from "./catalog/ocean";
import { arrowsStickers } from "./catalog/arrows";
import { natureStickers } from "./catalog/nature";
import { heartsStickers } from "./catalog/hearts";
import { symbolsStickers } from "./catalog/symbols";
import { charactersStickers } from "./catalog/characters";
import type { StickerCategory, StickerDef } from "./core";

export const trazoCatalog: readonly StickerDef[] = [
  ...oceanStickers,
  ...arrowsStickers,
  ...natureStickers,
  ...heartsStickers,
  ...symbolsStickers,
  ...charactersStickers,
];

export const trazoCategoryOrder: readonly StickerCategory[] = [
  "ocean",
  "arrows",
  "nature",
  "hearts",
  "symbols",
  "characters",
];

export const trazoCatalogByCategory: Record<StickerCategory, readonly StickerDef[]> = {
  ocean: oceanStickers,
  arrows: arrowsStickers,
  nature: natureStickers,
  hearts: heartsStickers,
  symbols: symbolsStickers,
  characters: charactersStickers,
};

export function findSticker(id: string): StickerDef | undefined {
  return trazoCatalog.find((sticker) => sticker.id === id);
}

export function getStickerDef(id: string): StickerDef | undefined {
  return findSticker(id);
}
