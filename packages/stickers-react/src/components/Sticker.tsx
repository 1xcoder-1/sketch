"use client";

import React from "react";
import type { StickerProps, StickerName } from "../types";
import { TrazoSticker } from "../trazo/scribble";
import { findSticker } from "../trazo/svg";
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
import { MonsterFace7Sticker } from "../stickers/MonsterFace7Sticker";
import { MonsterFace8Sticker } from "../stickers/MonsterFace8Sticker";
import { MonsterFace9Sticker } from "../stickers/MonsterFace9Sticker";
import { MonsterIcon1Sticker } from "../stickers/MonsterIcon1Sticker";
import { MonsterIcon3Sticker } from "../stickers/MonsterIcon3Sticker";
import { MonsterIcon5Sticker } from "../stickers/MonsterIcon5Sticker";
import { HalloweenSketch4Sticker } from "../stickers/HalloweenSketch4Sticker";
import { HalloweenProp1Sticker } from "../stickers/HalloweenProp1Sticker";
import { CuteMonster1Sticker } from "../stickers/CuteMonster1Sticker";
import { CuteMonster2Sticker } from "../stickers/CuteMonster2Sticker";
import { CuteMonster3Sticker } from "../stickers/CuteMonster3Sticker";
import { CuteMonster5Sticker } from "../stickers/CuteMonster5Sticker";
import { CuteMonster6Sticker } from "../stickers/CuteMonster6Sticker";
import { WatercolorCharacter1Sticker } from "../stickers/WatercolorCharacter1Sticker";
import { WatercolorCharacter3Sticker } from "../stickers/WatercolorCharacter3Sticker";
import { WatercolorCharacter4Sticker } from "../stickers/WatercolorCharacter4Sticker";
import { WatercolorKid2Sticker } from "../stickers/WatercolorKid2Sticker";
import { WatercolorKid3Sticker } from "../stickers/WatercolorKid3Sticker";
import { WatercolorKid5Sticker } from "../stickers/WatercolorKid5Sticker";
import { WatercolorKid6Sticker } from "../stickers/WatercolorKid6Sticker";
import { VideogameCollection1Sticker } from "../stickers/VideogameCollection1Sticker";
import { VideogameCollection2Sticker } from "../stickers/VideogameCollection2Sticker";
import { VideogameSet3Sticker } from "../stickers/VideogameSet3Sticker";
import { VideogameSet4Sticker } from "../stickers/VideogameSet4Sticker";
import { WatercolorHalloween3Sticker } from "../stickers/WatercolorHalloween3Sticker";
import { WatercolorHalloween5Sticker } from "../stickers/WatercolorHalloween5Sticker";
import { HanddrawnKid1Sticker } from "../stickers/HanddrawnKid1Sticker";
import { HanddrawnKid3Sticker } from "../stickers/HanddrawnKid3Sticker";
import { HanddrawnKid4Sticker } from "../stickers/HanddrawnKid4Sticker";
import { FrankensteinBoy1Sticker } from "../stickers/FrankensteinBoy1Sticker";
import { CreepyCharacter2Sticker } from "../stickers/CreepyCharacter2Sticker";
import { CreepyCharacter3Sticker } from "../stickers/CreepyCharacter3Sticker";
import { CreepyCharacter4Sticker } from "../stickers/CreepyCharacter4Sticker";
import { SamuraiBoy1Sticker } from "../stickers/SamuraiBoy1Sticker";
import { NinjaAirbender1Sticker } from "../stickers/NinjaAirbender1Sticker";
import { KimonoKatanaBoy1Sticker } from "../stickers/KimonoKatanaBoy1Sticker";
import { ChineseVampire1Sticker } from "../stickers/ChineseVampire1Sticker";
import { NinjaSitting1Sticker } from "../stickers/NinjaSitting1Sticker";
import { JapaneseMerchant1Sticker } from "../stickers/JapaneseMerchant1Sticker";
import { CostumeKid2Sticker } from "../stickers/CostumeKid2Sticker";
import { CostumeKid3Sticker } from "../stickers/CostumeKid3Sticker";
import { CostumeKid6Sticker } from "../stickers/CostumeKid6Sticker";
import { CuteHalloweenBuddy2Sticker } from "../stickers/CuteHalloweenBuddy2Sticker";
import { CuteHalloweenBuddy5Sticker } from "../stickers/CuteHalloweenBuddy5Sticker";
import { GamerManSticker } from "../stickers/GamerManSticker";
import { HappyHalloween3Sticker } from "../stickers/HappyHalloween3Sticker";
import { HappyHalloween4Sticker } from "../stickers/HappyHalloween4Sticker";
import { HappyHalloween5Sticker } from "../stickers/HappyHalloween5Sticker";
import { HappyHalloween8Sticker } from "../stickers/HappyHalloween8Sticker";
import { RetroBasketball1Sticker } from "../stickers/RetroBasketball1Sticker";
import { RetroBasketball2Sticker } from "../stickers/RetroBasketball2Sticker";
import { RetroBasketball4Sticker } from "../stickers/RetroBasketball4Sticker";
import { RetroCartoon1Sticker } from "../stickers/RetroCartoon1Sticker";
import { RetroCartoon2Sticker } from "../stickers/RetroCartoon2Sticker";
import { RetroCartoon3Sticker } from "../stickers/RetroCartoon3Sticker";
import { RetroMilitary1Sticker } from "../stickers/RetroMilitary1Sticker";
import { RetroMilitary2Sticker } from "../stickers/RetroMilitary2Sticker";
import { RetroMilitary3Sticker } from "../stickers/RetroMilitary3Sticker";
import { RetroMilitary4Sticker } from "../stickers/RetroMilitary4Sticker";
import { RetroMilitary5Sticker } from "../stickers/RetroMilitary5Sticker";
import { RetroMilitary6Sticker } from "../stickers/RetroMilitary6Sticker";
import { RetroMilitary7Sticker } from "../stickers/RetroMilitary7Sticker";
import { RetroMilitary8Sticker } from "../stickers/RetroMilitary8Sticker";
import { RockSticker2Sticker } from "../stickers/RockSticker2Sticker";
import { RockSticker3Sticker } from "../stickers/RockSticker3Sticker";
import { RockSticker4Sticker } from "../stickers/RockSticker4Sticker";
import { YoungAction2Sticker } from "../stickers/YoungAction2Sticker";
import { YoungAction3Sticker } from "../stickers/YoungAction3Sticker";
import { YoungAction4Sticker } from "../stickers/YoungAction4Sticker";
import { YoungAction5Sticker } from "../stickers/YoungAction5Sticker";
import { YoungAction6Sticker } from "../stickers/YoungAction6Sticker";
import { FunnyCharacter3Sticker } from "../stickers/FunnyCharacter3Sticker";
import { FunnyCharacter4Sticker } from "../stickers/FunnyCharacter4Sticker";
import { FunnyCharacter5Sticker } from "../stickers/FunnyCharacter5Sticker";
import { FunnyCharacter6Sticker } from "../stickers/FunnyCharacter6Sticker";
import { FunnyCharacter7Sticker } from "../stickers/FunnyCharacter7Sticker";
import { FunnyCharacter8Sticker } from "../stickers/FunnyCharacter8Sticker";
import { RockSticker5Sticker } from "../stickers/RockSticker5Sticker";
import { RockSticker6Sticker } from "../stickers/RockSticker6Sticker";
import { RockSticker7Sticker } from "../stickers/RockSticker7Sticker";
import { RockSticker8Sticker } from "../stickers/RockSticker8Sticker";
import { Wrestler4Sticker } from "../stickers/Wrestler4Sticker";
import { Wrestler6Sticker } from "../stickers/Wrestler6Sticker";
import { FunnyDoodle1Sticker } from "../stickers/FunnyDoodle1Sticker";
import { FunnyDoodle2Sticker } from "../stickers/FunnyDoodle2Sticker";
import { FunnyDoodle3Sticker } from "../stickers/FunnyDoodle3Sticker";
import { FunnyDoodle4Sticker } from "../stickers/FunnyDoodle4Sticker";
import { GraffitiTag1Sticker } from "../stickers/GraffitiTag1Sticker";
import { GraffitiTag4Sticker } from "../stickers/GraffitiTag4Sticker";
import { GraffitiTag16Sticker } from "../stickers/GraffitiTag16Sticker";
import { CutePop1Sticker } from "../stickers/CutePop1Sticker";
import { DoodleBeast1Sticker } from "../stickers/DoodleBeast1Sticker";
import { DoodleBeast2Sticker } from "../stickers/DoodleBeast2Sticker";
import { DoodleBeast3Sticker } from "../stickers/DoodleBeast3Sticker";
import { DoodleBeast4Sticker } from "../stickers/DoodleBeast4Sticker";
import { DoodleBeast5Sticker } from "../stickers/DoodleBeast5Sticker";
import { DoodleBeast6Sticker } from "../stickers/DoodleBeast6Sticker";
import { DoodleBeast7Sticker } from "../stickers/DoodleBeast7Sticker";
import { DoodleBeast8Sticker } from "../stickers/DoodleBeast8Sticker";
import { DoodleBeast9Sticker } from "../stickers/DoodleBeast9Sticker";
import { PatternMonster1Sticker } from "../stickers/PatternMonster1Sticker";
import { PatternMonster2Sticker } from "../stickers/PatternMonster2Sticker";
import { PatternMonster3Sticker } from "../stickers/PatternMonster3Sticker";
import { PatternMonster4Sticker } from "../stickers/PatternMonster4Sticker";
import { PatternMonster5Sticker } from "../stickers/PatternMonster5Sticker";
import { PatternMonster6Sticker } from "../stickers/PatternMonster6Sticker";
import { RetroBadge1Sticker } from "../stickers/RetroBadge1Sticker";
import { RetroBadge2Sticker } from "../stickers/RetroBadge2Sticker";
import { RetroBadge3Sticker } from "../stickers/RetroBadge3Sticker";
import { RetroBadge4Sticker } from "../stickers/RetroBadge4Sticker";
import { RetroBadge5Sticker } from "../stickers/RetroBadge5Sticker";
import { RetroBadge6Sticker } from "../stickers/RetroBadge6Sticker";
import { PlantBuddy1Sticker } from "../stickers/PlantBuddy1Sticker";
import { PlantBuddy2Sticker } from "../stickers/PlantBuddy2Sticker";
import { PlantBuddy3Sticker } from "../stickers/PlantBuddy3Sticker";
import { FunnySketch3Sticker } from "../stickers/FunnySketch3Sticker";
import { FunnySketch4Sticker } from "../stickers/FunnySketch4Sticker";
import { HappyDoodle1Sticker } from "../stickers/HappyDoodle1Sticker";
import { HappyDoodle2Sticker } from "../stickers/HappyDoodle2Sticker";
import { HappyDoodle4Sticker } from "../stickers/HappyDoodle4Sticker";
import { MadBeast1Sticker } from "../stickers/MadBeast1Sticker";
import { MadBeast2Sticker } from "../stickers/MadBeast2Sticker";
import { MadBeast3Sticker } from "../stickers/MadBeast3Sticker";
import { MadBeast4Sticker } from "../stickers/MadBeast4Sticker";
import { DecorSticker1Sticker } from "../stickers/DecorSticker1Sticker";
import { DecorSticker2Sticker } from "../stickers/DecorSticker2Sticker";
import { DecorSticker3Sticker } from "../stickers/DecorSticker3Sticker";
import { DecorSticker5Sticker } from "../stickers/DecorSticker5Sticker";
import { DecorSticker6Sticker } from "../stickers/DecorSticker6Sticker";
import { LolFun1Sticker } from "../stickers/LolFun1Sticker";
import { LolFun2Sticker } from "../stickers/LolFun2Sticker";
import { LolFun3Sticker } from "../stickers/LolFun3Sticker";
import { LolFun4Sticker } from "../stickers/LolFun4Sticker";
import { LolFun5Sticker } from "../stickers/LolFun5Sticker";
import { LolFun6Sticker } from "../stickers/LolFun6Sticker";

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
  "monster-face-7": MonsterFace7Sticker,
  "monster-face-8": MonsterFace8Sticker,
  "monster-face-9": MonsterFace9Sticker,
  "monster-icon-1": MonsterIcon1Sticker,
  "monster-icon-3": MonsterIcon3Sticker,
  "monster-icon-5": MonsterIcon5Sticker,
  "halloween-sketch-4": HalloweenSketch4Sticker,
  "halloween-prop-1": HalloweenProp1Sticker,
  "cute-monster-1": CuteMonster1Sticker,
  "cute-monster-2": CuteMonster2Sticker,
  "cute-monster-3": CuteMonster3Sticker,
  "cute-monster-5": CuteMonster5Sticker,
  "cute-monster-6": CuteMonster6Sticker,
  "watercolor-character-1": WatercolorCharacter1Sticker,
  "watercolor-character-3": WatercolorCharacter3Sticker,
  "watercolor-character-4": WatercolorCharacter4Sticker,
  "watercolor-kid-2": WatercolorKid2Sticker,
  "watercolor-kid-3": WatercolorKid3Sticker,
  "watercolor-kid-5": WatercolorKid5Sticker,
  "watercolor-kid-6": WatercolorKid6Sticker,
  "videogame-collection-1": VideogameCollection1Sticker,
  "videogame-collection-2": VideogameCollection2Sticker,
  "videogame-set-3": VideogameSet3Sticker,
  "videogame-set-4": VideogameSet4Sticker,
  "watercolor-halloween-3": WatercolorHalloween3Sticker,
  "watercolor-halloween-5": WatercolorHalloween5Sticker,
  "handdrawn-kid-1": HanddrawnKid1Sticker,
  "handdrawn-kid-3": HanddrawnKid3Sticker,
  "handdrawn-kid-4": HanddrawnKid4Sticker,
  "frankenstein-boy-1": FrankensteinBoy1Sticker,
  "creepy-character-2": CreepyCharacter2Sticker,
  "creepy-character-3": CreepyCharacter3Sticker,
  "creepy-character-4": CreepyCharacter4Sticker,
  "samurai-boy-1": SamuraiBoy1Sticker,
  "ninja-airbender-1": NinjaAirbender1Sticker,
  "kimono-katana-boy-1": KimonoKatanaBoy1Sticker,
  "chinese-vampire-1": ChineseVampire1Sticker,
  "ninja-sitting-1": NinjaSitting1Sticker,
  "japanese-merchant-1": JapaneseMerchant1Sticker,
  "costume-kid-2": CostumeKid2Sticker,
  "costume-kid-3": CostumeKid3Sticker,
  "costume-kid-6": CostumeKid6Sticker,
  "cute-halloween-buddy-2": CuteHalloweenBuddy2Sticker,
  "cute-halloween-buddy-5": CuteHalloweenBuddy5Sticker,
  "gamer-man": GamerManSticker,
  "happy-halloween-3": HappyHalloween3Sticker,
  "happy-halloween-4": HappyHalloween4Sticker,
  "happy-halloween-5": HappyHalloween5Sticker,
  "happy-halloween-8": HappyHalloween8Sticker,
  "retro-basketball-1": RetroBasketball1Sticker,
  "retro-basketball-2": RetroBasketball2Sticker,
  "retro-basketball-4": RetroBasketball4Sticker,
  "retro-cartoon-1": RetroCartoon1Sticker,
  "retro-cartoon-2": RetroCartoon2Sticker,
  "retro-cartoon-3": RetroCartoon3Sticker,
  "retro-military-1": RetroMilitary1Sticker,
  "retro-military-2": RetroMilitary2Sticker,
  "retro-military-3": RetroMilitary3Sticker,
  "retro-military-4": RetroMilitary4Sticker,
  "retro-military-5": RetroMilitary5Sticker,
  "retro-military-6": RetroMilitary6Sticker,
  "retro-military-7": RetroMilitary7Sticker,
  "retro-military-8": RetroMilitary8Sticker,
  "rock-sticker-2": RockSticker2Sticker,
  "rock-sticker-3": RockSticker3Sticker,
  "rock-sticker-4": RockSticker4Sticker,
  "young-action-2": YoungAction2Sticker,
  "young-action-3": YoungAction3Sticker,
  "young-action-4": YoungAction4Sticker,
  "young-action-5": YoungAction5Sticker,
  "young-action-6": YoungAction6Sticker,
  "funny-character-3": FunnyCharacter3Sticker,
  "funny-character-4": FunnyCharacter4Sticker,
  "funny-character-5": FunnyCharacter5Sticker,
  "funny-character-6": FunnyCharacter6Sticker,
  "funny-character-7": FunnyCharacter7Sticker,
  "funny-character-8": FunnyCharacter8Sticker,
  "rock-sticker-5": RockSticker5Sticker,
  "rock-sticker-6": RockSticker6Sticker,
  "rock-sticker-7": RockSticker7Sticker,
  "rock-sticker-8": RockSticker8Sticker,
  "wrestler-4": Wrestler4Sticker,
  "wrestler-6": Wrestler6Sticker,
  "funny-doodle-1": FunnyDoodle1Sticker,
  "funny-doodle-2": FunnyDoodle2Sticker,
  "funny-doodle-3": FunnyDoodle3Sticker,
  "funny-doodle-4": FunnyDoodle4Sticker,
  "graffiti-tag-1": GraffitiTag1Sticker,
  "graffiti-tag-4": GraffitiTag4Sticker,
  "graffiti-tag-16": GraffitiTag16Sticker,
  "cute-pop-1": CutePop1Sticker,
  "doodle-beast-1": DoodleBeast1Sticker,
  "doodle-beast-2": DoodleBeast2Sticker,
  "doodle-beast-3": DoodleBeast3Sticker,
  "doodle-beast-4": DoodleBeast4Sticker,
  "doodle-beast-5": DoodleBeast5Sticker,
  "doodle-beast-6": DoodleBeast6Sticker,
  "doodle-beast-7": DoodleBeast7Sticker,
  "doodle-beast-8": DoodleBeast8Sticker,
  "doodle-beast-9": DoodleBeast9Sticker,
  "pattern-monster-1": PatternMonster1Sticker,
  "pattern-monster-2": PatternMonster2Sticker,
  "pattern-monster-3": PatternMonster3Sticker,
  "pattern-monster-4": PatternMonster4Sticker,
  "pattern-monster-5": PatternMonster5Sticker,
  "pattern-monster-6": PatternMonster6Sticker,
  "retro-badge-1": RetroBadge1Sticker,
  "retro-badge-2": RetroBadge2Sticker,
  "retro-badge-3": RetroBadge3Sticker,
  "retro-badge-4": RetroBadge4Sticker,
  "retro-badge-5": RetroBadge5Sticker,
  "retro-badge-6": RetroBadge6Sticker,
  "plant-buddy-1": PlantBuddy1Sticker,
  "plant-buddy-2": PlantBuddy2Sticker,
  "plant-buddy-3": PlantBuddy3Sticker,
  "funny-sketch-3": FunnySketch3Sticker,
  "funny-sketch-4": FunnySketch4Sticker,
  "happy-doodle-1": HappyDoodle1Sticker,
  "happy-doodle-2": HappyDoodle2Sticker,
  "happy-doodle-4": HappyDoodle4Sticker,
  "mad-beast-1": MadBeast1Sticker,
  "mad-beast-2": MadBeast2Sticker,
  "mad-beast-3": MadBeast3Sticker,
  "mad-beast-4": MadBeast4Sticker,
  "decor-sticker-1": DecorSticker1Sticker,
  "decor-sticker-2": DecorSticker2Sticker,
  "decor-sticker-3": DecorSticker3Sticker,
  "decor-sticker-5": DecorSticker5Sticker,
  "decor-sticker-6": DecorSticker6Sticker,
  "lol-fun-1": LolFun1Sticker,
  "lol-fun-2": LolFun2Sticker,
  "lol-fun-3": LolFun3Sticker,
  "lol-fun-4": LolFun4Sticker,
  "lol-fun-5": LolFun5Sticker,
  "lol-fun-6": LolFun6Sticker,
};

export interface DynamicStickerProps extends StickerProps {
  name?: StickerName;
}

export const Sticker: React.FC<DynamicStickerProps> = ({ name, def, ...props }) => {
  if (def) {
    return <TrazoSticker def={def} {...props} />;
  }

  if (name) {
    const legacy = STICKER_MAP[name];
    if (legacy) {
      const Legacy = legacy;
      return <Legacy {...props} />;
    }

    const trazo = findSticker(name);
    if (trazo) {
      return <TrazoSticker def={trazo} {...props} />;
    }

    console.warn(`[stick-it-up] Unknown sticker name: "${name}".`);
    return null;
  }

  console.warn("[stick-it-up] <Sticker /> requires either `name` or `def`.");
  return null;
};

export default Sticker;
