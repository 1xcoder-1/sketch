type StickerCategory = "ocean" | "arrows" | "nature" | "hearts" | "symbols" | "characters";
interface StickerLayer {
    d: string;
    fill: string;
}
interface StickerDef {
    id: string;
    componentName: string;
    name: string;
    category: StickerCategory;
    mixColor: string;
    tags: readonly string[];
    viewBox: string;
    d: string;
    layers?: readonly StickerLayer[];
}
interface ToSvgStringOptions {
    size?: number;
    /** Optional single-color override. Omit for the default multi-color crayon artwork. */
    color?: string;
    /** Optional rotation angle in degrees around the sticker center. Defaults to `0`. */
    rotate?: number;
    title?: string;
}
/**
 * Resolves a color string for standalone SVG/PNG output.
 * Never emits CSS variables so offscreen canvas and downloaded SVGs always render concrete ink.
 */
declare function resolveConcreteColor(color?: string, fallback?: string): string;
declare function toSvgString(def: StickerDef, options?: ToSvgStringOptions): string;

declare const flapjackOctopusDef: StickerDef;
declare const oceanStickers: readonly StickerDef[];

declare const curlyArrowDef: StickerDef;
declare const spiralDef: StickerDef;
declare const squareSpiralDef: StickerDef;
declare const loopRibbonDef: StickerDef;
declare const zigzagScribbleDef: StickerDef;
declare const loopArrowOrangeDef: StickerDef;
declare const verticalZigzagDef: StickerDef;
declare const downArrowDef: StickerDef;
declare const peachCoilDef: StickerDef;
declare const skyCoilDef: StickerDef;
declare const arrowsStickers: readonly StickerDef[];

declare const flowerRedDef: StickerDef;
declare const puffyCloudDef: StickerDef;
declare const flowerYellowDef: StickerDef;
declare const oceanWavesDef: StickerDef;
declare const sunBurstDef: StickerDef;
declare const splashDropsDef: StickerDef;
declare const tripleZigzagDef: StickerDef;
declare const spikyGrassDef: StickerDef;
declare const scallopedWaveDef: StickerDef;
declare const earthDef: StickerDef;
declare const natureStickers: readonly StickerDef[];

declare const crownRaysDef: StickerDef;
declare const heartBurstDef: StickerDef;
declare const sixStarDef: StickerDef;
declare const heartChevronDef: StickerDef;
declare const solidStarDef: StickerDef;
declare const sparkleFourDef: StickerDef;
declare const sparkleCrossDef: StickerDef;
declare const bowtieLoopDef: StickerDef;
declare const tripleHeartSwirlDef: StickerDef;
declare const doubleHeartsDef: StickerDef;
declare const starOutlineDef: StickerDef;
declare const crosshairBurstDef: StickerDef;
declare const heartsStickers: readonly StickerDef[];

declare const diamondDef: StickerDef;
declare const angerMarkDef: StickerDef;
declare const triangleDef: StickerDef;
declare const circleRingDef: StickerDef;
declare const asteriskDef: StickerDef;
declare const lightningBoltDef: StickerDef;
declare const questionMarkDef: StickerDef;
declare const exclamationMarkDef: StickerDef;
declare const diagonalHatchDef: StickerDef;
declare const hashtagDef: StickerDef;
declare const infinityLoopDef: StickerDef;
declare const musicNoteDef: StickerDef;
declare const xMarkDef: StickerDef;
declare const symbolsStickers: readonly StickerDef[];

declare const pinkDinoDef: StickerDef;
declare const spiderManDef: StickerDef;
declare const stitchDef: StickerDef;
declare const littleGreenAlienDef: StickerDef;
declare const woodyWinkDef: StickerDef;
declare const charactersStickers: readonly StickerDef[];

declare const trazoCatalog: readonly StickerDef[];
declare const trazoCategoryOrder: readonly StickerCategory[];
declare const trazoCatalogByCategory: Record<StickerCategory, readonly StickerDef[]>;
declare function findSticker(id: string): StickerDef | undefined;
declare function getStickerDef(id: string): StickerDef | undefined;

export { angerMarkDef, arrowsStickers, asteriskDef, bowtieLoopDef, charactersStickers, circleRingDef, crosshairBurstDef, crownRaysDef, curlyArrowDef, diagonalHatchDef, diamondDef, doubleHeartsDef, downArrowDef, earthDef, exclamationMarkDef, findSticker, flapjackOctopusDef, flowerRedDef, flowerYellowDef, getStickerDef, hashtagDef, heartBurstDef, heartChevronDef, heartsStickers, infinityLoopDef, lightningBoltDef, littleGreenAlienDef, loopArrowOrangeDef, loopRibbonDef, musicNoteDef, natureStickers, oceanStickers, oceanWavesDef, peachCoilDef, pinkDinoDef, puffyCloudDef, questionMarkDef, resolveConcreteColor, scallopedWaveDef, sixStarDef, skyCoilDef, solidStarDef, sparkleCrossDef, sparkleFourDef, spiderManDef, spikyGrassDef, spiralDef, splashDropsDef, squareSpiralDef, starOutlineDef, stitchDef, sunBurstDef, symbolsStickers, toSvgString, trazoCatalog, trazoCatalogByCategory, trazoCategoryOrder, triangleDef, tripleHeartSwirlDef, tripleZigzagDef, verticalZigzagDef, woodyWinkDef, xMarkDef, zigzagScribbleDef };
export type { StickerCategory, StickerDef, StickerLayer, ToSvgStringOptions };
