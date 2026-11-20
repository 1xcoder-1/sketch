"use client";

import React from "react";
import type { StickerProps, StickerName } from "../types";
import { FaceSticker } from "../stickers/FaceSticker";
import { PandaBear1Sticker } from "../stickers/PandaBear1Sticker";
import { PandaBear2Sticker } from "../stickers/PandaBear2Sticker";
import { PandaGarlandSticker } from "../stickers/PandaGarlandSticker";
import { PandaSackSticker } from "../stickers/PandaSackSticker";
import { WinterDoodle4Sticker } from "../stickers/WinterDoodle4Sticker";
import { XmasCharacter1Sticker } from "../stickers/XmasCharacter1Sticker";
import { XmasCharacter4Sticker } from "../stickers/XmasCharacter4Sticker";
import { ForestAnimal4Sticker } from "../stickers/ForestAnimal4Sticker";
import { HalloweenFace3Sticker } from "../stickers/HalloweenFace3Sticker";
import { MonsterFace1Sticker } from "../stickers/MonsterFace1Sticker";
import { MonsterFace2Sticker } from "../stickers/MonsterFace2Sticker";
import { MonsterFace3Sticker } from "../stickers/MonsterFace3Sticker";
import { MonsterFace4Sticker } from "../stickers/MonsterFace4Sticker";
import { MonsterFace5Sticker } from "../stickers/MonsterFace5Sticker";
import { MonsterFace7Sticker } from "../stickers/MonsterFace7Sticker";
import { MonsterFace8Sticker } from "../stickers/MonsterFace8Sticker";
import { MonsterFace9Sticker } from "../stickers/MonsterFace9Sticker";
import { MonsterIcon1Sticker } from "../stickers/MonsterIcon1Sticker";
import { MonsterIcon3Sticker } from "../stickers/MonsterIcon3Sticker";
import { MonsterIcon4Sticker } from "../stickers/MonsterIcon4Sticker";
import { MonsterIcon5Sticker } from "../stickers/MonsterIcon5Sticker";
import { HalloweenSketch1Sticker } from "../stickers/HalloweenSketch1Sticker";
import { HalloweenSketch2Sticker } from "../stickers/HalloweenSketch2Sticker";
import { HalloweenSketch3Sticker } from "../stickers/HalloweenSketch3Sticker";
import { HalloweenSketch4Sticker } from "../stickers/HalloweenSketch4Sticker";
import { HalloweenProp1Sticker } from "../stickers/HalloweenProp1Sticker";
import { HalloweenProp2Sticker } from "../stickers/HalloweenProp2Sticker";
import { HalloweenProp3Sticker } from "../stickers/HalloweenProp3Sticker";
import { CuteMonster1Sticker } from "../stickers/CuteMonster1Sticker";
import { CuteMonster2Sticker } from "../stickers/CuteMonster2Sticker";
import { CuteMonster3Sticker } from "../stickers/CuteMonster3Sticker";
import { CuteMonster4Sticker } from "../stickers/CuteMonster4Sticker";
import { CuteMonster5Sticker } from "../stickers/CuteMonster5Sticker";
import { CuteMonster6Sticker } from "../stickers/CuteMonster6Sticker";
import { WatercolorCharacter1Sticker } from "../stickers/WatercolorCharacter1Sticker";
import { WatercolorCharacter2Sticker } from "../stickers/WatercolorCharacter2Sticker";
import { WatercolorCharacter3Sticker } from "../stickers/WatercolorCharacter3Sticker";
import { WatercolorCharacter4Sticker } from "../stickers/WatercolorCharacter4Sticker";
import { WatercolorCharacter5Sticker } from "../stickers/WatercolorCharacter5Sticker";
import { WatercolorCharacter6Sticker } from "../stickers/WatercolorCharacter6Sticker";
import { WatercolorKid1Sticker } from "../stickers/WatercolorKid1Sticker";
import { WatercolorKid2Sticker } from "../stickers/WatercolorKid2Sticker";
import { WatercolorKid3Sticker } from "../stickers/WatercolorKid3Sticker";
import { WatercolorKid4Sticker } from "../stickers/WatercolorKid4Sticker";
import { WatercolorKid5Sticker } from "../stickers/WatercolorKid5Sticker";
import { WatercolorKid6Sticker } from "../stickers/WatercolorKid6Sticker";
import { VideogameCollection1Sticker } from "../stickers/VideogameCollection1Sticker";
import { VideogameCollection2Sticker } from "../stickers/VideogameCollection2Sticker";
import { VideogameCollection3Sticker } from "../stickers/VideogameCollection3Sticker";
import { VideogameCollection4Sticker } from "../stickers/VideogameCollection4Sticker";
import { VideogameCollection5Sticker } from "../stickers/VideogameCollection5Sticker";
import { VideogameCollection6Sticker } from "../stickers/VideogameCollection6Sticker";
import { VideogameSet1Sticker } from "../stickers/VideogameSet1Sticker";
import { VideogameSet2Sticker } from "../stickers/VideogameSet2Sticker";
import { VideogameSet3Sticker } from "../stickers/VideogameSet3Sticker";
import { VideogameSet4Sticker } from "../stickers/VideogameSet4Sticker";
import { VideogameSet5Sticker } from "../stickers/VideogameSet5Sticker";
import { VideogameSet6Sticker } from "../stickers/VideogameSet6Sticker";
import { WatercolorHalloween1Sticker } from "../stickers/WatercolorHalloween1Sticker";
import { WatercolorHalloween2Sticker } from "../stickers/WatercolorHalloween2Sticker";
import { WatercolorHalloween3Sticker } from "../stickers/WatercolorHalloween3Sticker";
import { WatercolorHalloween4Sticker } from "../stickers/WatercolorHalloween4Sticker";
import { WatercolorHalloween5Sticker } from "../stickers/WatercolorHalloween5Sticker";
import { WatercolorHalloween6Sticker } from "../stickers/WatercolorHalloween6Sticker";
import { HanddrawnKid1Sticker } from "../stickers/HanddrawnKid1Sticker";
import { HanddrawnKid2Sticker } from "../stickers/HanddrawnKid2Sticker";
import { HanddrawnKid3Sticker } from "../stickers/HanddrawnKid3Sticker";
import { HanddrawnKid4Sticker } from "../stickers/HanddrawnKid4Sticker";
import { FrankensteinBoy1Sticker } from "../stickers/FrankensteinBoy1Sticker";
import { CreepyCharacter1Sticker } from "../stickers/CreepyCharacter1Sticker";
import { CreepyCharacter2Sticker } from "../stickers/CreepyCharacter2Sticker";
import { CreepyCharacter3Sticker } from "../stickers/CreepyCharacter3Sticker";
import { CreepyCharacter4Sticker } from "../stickers/CreepyCharacter4Sticker";
import { SamuraiBoy1Sticker } from "../stickers/SamuraiBoy1Sticker";
import { NinjaAirbender1Sticker } from "../stickers/NinjaAirbender1Sticker";
import { KimonoKatanaBoy1Sticker } from "../stickers/KimonoKatanaBoy1Sticker";
import { ChineseVampire1Sticker } from "../stickers/ChineseVampire1Sticker";
import { NinjaSitting1Sticker } from "../stickers/NinjaSitting1Sticker";
import { JapaneseMerchant1Sticker } from "../stickers/JapaneseMerchant1Sticker";
import { RetroGameHero1Sticker } from "../stickers/RetroGameHero1Sticker";
import { RetroGameHero2Sticker } from "../stickers/RetroGameHero2Sticker";
import { RetroGameHero3Sticker } from "../stickers/RetroGameHero3Sticker";
import { RetroGameHero4Sticker } from "../stickers/RetroGameHero4Sticker";
import { RetroGameHero5Sticker } from "../stickers/RetroGameHero5Sticker";
import { CostumeKid1Sticker } from "../stickers/CostumeKid1Sticker";
import { CostumeKid2Sticker } from "../stickers/CostumeKid2Sticker";
import { CostumeKid3Sticker } from "../stickers/CostumeKid3Sticker";
import { CostumeKid4Sticker } from "../stickers/CostumeKid4Sticker";
import { CostumeKid5Sticker } from "../stickers/CostumeKid5Sticker";
import { CostumeKid6Sticker } from "../stickers/CostumeKid6Sticker";
import { CuteHalloweenBuddy1Sticker } from "../stickers/CuteHalloweenBuddy1Sticker";
import { CuteHalloweenBuddy2Sticker } from "../stickers/CuteHalloweenBuddy2Sticker";
import { CuteHalloweenBuddy3Sticker } from "../stickers/CuteHalloweenBuddy3Sticker";
import { CuteHalloweenBuddy4Sticker } from "../stickers/CuteHalloweenBuddy4Sticker";
import { CuteHalloweenBuddy5Sticker } from "../stickers/CuteHalloweenBuddy5Sticker";
import { CuteHalloweenBuddy6Sticker } from "../stickers/CuteHalloweenBuddy6Sticker";

export const STICKER_MAP: Record<StickerName, React.FC<StickerProps>> = {
  "face": FaceSticker,
  "panda-bear-1": PandaBear1Sticker,
  "panda-bear-2": PandaBear2Sticker,
  "panda-garland": PandaGarlandSticker,
  "panda-sack": PandaSackSticker,
  "winter-doodle-4": WinterDoodle4Sticker,
  "xmas-character-1": XmasCharacter1Sticker,
  "xmas-character-4": XmasCharacter4Sticker,
  "forest-animal-4": ForestAnimal4Sticker,
  "halloween-face-3": HalloweenFace3Sticker,
  "monster-face-1": MonsterFace1Sticker,
  "monster-face-2": MonsterFace2Sticker,
  "monster-face-3": MonsterFace3Sticker,
  "monster-face-4": MonsterFace4Sticker,
  "monster-face-5": MonsterFace5Sticker,
  "monster-face-7": MonsterFace7Sticker,
  "monster-face-8": MonsterFace8Sticker,
  "monster-face-9": MonsterFace9Sticker,
  "monster-icon-1": MonsterIcon1Sticker,
  "monster-icon-3": MonsterIcon3Sticker,
  "monster-icon-4": MonsterIcon4Sticker,
  "monster-icon-5": MonsterIcon5Sticker,
  "halloween-sketch-1": HalloweenSketch1Sticker,
  "halloween-sketch-2": HalloweenSketch2Sticker,
  "halloween-sketch-3": HalloweenSketch3Sticker,
  "halloween-sketch-4": HalloweenSketch4Sticker,
  "halloween-prop-1": HalloweenProp1Sticker,
  "halloween-prop-2": HalloweenProp2Sticker,
  "halloween-prop-3": HalloweenProp3Sticker,
  "cute-monster-1": CuteMonster1Sticker,
  "cute-monster-2": CuteMonster2Sticker,
  "cute-monster-3": CuteMonster3Sticker,
  "cute-monster-4": CuteMonster4Sticker,
  "cute-monster-5": CuteMonster5Sticker,
  "cute-monster-6": CuteMonster6Sticker,
  "watercolor-character-1": WatercolorCharacter1Sticker,
  "watercolor-character-2": WatercolorCharacter2Sticker,
  "watercolor-character-3": WatercolorCharacter3Sticker,
  "watercolor-character-4": WatercolorCharacter4Sticker,
  "watercolor-character-5": WatercolorCharacter5Sticker,
  "watercolor-character-6": WatercolorCharacter6Sticker,
  "watercolor-kid-1": WatercolorKid1Sticker,
  "watercolor-kid-2": WatercolorKid2Sticker,
  "watercolor-kid-3": WatercolorKid3Sticker,
  "watercolor-kid-4": WatercolorKid4Sticker,
  "watercolor-kid-5": WatercolorKid5Sticker,
  "watercolor-kid-6": WatercolorKid6Sticker,
  "videogame-collection-1": VideogameCollection1Sticker,
  "videogame-collection-2": VideogameCollection2Sticker,
  "videogame-collection-3": VideogameCollection3Sticker,
  "videogame-collection-4": VideogameCollection4Sticker,
  "videogame-collection-5": VideogameCollection5Sticker,
  "videogame-collection-6": VideogameCollection6Sticker,
  "videogame-set-1": VideogameSet1Sticker,
  "videogame-set-2": VideogameSet2Sticker,
  "videogame-set-3": VideogameSet3Sticker,
  "videogame-set-4": VideogameSet4Sticker,
  "videogame-set-5": VideogameSet5Sticker,
  "videogame-set-6": VideogameSet6Sticker,
  "watercolor-halloween-1": WatercolorHalloween1Sticker,
  "watercolor-halloween-2": WatercolorHalloween2Sticker,
  "watercolor-halloween-3": WatercolorHalloween3Sticker,
  "watercolor-halloween-4": WatercolorHalloween4Sticker,
  "watercolor-halloween-5": WatercolorHalloween5Sticker,
  "watercolor-halloween-6": WatercolorHalloween6Sticker,
  "handdrawn-kid-1": HanddrawnKid1Sticker,
  "handdrawn-kid-2": HanddrawnKid2Sticker,
  "handdrawn-kid-3": HanddrawnKid3Sticker,
  "handdrawn-kid-4": HanddrawnKid4Sticker,
  "frankenstein-boy-1": FrankensteinBoy1Sticker,
  "creepy-character-1": CreepyCharacter1Sticker,
  "creepy-character-2": CreepyCharacter2Sticker,
  "creepy-character-3": CreepyCharacter3Sticker,
  "creepy-character-4": CreepyCharacter4Sticker,
  "samurai-boy-1": SamuraiBoy1Sticker,
  "ninja-airbender-1": NinjaAirbender1Sticker,
  "kimono-katana-boy-1": KimonoKatanaBoy1Sticker,
  "chinese-vampire-1": ChineseVampire1Sticker,
  "ninja-sitting-1": NinjaSitting1Sticker,
  "japanese-merchant-1": JapaneseMerchant1Sticker,
  "retro-game-hero-1": RetroGameHero1Sticker,
  "retro-game-hero-2": RetroGameHero2Sticker,
  "retro-game-hero-3": RetroGameHero3Sticker,
  "retro-game-hero-4": RetroGameHero4Sticker,
  "retro-game-hero-5": RetroGameHero5Sticker,
  "costume-kid-1": CostumeKid1Sticker,
  "costume-kid-2": CostumeKid2Sticker,
  "costume-kid-3": CostumeKid3Sticker,
  "costume-kid-4": CostumeKid4Sticker,
  "costume-kid-5": CostumeKid5Sticker,
  "costume-kid-6": CostumeKid6Sticker,
  "cute-halloween-buddy-1": CuteHalloweenBuddy1Sticker,
  "cute-halloween-buddy-2": CuteHalloweenBuddy2Sticker,
  "cute-halloween-buddy-3": CuteHalloweenBuddy3Sticker,
  "cute-halloween-buddy-4": CuteHalloweenBuddy4Sticker,
  "cute-halloween-buddy-5": CuteHalloweenBuddy5Sticker,
  "cute-halloween-buddy-6": CuteHalloweenBuddy6Sticker,
};

export interface DynamicStickerProps extends StickerProps {
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
export const Sticker: React.FC<DynamicStickerProps> = ({ name, ...props }) => {
  const Component = STICKER_MAP[name];
  if (!Component) {
    console.warn(`[stickers-react] Unknown sticker name: "${name}". Available: ${Object.keys(STICKER_MAP).join(", ")}`);
    return null;
  }
  return <Component {...props} />;
};

export default Sticker;
