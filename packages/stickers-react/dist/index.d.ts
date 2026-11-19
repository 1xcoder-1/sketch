import React, { SVGProps, CSSProperties } from 'react';

interface StickerProps extends SVGProps<SVGSVGElement> {
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
type StickerName = "flame" | "metal" | "blob-burst" | "star-burst" | "devil-cone" | "flame-star" | "folded-paper" | "red-berry" | "blueberry" | "berries" | "badge-smiley" | "cosmic-pill" | "red-cat" | "pink-cat" | "pink-cat-stamp" | "yellow-cat" | "black-cat" | "cat" | "catbeats-cat" | "cat-serious" | "dog" | "face" | "black-face" | "flower" | "peace-hand" | "sparkles" | "sparkle-trio" | "cosmic-eye" | "curious-globe" | "spiral" | "eye-splat" | "japan-badge" | "cone" | "icy-fleur" | "app-badge" | "bunny" | "cat-sit" | "fish" | "luffy-hat" | "coffee" | "japan-flag" | "cat-cute" | "cherry" | "goo" | "heart" | "nazar" | "bad-cat" | "nori-coffee" | "nori-cool" | "nori-headphones" | "nori-heart" | "nori-laptop" | "nori-rocket" | "pip-coffee" | "pip-detective" | "pip-headphones" | "pip-rocket" | "pip-thinking" | "pip-wizard" | "kuro-coffee" | "kuro-cool" | "kuro-headphones" | "kuro-heart" | "kuro-laptop" | "kuro-rocket" | "mochi-coffee" | "mochi-cool" | "mochi-headphones" | "mochi-heart" | "mochi-laptop" | "mochi-rocket" | "quirky-orange-haired" | "quirky-teal-haired" | "quirky-curly-blue" | "quirky-sunglasses" | "quirky-spiky-yellow" | "quirky-green-sad" | "quirky-crying-pink" | "quirky-green-down" | "quirky-hat-fish" | "quirky-red-beard" | "quirky-excited-purple" | "quirky-neutral-green" | "spooky-witch" | "spooky-monster-stack" | "spooky-bigfoot" | "spooky-ghost" | "spooky-reaper" | "funny-yellow-ghost" | "funny-purple-ghost" | "funny-grey-ghost" | "funny-blue-ghost" | "funny-coral-fish-ghost" | "funny-green-ghost" | "funny-pink-ghost" | "funny-glasses-ghost" | "funny-orange-ghost";

declare const STICKER_MAP: Record<StickerName, React.FC<StickerProps>>;
interface DynamicStickerProps extends StickerProps {
    name: StickerName;
}
/**
 * Dynamic Sticker component that renders any sticker by name
 *
 * @example
 * ```tsx
 * import { Sticker } from "stick-it-up";
 *
 * <Sticker name="devil-cone" size={130} peel />
 * <Sticker name="red-cat" size={130} peel />
 * ```
 */
declare const Sticker: React.FC<DynamicStickerProps>;

declare const FlameSticker: React.FC<StickerProps>;

declare const MetalSticker: React.FC<StickerProps>;

declare const BlobBurstSticker: React.FC<StickerProps>;

declare const StarBurstSticker: React.FC<StickerProps>;

declare const DevilConeSticker: React.FC<StickerProps>;

declare const FlameStarSticker: React.FC<StickerProps>;

declare const FoldedPaperSticker: React.FC<StickerProps>;

declare const RedBerrySticker: React.FC<StickerProps>;

declare const BlueberrySticker: React.FC<StickerProps>;

declare const BerriesSticker: React.FC<StickerProps>;

declare const RedCatSticker: React.FC<StickerProps>;

declare const PinkCatSticker: React.FC<StickerProps>;

declare const YellowCatSticker: React.FC<StickerProps>;

declare const BlackCatSticker: React.FC<StickerProps>;

declare const CatSticker: React.FC<StickerProps>;

/**
 * Kawaii Japanese-style cat sticker traced from the Catbeats die-cut artwork.
 * The original reference pixels are embedded as a lossless PNG.
 *
 * @example
 * <CatbeatsSticker size={140} peel />
 */
declare const CatbeatsSticker: React.FC<StickerProps>;

declare const CatSeriousSticker: React.FC<StickerProps>;

declare const DogSticker: React.FC<StickerProps>;

declare const FaceSticker: React.FC<StickerProps>;

declare const BlackFaceSticker: React.FC<StickerProps>;

declare const FlowerSticker: React.FC<StickerProps>;

declare const PeaceHandSticker: React.FC<StickerProps>;

declare const SparklesSticker: React.FC<StickerProps>;

declare const SparkleTrioSticker: React.FC<StickerProps>;

declare const CosmicEyeSticker: React.FC<StickerProps>;

declare const CuriousGlobeSticker: React.FC<StickerProps>;

declare const SpiralSticker: React.FC<StickerProps>;

declare const EyeSplatSticker: React.FC<StickerProps>;

declare const JapanBadgeSticker: React.FC<StickerProps>;

declare const ConeSticker: React.FC<StickerProps>;

declare const IcyFleurSticker: React.FC<StickerProps>;

declare const AppBadgeSticker: React.FC<StickerProps>;

declare const BunnySticker: React.FC<StickerProps>;

declare const CatSitSticker: React.FC<StickerProps>;

declare const FishSticker: React.FC<StickerProps>;

declare const LuffyHatSticker: React.FC<StickerProps>;

declare const CoffeeSticker: React.FC<StickerProps>;

declare const JapanFlagSticker: React.FC<StickerProps>;

declare const CatCuteSticker: React.FC<StickerProps>;

declare const CherrySticker: React.FC<StickerProps>;

declare const GooSticker: React.FC<StickerProps>;

declare const HeartSticker: React.FC<StickerProps>;

declare const NazarSticker: React.FC<StickerProps>;

declare const BadCatSticker: React.FC<StickerProps>;

declare const NoriCoffeeSticker: React.FC<StickerProps>;

declare const NoriCoolSticker: React.FC<StickerProps>;

declare const NoriHeadphonesSticker: React.FC<StickerProps>;

declare const NoriHeartSticker: React.FC<StickerProps>;

declare const NoriLaptopSticker: React.FC<StickerProps>;

declare const NoriRocketSticker: React.FC<StickerProps>;

declare const PipCoffeeSticker: React.FC<StickerProps>;

declare const PipDetectiveSticker: React.FC<StickerProps>;

declare const PipHeadphonesSticker: React.FC<StickerProps>;

declare const PipRocketSticker: React.FC<StickerProps>;

declare const PipThinkingSticker: React.FC<StickerProps>;

declare const PipWizardSticker: React.FC<StickerProps>;

declare const KuroCoffeeSticker: React.FC<StickerProps>;

declare const KuroCoolSticker: React.FC<StickerProps>;

declare const KuroHeadphonesSticker: React.FC<StickerProps>;

declare const KuroHeartSticker: React.FC<StickerProps>;

declare const KuroLaptopSticker: React.FC<StickerProps>;

declare const KuroRocketSticker: React.FC<StickerProps>;

declare const MochiCoffeeSticker: React.FC<StickerProps>;

declare const MochiCoolSticker: React.FC<StickerProps>;

declare const MochiHeadphonesSticker: React.FC<StickerProps>;

declare const MochiHeartSticker: React.FC<StickerProps>;

declare const MochiLaptopSticker: React.FC<StickerProps>;

declare const MochiRocketSticker: React.FC<StickerProps>;

/**
 * Quirky Orange Haired Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyOrangeHairedSticker: React.FC<StickerProps>;

/**
 * Quirky Teal Haired Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyTealHairedSticker: React.FC<StickerProps>;

/**
 * Quirky Curly Blue Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyCurlyBlueSticker: React.FC<StickerProps>;

/**
 * Quirky Sunglasses Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkySunglassesSticker: React.FC<StickerProps>;

/**
 * Quirky Spiky Yellow Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkySpikyYellowSticker: React.FC<StickerProps>;

/**
 * Quirky Green Sad Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyGreenSadSticker: React.FC<StickerProps>;

/**
 * Quirky Crying Pink Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyCryingPinkSticker: React.FC<StickerProps>;

/**
 * Quirky Green Down Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyGreenDownSticker: React.FC<StickerProps>;

/**
 * Quirky Hat Fish Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyHatFishSticker: React.FC<StickerProps>;

/**
 * Quirky Red Beard Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyRedBeardSticker: React.FC<StickerProps>;

/**
 * Quirky Excited Purple Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyExcitedPurpleSticker: React.FC<StickerProps>;

/**
 * Quirky Neutral Green Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const QuirkyNeutralGreenSticker: React.FC<StickerProps>;

/**
 * Spooky Witch Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const SpookyWitchSticker: React.FC<StickerProps>;

/**
 * Spooky Monster Stack Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const SpookyMonsterStackSticker: React.FC<StickerProps>;

/**
 * Spooky Bigfoot Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const SpookyBigfootSticker: React.FC<StickerProps>;

/**
 * Spooky Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const SpookyGhostSticker: React.FC<StickerProps>;

/**
 * Spooky Reaper Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const SpookyReaperSticker: React.FC<StickerProps>;

/**
 * Funny Yellow Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyYellowGhostSticker: React.FC<StickerProps>;

/**
 * Funny Purple Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyPurpleGhostSticker: React.FC<StickerProps>;

/**
 * Funny Grey Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyGreyGhostSticker: React.FC<StickerProps>;

/**
 * Funny Blue Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyBlueGhostSticker: React.FC<StickerProps>;

/**
 * Funny Coral Fish Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyCoralFishGhostSticker: React.FC<StickerProps>;

/**
 * Funny Green Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyGreenGhostSticker: React.FC<StickerProps>;

/**
 * Funny Pink Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyPinkGhostSticker: React.FC<StickerProps>;

/**
 * Funny Glasses Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyGlassesGhostSticker: React.FC<StickerProps>;

/**
 * Funny Orange Ghost Sticker — reproduced from the original Dribbble reference artwork.
 * Text, if any, is baked into the artwork and is not configurable.
 */
declare const FunnyOrangeGhostSticker: React.FC<StickerProps>;

export { AppBadgeSticker, BadCatSticker, RedBerrySticker as BadgeSmileySticker, BerriesSticker, BlackCatSticker, BlackFaceSticker, BlobBurstSticker, BlueberrySticker, BunnySticker, CatCuteSticker, CatSeriousSticker, CatSitSticker, CatSticker, CatbeatsSticker, CherrySticker, CoffeeSticker, ConeSticker, CosmicEyeSticker, BlueberrySticker as CosmicPillSticker, CuriousGlobeSticker, DevilConeSticker, DogSticker, EyeSplatSticker, FaceSticker, FishSticker, FlameStarSticker, FlameSticker, FlowerSticker, FoldedPaperSticker, FunnyBlueGhostSticker, FunnyCoralFishGhostSticker, FunnyGlassesGhostSticker, FunnyGreenGhostSticker, FunnyGreyGhostSticker, FunnyOrangeGhostSticker, FunnyPinkGhostSticker, FunnyPurpleGhostSticker, FunnyYellowGhostSticker, GooSticker, HeartSticker, IcyFleurSticker, JapanBadgeSticker, JapanFlagSticker, KuroCoffeeSticker, KuroCoolSticker, KuroHeadphonesSticker, KuroHeartSticker, KuroLaptopSticker, KuroRocketSticker, LuffyHatSticker, MetalSticker, MochiCoffeeSticker, MochiCoolSticker, MochiHeadphonesSticker, MochiHeartSticker, MochiLaptopSticker, MochiRocketSticker, NazarSticker, NoriCoffeeSticker, NoriCoolSticker, NoriHeadphonesSticker, NoriHeartSticker, NoriLaptopSticker, NoriRocketSticker, PeaceHandSticker, PinkCatSticker as PinkCatStampSticker, PinkCatSticker, PipCoffeeSticker, PipDetectiveSticker, PipHeadphonesSticker, PipRocketSticker, PipThinkingSticker, PipWizardSticker, QuirkyCryingPinkSticker, QuirkyCurlyBlueSticker, QuirkyExcitedPurpleSticker, QuirkyGreenDownSticker, QuirkyGreenSadSticker, QuirkyHatFishSticker, QuirkyNeutralGreenSticker, QuirkyOrangeHairedSticker, QuirkyRedBeardSticker, QuirkySpikyYellowSticker, QuirkySunglassesSticker, QuirkyTealHairedSticker, RedBerrySticker, RedCatSticker, STICKER_MAP, SparkleTrioSticker, SparklesSticker, SpiralSticker, SpookyBigfootSticker, SpookyGhostSticker, SpookyMonsterStackSticker, SpookyReaperSticker, SpookyWitchSticker, StarBurstSticker, Sticker, YellowCatSticker, Sticker as default };
export type { DynamicStickerProps, StickerName, StickerProps };
