import * as React from 'react';
import React__default, { SVGProps, CSSProperties, FC } from 'react';
import { StickerDef } from './svg.mjs';
export { StickerCategory, StickerLayer, ToSvgStringOptions, angerMarkDef, arrowsStickers, asteriskDef, bowtieLoopDef, charactersStickers, circleRingDef, crosshairBurstDef, crownRaysDef, curlyArrowDef, diagonalHatchDef, diamondDef, doubleHeartsDef, downArrowDef, earthDef, exclamationMarkDef, findSticker, flapjackOctopusDef, flowerRedDef, flowerYellowDef, getStickerDef, hashtagDef, heartBurstDef, heartChevronDef, heartsStickers, infinityLoopDef, lightningBoltDef, littleGreenAlienDef, loopArrowOrangeDef, loopRibbonDef, musicNoteDef, natureStickers, oceanStickers, oceanWavesDef, peachCoilDef, pinkDinoDef, puffyCloudDef, questionMarkDef, resolveConcreteColor, scallopedWaveDef, sixStarDef, skyCoilDef, solidStarDef, sparkleCrossDef, sparkleFourDef, spiderManDef, spikyGrassDef, spiralDef, splashDropsDef, squareSpiralDef, starOutlineDef, stitchDef, sunBurstDef, symbolsStickers, toSvgString, trazoCatalog, trazoCatalogByCategory, trazoCategoryOrder, triangleDef, tripleHeartSwirlDef, tripleZigzagDef, verticalZigzagDef, woodyWinkDef, xMarkDef, zigzagScribbleDef } from './svg.mjs';

interface StickerProps extends SVGProps<SVGSVGElement> {
    /** Shortcut for width and height (e.g. 120, "100px", "5rem") */
    size?: number | string;
    /** Adds a physical vinyl sticker hover peel / tilt effect @default false */
    peel?: boolean;
    /** Additional CSS class names */
    className?: string;
    /** Custom inline styles */
    style?: CSSProperties;
    /** Trazo-compatible: sticker definition */
    def?: StickerDef;
    /** Trazo-compatible: color override; "mix" or omitted uses layers */
    color?: string;
    /** Trazo-compatible: rotation in degrees */
    rotate?: number;
    /** Trazo-compatible: accessible title */
    title?: string;
    /** Legacy dynamic sticker name */
    name?: string;
}
type StickerName = "face" | "panda-bear-1" | "panda-bear-2" | "panda-garland" | "panda-sack" | "winter-doodle-4" | "xmas-character-1" | "xmas-character-4" | "forest-animal-4" | "halloween-face-3" | "monster-face-1" | "monster-face-2" | "monster-face-3" | "monster-face-7" | "monster-face-8" | "monster-face-9" | "monster-icon-1" | "monster-icon-3" | "monster-icon-5" | "halloween-sketch-4" | "halloween-prop-1" | "cute-monster-1" | "cute-monster-2" | "cute-monster-3" | "cute-monster-5" | "cute-monster-6" | "watercolor-character-1" | "watercolor-character-3" | "watercolor-character-4" | "watercolor-kid-2" | "watercolor-kid-3" | "watercolor-kid-5" | "watercolor-kid-6" | "videogame-collection-1" | "videogame-collection-2" | "videogame-set-3" | "videogame-set-4" | "watercolor-halloween-3" | "watercolor-halloween-5" | "handdrawn-kid-1" | "handdrawn-kid-3" | "handdrawn-kid-4" | "frankenstein-boy-1" | "creepy-character-2" | "creepy-character-3" | "creepy-character-4" | "samurai-boy-1" | "ninja-airbender-1" | "kimono-katana-boy-1" | "chinese-vampire-1" | "ninja-sitting-1" | "japanese-merchant-1" | "costume-kid-2" | "costume-kid-3" | "costume-kid-6" | "cute-halloween-buddy-2" | "cute-halloween-buddy-5" | "gamer-man" | "happy-halloween-3" | "happy-halloween-4" | "happy-halloween-5" | "happy-halloween-8" | "retro-basketball-1" | "retro-basketball-2" | "retro-basketball-4" | "retro-cartoon-1" | "retro-cartoon-2" | "retro-cartoon-3" | "retro-military-1" | "retro-military-2" | "retro-military-3" | "retro-military-4" | "retro-military-5" | "retro-military-6" | "retro-military-7" | "retro-military-8" | "rock-sticker-2" | "rock-sticker-3" | "rock-sticker-4" | "young-action-2" | "young-action-3" | "young-action-4" | "young-action-5" | "young-action-6" | "funny-character-3" | "funny-character-4" | "funny-character-5" | "funny-character-6" | "funny-character-7" | "funny-character-8" | "rock-sticker-5" | "rock-sticker-6" | "rock-sticker-7" | "rock-sticker-8" | "wrestler-4" | "wrestler-6" | "funny-doodle-1" | "funny-doodle-2" | "funny-doodle-3" | "funny-doodle-4" | "graffiti-tag-1" | "graffiti-tag-4" | "graffiti-tag-16" | "cute-pop-1" | "doodle-beast-1" | "doodle-beast-2" | "doodle-beast-3" | "doodle-beast-4" | "doodle-beast-5" | "doodle-beast-6" | "doodle-beast-7" | "doodle-beast-8" | "doodle-beast-9" | "pattern-monster-1" | "pattern-monster-2" | "pattern-monster-3" | "pattern-monster-4" | "pattern-monster-5" | "pattern-monster-6" | "retro-badge-1" | "retro-badge-2" | "retro-badge-3" | "retro-badge-4" | "retro-badge-5" | "retro-badge-6" | "plant-buddy-1" | "plant-buddy-2" | "plant-buddy-3" | "funny-sketch-3" | "funny-sketch-4" | "happy-doodle-1" | "happy-doodle-2" | "happy-doodle-4" | "mad-beast-1" | "mad-beast-2" | "mad-beast-3" | "mad-beast-4" | "decor-sticker-1" | "decor-sticker-2" | "decor-sticker-3" | "decor-sticker-5" | "decor-sticker-6" | "lol-fun-1" | "lol-fun-2" | "lol-fun-3" | "lol-fun-4" | "lol-fun-5" | "lol-fun-6";

interface TrazoStickerProps extends Omit<SVGProps<SVGSVGElement>, "children" | "color" | "rotate"> {
    def: StickerDef;
    size?: number | string;
    color?: string;
    rotate?: number;
    title?: string;
    peel?: boolean;
    className?: string;
    style?: CSSProperties;
}
type NamedStickerProps = Omit<TrazoStickerProps, "def">;
declare function TrazoSticker({ def, size, color, rotate, title, peel, className, style, overflow, ...props }: TrazoStickerProps): React.JSX.Element;
declare function createStickerComponent(def: StickerDef): FC<NamedStickerProps>;

declare const FlapjackOctopus: React.FC<NamedStickerProps>;
declare const CurlyArrow: React.FC<NamedStickerProps>;
declare const Spiral: React.FC<NamedStickerProps>;
declare const SquareSpiral: React.FC<NamedStickerProps>;
declare const LoopRibbon: React.FC<NamedStickerProps>;
declare const ZigzagScribble: React.FC<NamedStickerProps>;
declare const LoopArrowOrange: React.FC<NamedStickerProps>;
declare const VerticalZigzag: React.FC<NamedStickerProps>;
declare const DownArrow: React.FC<NamedStickerProps>;
declare const PeachCoil: React.FC<NamedStickerProps>;
declare const SkyCoil: React.FC<NamedStickerProps>;
declare const FlowerRed: React.FC<NamedStickerProps>;
declare const PuffyCloud: React.FC<NamedStickerProps>;
declare const FlowerYellow: React.FC<NamedStickerProps>;
declare const OceanWaves: React.FC<NamedStickerProps>;
declare const SunBurst: React.FC<NamedStickerProps>;
declare const SplashDrops: React.FC<NamedStickerProps>;
declare const TripleZigzag: React.FC<NamedStickerProps>;
declare const SpikyGrass: React.FC<NamedStickerProps>;
declare const ScallopedWave: React.FC<NamedStickerProps>;
declare const Earth: React.FC<NamedStickerProps>;
declare const CrownRays: React.FC<NamedStickerProps>;
declare const HeartBurst: React.FC<NamedStickerProps>;
declare const SixStar: React.FC<NamedStickerProps>;
declare const HeartChevron: React.FC<NamedStickerProps>;
declare const SolidStar: React.FC<NamedStickerProps>;
declare const SparkleFour: React.FC<NamedStickerProps>;
declare const SparkleCross: React.FC<NamedStickerProps>;
declare const BowtieLoop: React.FC<NamedStickerProps>;
declare const TripleHeartSwirl: React.FC<NamedStickerProps>;
declare const DoubleHearts: React.FC<NamedStickerProps>;
declare const StarOutline: React.FC<NamedStickerProps>;
declare const CrosshairBurst: React.FC<NamedStickerProps>;
declare const Diamond: React.FC<NamedStickerProps>;
declare const AngerMark: React.FC<NamedStickerProps>;
declare const Triangle: React.FC<NamedStickerProps>;
declare const CircleRing: React.FC<NamedStickerProps>;
declare const Asterisk: React.FC<NamedStickerProps>;
declare const LightningBolt: React.FC<NamedStickerProps>;
declare const QuestionMark: React.FC<NamedStickerProps>;
declare const ExclamationMark: React.FC<NamedStickerProps>;
declare const DiagonalHatch: React.FC<NamedStickerProps>;
declare const Hashtag: React.FC<NamedStickerProps>;
declare const PinkDino: React.FC<NamedStickerProps>;
declare const SpiderMan: React.FC<NamedStickerProps>;
declare const Stitch: React.FC<NamedStickerProps>;
declare const LittleGreenAlien: React.FC<NamedStickerProps>;
declare const WoodyWink: React.FC<NamedStickerProps>;
declare const InfinityLoop: React.FC<NamedStickerProps>;
declare const MusicNote: React.FC<NamedStickerProps>;
declare const XMark: React.FC<NamedStickerProps>;

declare const STICKER_MAP: Record<StickerName, React__default.FC<StickerProps>>;
interface DynamicStickerProps extends StickerProps {
    name?: StickerName;
}
declare const Sticker: React__default.FC<DynamicStickerProps>;

declare const FaceSticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PandaBear1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PandaBear2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PandaGarlandSticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PandaSackSticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WinterDoodle4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const XmasCharacter1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const XmasCharacter4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const ForestAnimal4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenFace3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace7Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace8Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace9Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterIcon1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterIcon3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterIcon5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenSketch4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenProp1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameCollection1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameCollection2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameSet3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameSet4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorHalloween3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorHalloween5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HanddrawnKid1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HanddrawnKid3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HanddrawnKid4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FrankensteinBoy1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CreepyCharacter2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CreepyCharacter3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CreepyCharacter4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const SamuraiBoy1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const NinjaAirbender1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const KimonoKatanaBoy1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const ChineseVampire1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const NinjaSitting1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const JapaneseMerchant1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteHalloweenBuddy2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteHalloweenBuddy5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const GamerManSticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HappyHalloween3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HappyHalloween4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HappyHalloween5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HappyHalloween8Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBasketball1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBasketball2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBasketball4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroCartoon1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroCartoon2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroCartoon3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroMilitary1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroMilitary2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroMilitary3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroMilitary4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroMilitary5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroMilitary6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroMilitary7Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroMilitary8Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RockSticker2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RockSticker3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RockSticker4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const YoungAction2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const YoungAction3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const YoungAction4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const YoungAction5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const YoungAction6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyCharacter3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyCharacter4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyCharacter5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyCharacter6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyCharacter7Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyCharacter8Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RockSticker5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RockSticker6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RockSticker7Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RockSticker8Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const Wrestler4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const Wrestler6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyDoodle1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyDoodle2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyDoodle3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnyDoodle4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const GraffitiTag1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const GraffitiTag4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const GraffitiTag16Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CutePop1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast7Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast8Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DoodleBeast9Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PatternMonster1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PatternMonster2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PatternMonster3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PatternMonster4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PatternMonster5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PatternMonster6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBadge1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBadge2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBadge3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBadge4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBadge5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroBadge6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PlantBuddy1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PlantBuddy2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PlantBuddy3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnySketch3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FunnySketch4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HappyDoodle1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HappyDoodle2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HappyDoodle4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MadBeast1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MadBeast2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MadBeast3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MadBeast4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DecorSticker1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DecorSticker2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DecorSticker3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DecorSticker5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const DecorSticker6Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const LolFun1Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const LolFun2Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const LolFun3Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const LolFun4Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const LolFun5Sticker: React__default.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const LolFun6Sticker: React__default.FC<StickerProps>;

export { AngerMark, Asterisk, BowtieLoop, ChineseVampire1Sticker, CircleRing, CostumeKid2Sticker, CostumeKid3Sticker, CostumeKid6Sticker, CreepyCharacter2Sticker, CreepyCharacter3Sticker, CreepyCharacter4Sticker, CrosshairBurst, CrownRays, CurlyArrow, CuteHalloweenBuddy2Sticker, CuteHalloweenBuddy5Sticker, CuteMonster1Sticker, CuteMonster2Sticker, CuteMonster3Sticker, CuteMonster5Sticker, CuteMonster6Sticker, CutePop1Sticker, DecorSticker1Sticker, DecorSticker2Sticker, DecorSticker3Sticker, DecorSticker5Sticker, DecorSticker6Sticker, DiagonalHatch, Diamond, DoodleBeast1Sticker, DoodleBeast2Sticker, DoodleBeast3Sticker, DoodleBeast4Sticker, DoodleBeast5Sticker, DoodleBeast6Sticker, DoodleBeast7Sticker, DoodleBeast8Sticker, DoodleBeast9Sticker, DoubleHearts, DownArrow, Earth, ExclamationMark, FaceSticker, FlapjackOctopus, FlowerRed, FlowerYellow, ForestAnimal4Sticker, FrankensteinBoy1Sticker, FunnyCharacter3Sticker, FunnyCharacter4Sticker, FunnyCharacter5Sticker, FunnyCharacter6Sticker, FunnyCharacter7Sticker, FunnyCharacter8Sticker, FunnyDoodle1Sticker, FunnyDoodle2Sticker, FunnyDoodle3Sticker, FunnyDoodle4Sticker, FunnySketch3Sticker, FunnySketch4Sticker, GamerManSticker, GraffitiTag16Sticker, GraffitiTag1Sticker, GraffitiTag4Sticker, HalloweenFace3Sticker, HalloweenProp1Sticker, HalloweenSketch4Sticker, HanddrawnKid1Sticker, HanddrawnKid3Sticker, HanddrawnKid4Sticker, HappyDoodle1Sticker, HappyDoodle2Sticker, HappyDoodle4Sticker, HappyHalloween3Sticker, HappyHalloween4Sticker, HappyHalloween5Sticker, HappyHalloween8Sticker, Hashtag, HeartBurst, HeartChevron, InfinityLoop, JapaneseMerchant1Sticker, KimonoKatanaBoy1Sticker, LightningBolt, LittleGreenAlien, LolFun1Sticker, LolFun2Sticker, LolFun3Sticker, LolFun4Sticker, LolFun5Sticker, LolFun6Sticker, LoopArrowOrange, LoopRibbon, MadBeast1Sticker, MadBeast2Sticker, MadBeast3Sticker, MadBeast4Sticker, MonsterFace1Sticker, MonsterFace2Sticker, MonsterFace3Sticker, MonsterFace7Sticker, MonsterFace8Sticker, MonsterFace9Sticker, MonsterIcon1Sticker, MonsterIcon3Sticker, MonsterIcon5Sticker, MusicNote, NinjaAirbender1Sticker, NinjaSitting1Sticker, OceanWaves, PandaBear1Sticker, PandaBear2Sticker, PandaGarlandSticker, PandaSackSticker, PatternMonster1Sticker, PatternMonster2Sticker, PatternMonster3Sticker, PatternMonster4Sticker, PatternMonster5Sticker, PatternMonster6Sticker, PeachCoil, PinkDino, PlantBuddy1Sticker, PlantBuddy2Sticker, PlantBuddy3Sticker, PuffyCloud, QuestionMark, RetroBadge1Sticker, RetroBadge2Sticker, RetroBadge3Sticker, RetroBadge4Sticker, RetroBadge5Sticker, RetroBadge6Sticker, RetroBasketball1Sticker, RetroBasketball2Sticker, RetroBasketball4Sticker, RetroCartoon1Sticker, RetroCartoon2Sticker, RetroCartoon3Sticker, RetroMilitary1Sticker, RetroMilitary2Sticker, RetroMilitary3Sticker, RetroMilitary4Sticker, RetroMilitary5Sticker, RetroMilitary6Sticker, RetroMilitary7Sticker, RetroMilitary8Sticker, RockSticker2Sticker, RockSticker3Sticker, RockSticker4Sticker, RockSticker5Sticker, RockSticker6Sticker, RockSticker7Sticker, RockSticker8Sticker, STICKER_MAP, SamuraiBoy1Sticker, ScallopedWave, SixStar, SkyCoil, SolidStar, SparkleCross, SparkleFour, SpiderMan, SpikyGrass, Spiral, SplashDrops, SquareSpiral, StarOutline, Sticker, StickerDef, Stitch, SunBurst, TrazoSticker, Triangle, TripleHeartSwirl, TripleZigzag, VerticalZigzag, VideogameCollection1Sticker, VideogameCollection2Sticker, VideogameSet3Sticker, VideogameSet4Sticker, WatercolorCharacter1Sticker, WatercolorCharacter3Sticker, WatercolorCharacter4Sticker, WatercolorHalloween3Sticker, WatercolorHalloween5Sticker, WatercolorKid2Sticker, WatercolorKid3Sticker, WatercolorKid5Sticker, WatercolorKid6Sticker, WinterDoodle4Sticker, WoodyWink, Wrestler4Sticker, Wrestler6Sticker, XMark, XmasCharacter1Sticker, XmasCharacter4Sticker, YoungAction2Sticker, YoungAction3Sticker, YoungAction4Sticker, YoungAction5Sticker, YoungAction6Sticker, ZigzagScribble, createStickerComponent, Sticker as default };
export type { DynamicStickerProps, NamedStickerProps, StickerName, StickerProps, TrazoStickerProps };
