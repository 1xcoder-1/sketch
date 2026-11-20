import React, { SVGProps, CSSProperties } from 'react';

interface StickerProps extends SVGProps<SVGSVGElement> {
    /** Shortcut for width and height (e.g. 120, "100px", "5rem") */
    size?: number | string;
    /** Adds a physical vinyl sticker hover peel / tilt effect @default false */
    peel?: boolean;
    /** Additional CSS class names */
    className?: string;
    /** Custom inline styles */
    style?: CSSProperties;
}
type StickerName = "face" | "panda-bear-1" | "panda-bear-2" | "panda-garland" | "panda-sack" | "winter-doodle-4" | "xmas-character-1" | "xmas-character-4" | "forest-animal-4" | "halloween-face-3" | "monster-face-1" | "monster-face-2" | "monster-face-3" | "monster-face-4" | "monster-face-5" | "monster-face-7" | "monster-face-8" | "monster-face-9" | "monster-icon-1" | "monster-icon-3" | "monster-icon-4" | "monster-icon-5" | "halloween-sketch-1" | "halloween-sketch-2" | "halloween-sketch-3" | "halloween-sketch-4" | "halloween-prop-1" | "halloween-prop-2" | "halloween-prop-3" | "cute-monster-1" | "cute-monster-2" | "cute-monster-3" | "cute-monster-4" | "cute-monster-5" | "cute-monster-6" | "watercolor-character-1" | "watercolor-character-2" | "watercolor-character-3" | "watercolor-character-4" | "watercolor-character-5" | "watercolor-character-6" | "watercolor-kid-1" | "watercolor-kid-2" | "watercolor-kid-3" | "watercolor-kid-4" | "watercolor-kid-5" | "watercolor-kid-6" | "videogame-collection-1" | "videogame-collection-2" | "videogame-collection-3" | "videogame-collection-4" | "videogame-collection-5" | "videogame-collection-6" | "videogame-set-1" | "videogame-set-2" | "videogame-set-3" | "videogame-set-4" | "videogame-set-5" | "videogame-set-6" | "watercolor-halloween-1" | "watercolor-halloween-2" | "watercolor-halloween-3" | "watercolor-halloween-4" | "watercolor-halloween-5" | "watercolor-halloween-6" | "handdrawn-kid-1" | "handdrawn-kid-2" | "handdrawn-kid-3" | "handdrawn-kid-4" | "frankenstein-boy-1" | "creepy-character-1" | "creepy-character-2" | "creepy-character-3" | "creepy-character-4" | "samurai-boy-1" | "ninja-airbender-1" | "kimono-katana-boy-1" | "chinese-vampire-1" | "ninja-sitting-1" | "japanese-merchant-1" | "retro-game-hero-1" | "retro-game-hero-2" | "retro-game-hero-3" | "retro-game-hero-4" | "retro-game-hero-5" | "costume-kid-1" | "costume-kid-2" | "costume-kid-3" | "costume-kid-4" | "costume-kid-5" | "costume-kid-6" | "cute-halloween-buddy-1" | "cute-halloween-buddy-2" | "cute-halloween-buddy-3" | "cute-halloween-buddy-4" | "cute-halloween-buddy-5" | "cute-halloween-buddy-6";

declare const STICKER_MAP: Record<StickerName, React.FC<StickerProps>>;
interface DynamicStickerProps extends StickerProps {
    name: StickerName;
}
/**
 * Dynamic Sticker component that renders any sticker by name.
 *
 * @example
 * ```tsx
 * import { Sticker } from "stick-it-up";
 *
 * <Sticker name="face" size={130} peel />
 * ```
 */
declare const Sticker: React.FC<DynamicStickerProps>;

declare const FaceSticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PandaBear1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PandaBear2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PandaGarlandSticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const PandaSackSticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WinterDoodle4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const XmasCharacter1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const XmasCharacter4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const ForestAnimal4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenFace3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace7Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace8Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterFace9Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterIcon1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterIcon3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterIcon4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const MonsterIcon5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenSketch1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenSketch2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenSketch3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenSketch4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenProp1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenProp2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HalloweenProp3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteMonster6Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorCharacter6Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorKid6Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameCollection1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameCollection2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameCollection3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameCollection4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameCollection5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameCollection6Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameSet1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameSet2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameSet3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameSet4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameSet5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const VideogameSet6Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorHalloween1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorHalloween2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorHalloween3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorHalloween4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorHalloween5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const WatercolorHalloween6Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HanddrawnKid1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HanddrawnKid2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HanddrawnKid3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const HanddrawnKid4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const FrankensteinBoy1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CreepyCharacter1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CreepyCharacter2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CreepyCharacter3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CreepyCharacter4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const SamuraiBoy1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const NinjaAirbender1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const KimonoKatanaBoy1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const ChineseVampire1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const NinjaSitting1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const JapaneseMerchant1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroGameHero1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroGameHero2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroGameHero3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroGameHero4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const RetroGameHero5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CostumeKid6Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteHalloweenBuddy1Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteHalloweenBuddy2Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteHalloweenBuddy3Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteHalloweenBuddy4Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteHalloweenBuddy5Sticker: React.FC<StickerProps>;

/** Static editable vector sticker traced from the source artwork. No animation. */
declare const CuteHalloweenBuddy6Sticker: React.FC<StickerProps>;

export { ChineseVampire1Sticker, CostumeKid1Sticker, CostumeKid2Sticker, CostumeKid3Sticker, CostumeKid4Sticker, CostumeKid5Sticker, CostumeKid6Sticker, CreepyCharacter1Sticker, CreepyCharacter2Sticker, CreepyCharacter3Sticker, CreepyCharacter4Sticker, CuteHalloweenBuddy1Sticker, CuteHalloweenBuddy2Sticker, CuteHalloweenBuddy3Sticker, CuteHalloweenBuddy4Sticker, CuteHalloweenBuddy5Sticker, CuteHalloweenBuddy6Sticker, CuteMonster1Sticker, CuteMonster2Sticker, CuteMonster3Sticker, CuteMonster4Sticker, CuteMonster5Sticker, CuteMonster6Sticker, FaceSticker, ForestAnimal4Sticker, FrankensteinBoy1Sticker, HalloweenFace3Sticker, HalloweenProp1Sticker, HalloweenProp2Sticker, HalloweenProp3Sticker, HalloweenSketch1Sticker, HalloweenSketch2Sticker, HalloweenSketch3Sticker, HalloweenSketch4Sticker, HanddrawnKid1Sticker, HanddrawnKid2Sticker, HanddrawnKid3Sticker, HanddrawnKid4Sticker, JapaneseMerchant1Sticker, KimonoKatanaBoy1Sticker, MonsterFace1Sticker, MonsterFace2Sticker, MonsterFace3Sticker, MonsterFace4Sticker, MonsterFace5Sticker, MonsterFace7Sticker, MonsterFace8Sticker, MonsterFace9Sticker, MonsterIcon1Sticker, MonsterIcon3Sticker, MonsterIcon4Sticker, MonsterIcon5Sticker, NinjaAirbender1Sticker, NinjaSitting1Sticker, PandaBear1Sticker, PandaBear2Sticker, PandaGarlandSticker, PandaSackSticker, RetroGameHero1Sticker, RetroGameHero2Sticker, RetroGameHero3Sticker, RetroGameHero4Sticker, RetroGameHero5Sticker, STICKER_MAP, SamuraiBoy1Sticker, Sticker, VideogameCollection1Sticker, VideogameCollection2Sticker, VideogameCollection3Sticker, VideogameCollection4Sticker, VideogameCollection5Sticker, VideogameCollection6Sticker, VideogameSet1Sticker, VideogameSet2Sticker, VideogameSet3Sticker, VideogameSet4Sticker, VideogameSet5Sticker, VideogameSet6Sticker, WatercolorCharacter1Sticker, WatercolorCharacter2Sticker, WatercolorCharacter3Sticker, WatercolorCharacter4Sticker, WatercolorCharacter5Sticker, WatercolorCharacter6Sticker, WatercolorHalloween1Sticker, WatercolorHalloween2Sticker, WatercolorHalloween3Sticker, WatercolorHalloween4Sticker, WatercolorHalloween5Sticker, WatercolorHalloween6Sticker, WatercolorKid1Sticker, WatercolorKid2Sticker, WatercolorKid3Sticker, WatercolorKid4Sticker, WatercolorKid5Sticker, WatercolorKid6Sticker, WinterDoodle4Sticker, XmasCharacter1Sticker, XmasCharacter4Sticker, Sticker as default };
export type { DynamicStickerProps, StickerName, StickerProps };
