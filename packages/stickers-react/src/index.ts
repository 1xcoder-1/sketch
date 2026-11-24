"use client";

export type { StickerProps, StickerName } from "./types";
export type { StickerCategory, StickerDef, StickerLayer, ToSvgStringOptions, NamedStickerProps, TrazoStickerProps } from "./trazo";

export {
  TrazoSticker,
  createStickerComponent,
  resolveConcreteColor,
  toSvgString,
  findSticker,
  getStickerDef,
  trazoCatalog,
  trazoCategoryOrder,
  trazoCatalogByCategory
} from "./trazo";

export * from "./trazo/catalog/ocean";
export * from "./trazo/catalog/arrows";
export * from "./trazo/catalog/nature";
export * from "./trazo/catalog/hearts";
export * from "./trazo/catalog/symbols";
export * from "./trazo/catalog/characters";

export { Sticker, STICKER_MAP } from "./components/Sticker";
export type { DynamicStickerProps } from "./components/Sticker";

export { FaceSticker } from "./stickers/FaceSticker";
export { PandaBear1Sticker } from "./stickers/PandaBear1Sticker";
export { PandaBear2Sticker } from "./stickers/PandaBear2Sticker";
export { PandaGarlandSticker } from "./stickers/PandaGarlandSticker";
export { PandaSackSticker } from "./stickers/PandaSackSticker";
export { WinterDoodle4Sticker } from "./stickers/WinterDoodle4Sticker";
export { XmasCharacter1Sticker } from "./stickers/XmasCharacter1Sticker";
export { XmasCharacter4Sticker } from "./stickers/XmasCharacter4Sticker";
export { ForestAnimal4Sticker } from "./stickers/ForestAnimal4Sticker";
export { HalloweenFace3Sticker } from "./stickers/HalloweenFace3Sticker";
export { MonsterFace1Sticker } from "./stickers/MonsterFace1Sticker";
export { MonsterFace2Sticker } from "./stickers/MonsterFace2Sticker";
export { MonsterFace3Sticker } from "./stickers/MonsterFace3Sticker";
export { MonsterFace7Sticker } from "./stickers/MonsterFace7Sticker";
export { MonsterFace8Sticker } from "./stickers/MonsterFace8Sticker";
export { MonsterFace9Sticker } from "./stickers/MonsterFace9Sticker";
export { MonsterIcon1Sticker } from "./stickers/MonsterIcon1Sticker";
export { MonsterIcon3Sticker } from "./stickers/MonsterIcon3Sticker";
export { MonsterIcon5Sticker } from "./stickers/MonsterIcon5Sticker";
export { HalloweenSketch4Sticker } from "./stickers/HalloweenSketch4Sticker";
export { HalloweenProp1Sticker } from "./stickers/HalloweenProp1Sticker";
export { CuteMonster1Sticker } from "./stickers/CuteMonster1Sticker";
export { CuteMonster2Sticker } from "./stickers/CuteMonster2Sticker";
export { CuteMonster3Sticker } from "./stickers/CuteMonster3Sticker";
export { CuteMonster5Sticker } from "./stickers/CuteMonster5Sticker";
export { CuteMonster6Sticker } from "./stickers/CuteMonster6Sticker";
export { WatercolorCharacter1Sticker } from "./stickers/WatercolorCharacter1Sticker";
export { WatercolorCharacter3Sticker } from "./stickers/WatercolorCharacter3Sticker";
export { WatercolorCharacter4Sticker } from "./stickers/WatercolorCharacter4Sticker";
export { WatercolorKid2Sticker } from "./stickers/WatercolorKid2Sticker";
export { WatercolorKid3Sticker } from "./stickers/WatercolorKid3Sticker";
export { WatercolorKid5Sticker } from "./stickers/WatercolorKid5Sticker";
export { WatercolorKid6Sticker } from "./stickers/WatercolorKid6Sticker";
export { VideogameCollection1Sticker } from "./stickers/VideogameCollection1Sticker";
export { VideogameCollection2Sticker } from "./stickers/VideogameCollection2Sticker";
export { VideogameSet3Sticker } from "./stickers/VideogameSet3Sticker";
export { VideogameSet4Sticker } from "./stickers/VideogameSet4Sticker";
export { WatercolorHalloween3Sticker } from "./stickers/WatercolorHalloween3Sticker";
export { WatercolorHalloween5Sticker } from "./stickers/WatercolorHalloween5Sticker";
export { HanddrawnKid1Sticker } from "./stickers/HanddrawnKid1Sticker";
export { HanddrawnKid3Sticker } from "./stickers/HanddrawnKid3Sticker";
export { HanddrawnKid4Sticker } from "./stickers/HanddrawnKid4Sticker";
export { FrankensteinBoy1Sticker } from "./stickers/FrankensteinBoy1Sticker";
export { CreepyCharacter2Sticker } from "./stickers/CreepyCharacter2Sticker";
export { CreepyCharacter3Sticker } from "./stickers/CreepyCharacter3Sticker";
export { CreepyCharacter4Sticker } from "./stickers/CreepyCharacter4Sticker";
export { SamuraiBoy1Sticker } from "./stickers/SamuraiBoy1Sticker";
export { NinjaAirbender1Sticker } from "./stickers/NinjaAirbender1Sticker";
export { KimonoKatanaBoy1Sticker } from "./stickers/KimonoKatanaBoy1Sticker";
export { ChineseVampire1Sticker } from "./stickers/ChineseVampire1Sticker";
export { NinjaSitting1Sticker } from "./stickers/NinjaSitting1Sticker";
export { JapaneseMerchant1Sticker } from "./stickers/JapaneseMerchant1Sticker";
export { CostumeKid2Sticker } from "./stickers/CostumeKid2Sticker";
export { CostumeKid3Sticker } from "./stickers/CostumeKid3Sticker";
export { CostumeKid6Sticker } from "./stickers/CostumeKid6Sticker";
export { CuteHalloweenBuddy2Sticker } from "./stickers/CuteHalloweenBuddy2Sticker";
export { CuteHalloweenBuddy5Sticker } from "./stickers/CuteHalloweenBuddy5Sticker";
export { GamerManSticker } from "./stickers/GamerManSticker";
export { HappyHalloween3Sticker } from "./stickers/HappyHalloween3Sticker";
export { HappyHalloween4Sticker } from "./stickers/HappyHalloween4Sticker";
export { HappyHalloween5Sticker } from "./stickers/HappyHalloween5Sticker";
export { HappyHalloween8Sticker } from "./stickers/HappyHalloween8Sticker";
export { RetroBasketball1Sticker } from "./stickers/RetroBasketball1Sticker";
export { RetroBasketball2Sticker } from "./stickers/RetroBasketball2Sticker";
export { RetroBasketball4Sticker } from "./stickers/RetroBasketball4Sticker";
export { RetroCartoon1Sticker } from "./stickers/RetroCartoon1Sticker";
export { RetroCartoon2Sticker } from "./stickers/RetroCartoon2Sticker";
export { RetroCartoon3Sticker } from "./stickers/RetroCartoon3Sticker";
export { RetroMilitary1Sticker } from "./stickers/RetroMilitary1Sticker";
export { RetroMilitary2Sticker } from "./stickers/RetroMilitary2Sticker";
export { RetroMilitary3Sticker } from "./stickers/RetroMilitary3Sticker";
export { RetroMilitary4Sticker } from "./stickers/RetroMilitary4Sticker";
export { RetroMilitary5Sticker } from "./stickers/RetroMilitary5Sticker";
export { RetroMilitary6Sticker } from "./stickers/RetroMilitary6Sticker";
export { RetroMilitary7Sticker } from "./stickers/RetroMilitary7Sticker";
export { RetroMilitary8Sticker } from "./stickers/RetroMilitary8Sticker";
export { RockSticker2Sticker } from "./stickers/RockSticker2Sticker";
export { RockSticker3Sticker } from "./stickers/RockSticker3Sticker";
export { RockSticker4Sticker } from "./stickers/RockSticker4Sticker";
export { YoungAction2Sticker } from "./stickers/YoungAction2Sticker";
export { YoungAction3Sticker } from "./stickers/YoungAction3Sticker";
export { YoungAction4Sticker } from "./stickers/YoungAction4Sticker";
export { YoungAction5Sticker } from "./stickers/YoungAction5Sticker";
export { YoungAction6Sticker } from "./stickers/YoungAction6Sticker";
export { FunnyCharacter3Sticker } from "./stickers/FunnyCharacter3Sticker";
export { FunnyCharacter4Sticker } from "./stickers/FunnyCharacter4Sticker";
export { FunnyCharacter5Sticker } from "./stickers/FunnyCharacter5Sticker";
export { FunnyCharacter6Sticker } from "./stickers/FunnyCharacter6Sticker";
export { FunnyCharacter7Sticker } from "./stickers/FunnyCharacter7Sticker";
export { FunnyCharacter8Sticker } from "./stickers/FunnyCharacter8Sticker";
export { RockSticker5Sticker } from "./stickers/RockSticker5Sticker";
export { RockSticker6Sticker } from "./stickers/RockSticker6Sticker";
export { RockSticker7Sticker } from "./stickers/RockSticker7Sticker";
export { RockSticker8Sticker } from "./stickers/RockSticker8Sticker";
export { Wrestler4Sticker } from "./stickers/Wrestler4Sticker";
export { Wrestler6Sticker } from "./stickers/Wrestler6Sticker";
export { FunnyDoodle1Sticker } from "./stickers/FunnyDoodle1Sticker";
export { FunnyDoodle2Sticker } from "./stickers/FunnyDoodle2Sticker";
export { FunnyDoodle3Sticker } from "./stickers/FunnyDoodle3Sticker";
export { FunnyDoodle4Sticker } from "./stickers/FunnyDoodle4Sticker";
export { GraffitiTag1Sticker } from "./stickers/GraffitiTag1Sticker";
export { GraffitiTag4Sticker } from "./stickers/GraffitiTag4Sticker";
export { GraffitiTag16Sticker } from "./stickers/GraffitiTag16Sticker";
export { CutePop1Sticker } from "./stickers/CutePop1Sticker";
export { DoodleBeast1Sticker } from "./stickers/DoodleBeast1Sticker";
export { DoodleBeast2Sticker } from "./stickers/DoodleBeast2Sticker";
export { DoodleBeast3Sticker } from "./stickers/DoodleBeast3Sticker";
export { DoodleBeast4Sticker } from "./stickers/DoodleBeast4Sticker";
export { DoodleBeast5Sticker } from "./stickers/DoodleBeast5Sticker";
export { DoodleBeast6Sticker } from "./stickers/DoodleBeast6Sticker";
export { DoodleBeast7Sticker } from "./stickers/DoodleBeast7Sticker";
export { DoodleBeast8Sticker } from "./stickers/DoodleBeast8Sticker";
export { DoodleBeast9Sticker } from "./stickers/DoodleBeast9Sticker";
export { PatternMonster1Sticker } from "./stickers/PatternMonster1Sticker";
export { PatternMonster2Sticker } from "./stickers/PatternMonster2Sticker";
export { PatternMonster3Sticker } from "./stickers/PatternMonster3Sticker";
export { PatternMonster4Sticker } from "./stickers/PatternMonster4Sticker";
export { PatternMonster5Sticker } from "./stickers/PatternMonster5Sticker";
export { PatternMonster6Sticker } from "./stickers/PatternMonster6Sticker";
export { RetroBadge1Sticker } from "./stickers/RetroBadge1Sticker";
export { RetroBadge2Sticker } from "./stickers/RetroBadge2Sticker";
export { RetroBadge3Sticker } from "./stickers/RetroBadge3Sticker";
export { RetroBadge4Sticker } from "./stickers/RetroBadge4Sticker";
export { RetroBadge5Sticker } from "./stickers/RetroBadge5Sticker";
export { RetroBadge6Sticker } from "./stickers/RetroBadge6Sticker";
export { PlantBuddy1Sticker } from "./stickers/PlantBuddy1Sticker";
export { PlantBuddy2Sticker } from "./stickers/PlantBuddy2Sticker";
export { PlantBuddy3Sticker } from "./stickers/PlantBuddy3Sticker";
export { FunnySketch3Sticker } from "./stickers/FunnySketch3Sticker";
export { FunnySketch4Sticker } from "./stickers/FunnySketch4Sticker";
export { HappyDoodle1Sticker } from "./stickers/HappyDoodle1Sticker";
export { HappyDoodle2Sticker } from "./stickers/HappyDoodle2Sticker";
export { HappyDoodle4Sticker } from "./stickers/HappyDoodle4Sticker";
export { MadBeast1Sticker } from "./stickers/MadBeast1Sticker";
export { MadBeast2Sticker } from "./stickers/MadBeast2Sticker";
export { MadBeast3Sticker } from "./stickers/MadBeast3Sticker";
export { MadBeast4Sticker } from "./stickers/MadBeast4Sticker";
export { DecorSticker1Sticker } from "./stickers/DecorSticker1Sticker";
export { DecorSticker2Sticker } from "./stickers/DecorSticker2Sticker";
export { DecorSticker3Sticker } from "./stickers/DecorSticker3Sticker";
export { DecorSticker5Sticker } from "./stickers/DecorSticker5Sticker";
export { DecorSticker6Sticker } from "./stickers/DecorSticker6Sticker";
export { LolFun1Sticker } from "./stickers/LolFun1Sticker";
export { LolFun2Sticker } from "./stickers/LolFun2Sticker";
export { LolFun3Sticker } from "./stickers/LolFun3Sticker";
export { LolFun4Sticker } from "./stickers/LolFun4Sticker";
export { LolFun5Sticker } from "./stickers/LolFun5Sticker";
export { LolFun6Sticker } from "./stickers/LolFun6Sticker";

import { Sticker } from "./components/Sticker";
export default Sticker;

// Trazo sticker components
export {
  FlapjackOctopus,
  CurlyArrow, Spiral, SquareSpiral, LoopRibbon, ZigzagScribble, LoopArrowOrange, VerticalZigzag, DownArrow, PeachCoil, SkyCoil,
  FlowerRed, PuffyCloud, FlowerYellow, OceanWaves, SunBurst, SplashDrops, TripleZigzag, SpikyGrass, ScallopedWave, Earth,
  CrownRays, HeartBurst, SixStar, HeartChevron, SolidStar, SparkleFour, SparkleCross, BowtieLoop, TripleHeartSwirl, DoubleHearts, StarOutline, CrosshairBurst,
  Diamond, AngerMark, Triangle, CircleRing, Asterisk, LightningBolt, QuestionMark, ExclamationMark, DiagonalHatch, Hashtag,
  PinkDino, SpiderMan, Stitch, LittleGreenAlien, WoodyWink,
  InfinityLoop, MusicNote, XMark, } from "./trazo";
