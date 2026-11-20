<div align="center">
  <img src="public/stickers/face.svg" alt="Stick It Up Logo" width="88" height="88" />
  <h1>Stick It Up</h1>
  <p><strong>Give your website the kind of personality it deserves.</strong></p>
  <p>A curated collection of 97 handcrafted vector sticker components for React & Next.js with realistic 3D vinyl peel physics.</p>

  <p>
    <a href="https://www.npmjs.com/package/stick-it-up">
      <img src="https://img.shields.io/npm/v/stick-it-up?color=10b981&label=npm" alt="npm version" />
    </a>
    <a href="https://www.npmjs.com/package/stick-it-up">
      <img src="https://img.shields.io/npm/dm/stick-it-up?color=6366f1" alt="npm downloads" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-Community%20%26%20Fair--Use-blue" alt="License" />
    </a>
    <a href="https://react.dev">
      <img src="https://img.shields.io/badge/React-18%20%2F%2019-61dafb?logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-15%20%2F%2016-000000?logo=next.js" alt="Next.js" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-Strict-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
  </p>

  <p>
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-available-stickers">Stickers Catalog</a> •
    <a href="#-props-reference">Props</a> •
    <a href="#-local-development">Development</a> •
    <a href="#-contributing">Contributing</a> •
    <a href="#-license">License</a>
  </p>
</div>

---

## 🌟 Highlights

- 🎨 **34 Handcrafted Stickers**: Editable vector faces, pandas, winter animals, Christmas characters, and cute kawaii designs.
- 🪄 **3D Vinyl Peel Physics**: Realistic hover tilt, subtle drop shadows, and elevation with a single `peel` prop.
- 🔒 **Zero ID Collisions**: Scoped SVG filter and gradient IDs powered by React's `useId()` so duplicate stickers never break each other.
- 🌲 **Tree-Shakeable & Lightweight**: Pure ESM and CommonJS dual bundle with full TypeScript definitions and zero runtime CSS dependencies.
- 🚀 **Dual Usage**: Use lightweight direct named component imports (`<PandaBear1Sticker />`) or dynamic name-based rendering (`<Sticker name="face" />`).
- 🖥️ **Interactive Web Showcase**: Full Next.js showcase app featuring live dragging, interactive inspection modal, quickstart code generator, and instant SVG downloads.

---

## 📦 Installation

Install the package via your package manager of choice:

```bash
# npm (recommended: use @latest)
npm install stick-it-up@latest

# pnpm
pnpm add stick-it-up@latest

# bun
bun add stick-it-up@latest

# yarn
yarn add stick-it-up@latest
```

---

## 🚀 Quick Start

### 1. Named Component Import (Recommended for minimal bundle size)

Every sticker is exported as a standalone, tree-shakeable React component:

```tsx
import { FaceSticker, PandaBear1Sticker, PandaGarlandSticker } from "stick-it-up";

export default function Hero() {
  return (
    <div className="flex items-center gap-6">
      <FaceSticker size={100} />
      <PandaBear1Sticker size={120} peel />
      <PandaGarlandSticker size={96} peel />
    </div>
  );
}
```

### 2. Dynamic Component (`<Sticker name="..." />`)

Need to dynamically display stickers based on state, props, or CMS data? Use the generic `<Sticker />` component:

```tsx
import { Sticker, type StickerName } from "stick-it-up";

const featured: StickerName[] = [
  "face",
  "panda-bear-1",
  "panda-garland",
  "panda-sack",
  "forest-animal-4",
  "halloween-face-3",
];

export default function StickerGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {featured.map((name) => (
        <Sticker key={name} name={name} size={96} peel />
      ))}
    </div>
  );
}
```

### 3. Using Raw SVGs

All SVGs are also available directly in the `public/stickers/` folder for use in plain HTML or standard `<img>` tags:

```html
<img src="/stickers/face.svg" alt="Face sticker" width="96" height="96" />
```

---

## ⚙️ Props Reference

All sticker components accept standard SVG element props alongside custom sticker attributes:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `number \| string` | `100` | Symmetrical width and height in pixels (e.g., `96` or `"120px"`). |
| `peel` | `boolean` | `false` | Enables 3D vinyl peel hover physics (tilt, lift, and soft sticker shadow). |
| `name` | `StickerName` | — | Required **only** when using the generic `<Sticker name="..." />` component. |
| `width` | `number \| string` | — | Overrides `size` for explicit custom width. |
| `height` | `number \| string` | — | Overrides `size` for explicit custom height. |
| `className` | `string` | `""` | Additional CSS classes for rotation, positioning, or custom animations. |
| `style` | `React.CSSProperties` | — | Inline style overrides (automatically merged with peel animation styles). |
| `...props` | `React.SVGProps` | — | Any other standard SVG attributes (`role`, `aria-label`, `onClick`, etc.). |

---

## 🎨 Available Stickers (97 Total)

### 🎭 Characters, Pandas & Winter (20 stickers)
- `face` (`<FaceSticker />`)
- `panda-bear-1` (`<PandaBear1Sticker />`)
- `panda-bear-2` (`<PandaBear2Sticker />`)
- `panda-garland` (`<PandaGarlandSticker />`)
- `panda-sack` (`<PandaSackSticker />`)
- `winter-doodle-4` (`<WinterDoodle4Sticker />`)
- `xmas-character-1` (`<XmasCharacter1Sticker />`)
- `xmas-character-4` (`<XmasCharacter4Sticker />`)
- `forest-animal-4` (`<ForestAnimal4Sticker />`)
- `samurai-boy-1` (`<SamuraiBoy1Sticker />`)
- `ninja-airbender-1` (`<NinjaAirbender1Sticker />`)
- `kimono-katana-boy-1` (`<KimonoKatanaBoy1Sticker />`)
- `ninja-sitting-1` (`<NinjaSitting1Sticker />`)
- `japanese-merchant-1` (`<JapaneseMerchant1Sticker />`)
- `costume-kid-1` (`<CostumeKid1Sticker />`)
- `costume-kid-2` (`<CostumeKid2Sticker />`)
- `costume-kid-3` (`<CostumeKid3Sticker />`)
- `costume-kid-4` (`<CostumeKid4Sticker />`)
- `costume-kid-5` (`<CostumeKid5Sticker />`)
- `costume-kid-6` (`<CostumeKid6Sticker />`)

### 🎃 Halloween Characters & Watercolor (48 stickers)
- `halloween-face-3` (`<HalloweenFace3Sticker />`)
- `halloween-sketch-1` (`<HalloweenSketch1Sticker />`)
- `halloween-sketch-2` (`<HalloweenSketch2Sticker />`)
- `halloween-sketch-3` (`<HalloweenSketch3Sticker />`)
- `halloween-sketch-4` (`<HalloweenSketch4Sticker />`)
- `halloween-prop-1` (`<HalloweenProp1Sticker />`)
- `halloween-prop-2` (`<HalloweenProp2Sticker />`)
- `halloween-prop-3` (`<HalloweenProp3Sticker />`)
- `cute-monster-1` (`<CuteMonster1Sticker />`)
- `cute-monster-2` (`<CuteMonster2Sticker />`)
- `cute-monster-3` (`<CuteMonster3Sticker />`)
- `cute-monster-4` (`<CuteMonster4Sticker />`)
- `cute-monster-5` (`<CuteMonster5Sticker />`)
- `cute-monster-6` (`<CuteMonster6Sticker />`)
- `watercolor-character-1` (`<WatercolorCharacter1Sticker />`)
- `watercolor-character-2` (`<WatercolorCharacter2Sticker />`)
- `watercolor-character-3` (`<WatercolorCharacter3Sticker />`)
- `watercolor-character-4` (`<WatercolorCharacter4Sticker />`)
- `watercolor-character-5` (`<WatercolorCharacter5Sticker />`)
- `watercolor-character-6` (`<WatercolorCharacter6Sticker />`)
- `watercolor-kid-1` (`<WatercolorKid1Sticker />`)
- `watercolor-kid-2` (`<WatercolorKid2Sticker />`)
- `watercolor-kid-3` (`<WatercolorKid3Sticker />`)
- `watercolor-kid-4` (`<WatercolorKid4Sticker />`)
- `watercolor-kid-5` (`<WatercolorKid5Sticker />`)
- `watercolor-kid-6` (`<WatercolorKid6Sticker />`)
- `watercolor-halloween-1` (`<WatercolorHalloween1Sticker />`)
- `watercolor-halloween-2` (`<WatercolorHalloween2Sticker />`)
- `watercolor-halloween-3` (`<WatercolorHalloween3Sticker />`)
- `watercolor-halloween-4` (`<WatercolorHalloween4Sticker />`)
- `watercolor-halloween-5` (`<WatercolorHalloween5Sticker />`)
- `watercolor-halloween-6` (`<WatercolorHalloween6Sticker />`)
- `handdrawn-kid-1` (`<HanddrawnKid1Sticker />`)
- `handdrawn-kid-2` (`<HanddrawnKid2Sticker />`)
- `handdrawn-kid-3` (`<HanddrawnKid3Sticker />`)
- `handdrawn-kid-4` (`<HanddrawnKid4Sticker />`)
- `frankenstein-boy-1` (`<FrankensteinBoy1Sticker />`)
- `creepy-character-1` (`<CreepyCharacter1Sticker />`)
- `creepy-character-2` (`<CreepyCharacter2Sticker />`)
- `creepy-character-3` (`<CreepyCharacter3Sticker />`)
- `creepy-character-4` (`<CreepyCharacter4Sticker />`)
- `chinese-vampire-1` (`<ChineseVampire1Sticker />`)
- `cute-halloween-buddy-1` (`<CuteHalloweenBuddy1Sticker />`)
- `cute-halloween-buddy-2` (`<CuteHalloweenBuddy2Sticker />`)
- `cute-halloween-buddy-3` (`<CuteHalloweenBuddy3Sticker />`)
- `cute-halloween-buddy-4` (`<CuteHalloweenBuddy4Sticker />`)
- `cute-halloween-buddy-5` (`<CuteHalloweenBuddy5Sticker />`)
- `cute-halloween-buddy-6` (`<CuteHalloweenBuddy6Sticker />`)

### 👹 Monster Faces & Head Icons (12 stickers)
- `monster-face-1` (`<MonsterFace1Sticker />`)
- `monster-face-2` (`<MonsterFace2Sticker />`)
- `monster-face-3` (`<MonsterFace3Sticker />`)
- `monster-face-4` (`<MonsterFace4Sticker />`)
- `monster-face-5` (`<MonsterFace5Sticker />`)
- `monster-face-7` (`<MonsterFace7Sticker />`)
- `monster-face-8` (`<MonsterFace8Sticker />`)
- `monster-face-9` (`<MonsterFace9Sticker />`)
- `monster-icon-1` (`<MonsterIcon1Sticker />`)
- `monster-icon-3` (`<MonsterIcon3Sticker />`)
- `monster-icon-4` (`<MonsterIcon4Sticker />`)
- `monster-icon-5` (`<MonsterIcon5Sticker />`)

### 🕹️ Retro Videogame Characters (17 stickers)
- `videogame-collection-1` (`<VideogameCollection1Sticker />`)
- `videogame-collection-2` (`<VideogameCollection2Sticker />`)
- `videogame-collection-3` (`<VideogameCollection3Sticker />`)
- `videogame-collection-4` (`<VideogameCollection4Sticker />`)
- `videogame-collection-5` (`<VideogameCollection5Sticker />`)
- `videogame-collection-6` (`<VideogameCollection6Sticker />`)
- `videogame-set-1` (`<VideogameSet1Sticker />`)
- `videogame-set-2` (`<VideogameSet2Sticker />`)
- `videogame-set-3` (`<VideogameSet3Sticker />`)
- `videogame-set-4` (`<VideogameSet4Sticker />`)
- `videogame-set-5` (`<VideogameSet5Sticker />`)
- `videogame-set-6` (`<VideogameSet6Sticker />`)
- `retro-game-hero-1` (`<RetroGameHero1Sticker />`)
- `retro-game-hero-2` (`<RetroGameHero2Sticker />`)
- `retro-game-hero-3` (`<RetroGameHero3Sticker />`)
- `retro-game-hero-4` (`<RetroGameHero4Sticker />`)
- `retro-game-hero-5` (`<RetroGameHero5Sticker />`)

---

## 💻 Local Development

The repository is structured as an npm workspaces monorepo:

```
components/
├── app/                      # Next.js showcase web application
│   ├── page.tsx              # Landing page with interactive drag & drop
│   └── stickers/             # Full stickers catalog & documentation
├── components/               # Landing page UI sections
├── packages/
│   └── stickers-react/       # The "stick-it-up" npm package source
│       ├── src/
│       │   ├── stickers/     # All 97 sticker React components
│       │   ├── components/   # Generic <Sticker /> wrapper
│       │   └── utils/        # usePeel hover hook
│       └── tsup.config.ts    # Package build config (CJS, ESM, DTS)
└── public/
    └── stickers/             # Raw SVG assets
```

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Sam721166/stick-it-up.git
   cd stick-it-up
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the sticker package:
   ```bash
   npm run build:package
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the live showcase and `/stickers` for the full catalog.

---

## 🤝 Contributing

Contributions from designers and developers are warmly welcomed!

- **Submit Artwork**: Have a cool vector decal or sticker concept? Read our [Contributing Guide](CONTRIBUTING.md) to learn how to add your SVG and React component.
- **Request a Sticker**: Have an idea for a sticker you'd like to see added? [Open a Sticker Request issue](https://github.com/Sam721166/stick-it-up/issues/new?labels=sticker-request&title=[Sticker+Request]:+).
- **Report Bugs**: Encounter an issue with sizing, Peel effects, or imports? [Open an issue on GitHub](https://github.com/Sam721166/stick-it-up/issues).

---

## 💖 Support & Sponsorship

Stick It Up is an independent, 100% free open-source project. If these stickers made your website or app more enjoyable, consider backing future packs and ongoing maintenance:

- **[GitHub Sponsors](https://github.com/sponsors/Sam721166)**: Monthly or one-time sponsorship with profile badges.
- **[Buy Me a Coffee](https://buymeacoffee.com/samirande_)**: Send a quick coffee ($5) via Apple Pay or card with zero setup.

---

## 📄 License & Fair-Use Terms

This project is licensed under the **Stick It Up Fair-Use & Community License** (v1.0, 2026).

### Summary of Terms:

- ✅ **Free & Encouraged**:
  - Install and use in personal projects, developer portfolios, and non-commercial web apps.
  - Study, fork, and explore the codebase to learn motion and UI engineering techniques.
  - Submit bug fixes, features, and new sticker designs back to the community via Pull Requests.

- ❌ **Restrictions**:
  - **No Commercial Paywalls**: You may **not** sell, license, or place this software, its sticker graphics, or derivative components behind a paid paywall, paid subscription, or commercial asset pack.
  - **No Competing Clones / Re-hosting**: You may **not** make minor or trivial modifications to this project and publicly host or republish it as your own competing sticker catalog or package.
  - **Artist Rights**: Character designs and artwork curated in this library remain the intellectual property of their original creators.

For the full legal text, please read the [LICENSE](LICENSE) file.

---

<div align="center">
  <p>Crafted with care by <a href="https://github.com/Sam721166">Samiran De</a> • If you enjoy Stick It Up, give it a ⭐️ on GitHub!</p>
</div>
