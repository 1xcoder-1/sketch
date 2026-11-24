#!/usr/bin/env node
/**
 * build-ceo-stickers.mjs
 *
 * Downloads freely-licensed (CC / public-domain) photos of big-tech CEOs from
 * Wikimedia Commons, removes the background locally (no cloud API), saves
 * cut-out WebP stickers into public/stickers/ceo/ and generates
 * app/stickers/ceo-catalog.generated.ts with attribution metadata.
 *
 * Usage:
 *   node scripts/build-ceo-stickers.mjs            # full run (all people)
 *   node scripts/build-ceo-stickers.mjs --dry-run  # first 2 people only
 *
 * Requires dev dependency: @imgly/background-removal-node
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "stickers", "ceo");
const GENERATED_TS = path.join(ROOT, "app", "stickers", "ceo-catalog.generated.ts");
const POSES_PER_PERSON = 2;
const MIN_WIDTH = 400;
const TARGET_WIDTH = 960; // Wikimedia only serves listed thumb widths (320/640/960/1280)
// NOTE: commons.wikimedia.org is unreachable from some networks, so we use the
// official Wikimedia REST gateway for search and en.wikipedia.org's MediaWiki
// API for Commons file metadata (it resolves foreign/Commons files natively).
const SEARCH_API = "https://api.wikimedia.org/core/v1/commons/search/page";
const META_API = "https://en.wikipedia.org/w/api.php";
const UA = "stick-it-up-ceo-sticker-builder/1.0 (project asset build script)";

/** People to build stickers for. `query` targets the best full-body/funny
 *  Commons shot, `funnyQuery` the alternate candid; `exclude` skips titles
 *  that are unusable (e.g. group photos or tight face-only crops). */
const PEOPLE = [
  { slug: "elon-musk", name: "Elon Musk", role: "Tesla / SpaceX CEO", query: "Elon Musk bowtie", funnyQuery: "Elon Musk SpaceX", aura: "#f97316" },
  { slug: "steve-jobs", name: "Steve Jobs", role: "Apple Co-founder", query: "Steve Jobs Macintosh", funnyQuery: "Steve Jobs bicycle", aura: "#a1a1aa", exclude: ["Steve Jobs and Bill Gates", "border cropped", "remove individual"] },
  { slug: "jensen-huang", name: "Jensen Huang", role: "NVIDIA CEO", query: "Jensen Huang GTC", funnyQuery: "Jensen Huang Computex", aura: "#76b900", exclude: ["Mixue", "Ice Cream", "CES 2025 Las Vegas (1)", "RTX 5070 Laptop"] },
  { slug: "mark-zuckerberg", name: "Mark Zuckerberg", role: "Meta CEO", query: "Mark Zuckerberg punching bag", funnyQuery: "Mark Zuckerberg F8", aura: "#3b82f6", exclude: ["MarkZuckerberg.jpg", "Kirchner", "Prague"] },
  { slug: "satya-nadella", name: "Satya Nadella", role: "Microsoft CEO", query: "Satya Nadella Xbox", funnyQuery: "Satya Nadella Gears of War", aura: "#0ea5e9", exclude: ["with former CEOs"] },
  { slug: "sundar-pichai", name: "Sundar Pichai", role: "Google CEO", query: "Sundar Pichai Google I/O", funnyQuery: "Sundar Pichai keynote", aura: "#ea4335", exclude: ["Sundar pichai.png"] },
  { slug: "bill-gates", name: "Bill Gates", role: "Microsoft Co-founder", query: "Bill Gates laughing", funnyQuery: "Bill Gates piano", aura: "#22c55e", exclude: ["Steve Jobs and Bill Gates", "Nov._8", "Nov. 8", "Melinda"] },
  { slug: "sam-altman", name: "Sam Altman", role: "OpenAI CEO", query: "Sam Altman speaking", funnyQuery: "Sam Altman smiling", aura: "#10b981", exclude: ["Narendra"] },
  { slug: "dario-amodei", name: "Dario Amodei", role: "Anthropic CEO", query: "Dario Amodei", funnyQuery: "Dario Amodei speaking", aura: "#d97757" },
  { slug: "tim-cook", name: "Tim Cook", role: "Apple CEO", query: "Tim Cook Apple Store", funnyQuery: "Tim Cook walking", aura: "#64748b" },
  { slug: "jeff-bezos", name: "Jeff Bezos", role: "Amazon Founder", query: "Jeff Bezos laughing", funnyQuery: "Jeff Bezos waving", aura: "#f59e0b" },
  { slug: "larry-page", name: "Larry Page", role: "Alphabet Co-founder", query: "Larry Page segway", funnyQuery: "Larry Page European Parliament", aura: "#4285f4", exclude: ["Gerry Adams", "Lucilita", "O'Toole"] },
  { slug: "sergey-brin", name: "Sergey Brin", role: "Alphabet Co-founder", query: "Sergey Brin TED", funnyQuery: "Sergey Brin Google I/O", aura: "#fbbc05" },
  { slug: "neal-mohan", name: "Neal Mohan", role: "YouTube CEO", query: "Neal Mohan Brandcast", funnyQuery: "Neal Mohan", aura: "#ef4444", exclude: ["TechCrunch"] },
  { slug: "larry-ellison", name: "Larry Ellison", role: "Oracle CTO/Founder", query: "Larry Ellison Oracle", funnyQuery: "Larry Ellison sailing", aura: "#e11d48", exclude: ["David Ellison", "skippers", "Spithill", "Ford", "Analytics Cloud Dashboard", "on stage (2)"] },
  { slug: "andy-jassy", name: "Andy Jassy", role: "Amazon CEO", query: "Andy Jassy re:MARS", funnyQuery: "Andy Jassy keynote", aura: "#fbbf24" },
];

const dryRun = process.argv.includes("--dry-run");
const slugArgIdx = process.argv.indexOf("--only");
const onlySlug = slugArgIdx > -1 ? process.argv[slugArgIdx + 1] : null;
const people = onlySlug
  ? PEOPLE.filter((p) => p.slug === onlySlug)
  : dryRun
    ? PEOPLE.slice(0, 2)
    : PEOPLE;
if (onlySlug && people.length === 0) {
  console.error(`Unknown slug: ${onlySlug}`);
  process.exit(1);
}

async function apiJson(url, params, attempt = 1) {
  const u = new URL(url);
  u.search = new URLSearchParams(params).toString();
  const res = await fetch(u, { headers: { "User-Agent": UA } });
  if ((res.status === 429 || res.status === 503) && attempt < 6) {
    // Wikimedia search API rate limit: back off well clear and retry
    await new Promise((r) => setTimeout(r, 6000 * attempt));
    return apiJson(url, params, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${u}`);
  const json = await res.json();
  if (json.error) throw new Error(`API error: ${JSON.stringify(json.error)}`);
  return json;
}

/** Search Commons via Wikimedia REST, then resolve metadata via en.wikipedia API. */
async function findImages(person, limit) {
  const search = await apiJson(SEARCH_API, {
    q: person.query,
    namespace: "6", // File namespace
    limit: String(limit * 6),
  });
  const titles = (search.pages ?? [])
    .map((p) => p.key)
    .filter((k) => /\.(jpe?g|png)$/i.test(k))
    // MediaWiki normalises underscores to spaces in titles; match that form
    .map((k) => (k.startsWith("File:") ? k : `File:${k}`).replace(/_/g, " ").replace(/%20/g, " "))
    .filter((t) => !(person.exclude ?? []).some((x) => t.includes(x)));
  if (titles.length === 0) return [];

  const info = await apiJson(META_API, {
    action: "query",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: String(TARGET_WIDTH),
    titles: titles.join("|"),
    format: "json",
  });
  // Keep search relevance order (the API returns pages keyed by title)
  const byTitle = new Map(
    Object.values(info.query?.pages ?? {}).map((p) => [p.title, p])
  );
  const seen = new Set();
  const out = [];
  for (const t of titles) {
    const p = byTitle.get(t);
    if (!p) continue;
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    if (!/^image\/(jpeg|png)$/.test(ii.mime)) continue; // skip SVGs / other
    if (ii.width < MIN_WIDTH) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    const meta = ii.extmetadata ?? {};
    out.push({
      title: t,
      thumbUrl: ii.thumburl || ii.url,
      mime: ii.mime,
      filePageUrl: ii.descriptionurl,
      author: cleanHtml(meta.Artist?.value) || "Wikimedia Commons contributor",
      license: cleanHtml(meta.LicenseShortName?.value) || "CC (see file page)",
    });
    if (out.length >= limit) break;
  }
  return out;
}

function cleanHtml(s) {
  return (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/** Normalise a file title so crop/edit variants of the same photo collapse:
 *  "Steve Jobs ... Gotfryd - edited 2.jpg" === "... Gotfryd (cropped).jpg" */
function normTitle(title) {
  return title
    .toLowerCase()
    .replace(/\.(jpe?g|png)$/, "")
    .replace(/\d+/g, "")
    .replace(/\((cropped|edit|edited|retouched)\)|\b(cropped|edited|edit|border|version|copy)\b/g, "")
    .replace(/[^a-z]/g, "");
}

/** Both poses come from the funny/candid searches; if they come up short,
 *  fall back to a plain name search so nobody gets dropped. */
async function pickImages(person) {
  const pools = [await findImages(person, 4)];
  await new Promise((r) => setTimeout(r, 1200)); // spacing out search API calls
  pools.push(await findImages({ ...person, query: person.funnyQuery }, 4));
  const distinct = new Set(pools.flat().map((i) => normTitle(i.title)));
  if (distinct.size < POSES_PER_PERSON) {
    await new Promise((r) => setTimeout(r, 1200));
    pools.push(await findImages({ ...person, query: person.name }, 4));
  }
  const picked = [];
  const used = new Set();
  const take = (img) => {
    if (!img) return;
    const key = normTitle(img.title);
    if (!used.has(key)) {
      used.add(key);
      picked.push(img);
    }
  };
  take(pools[0][0]);
  take(pools[1][0] || pools[0][1]);
  for (const img of pools.flat()) {
    if (picked.length >= POSES_PER_PERSON) break;
    take(img);
  }
  return picked.slice(0, POSES_PER_PERSON);
}

async function download(url, attempt = 1) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if ((res.status === 429 || res.status === 503) && attempt < 7) {
    // Wikimedia rate limit: long back off and retry
    await new Promise((r) => setTimeout(r, 5000 * attempt));
    return download(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`Download HTTP ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Build a scaled thumbnail URL from an original upload.wikimedia URL.
 *  Pattern: /wikipedia/commons/thumb/{h1}/{h2}/{name}/{px}px-{name} */
function thumbVariant(url, px = TARGET_WIDTH) {
  const u = new URL(url);
  const m = u.pathname.match(/^(\/wikipedia\/commons\/)([0-9a-f]\/[0-9a-f]{2}\/)([^/]+)$/);
  if (!m) return null;
  return `${u.origin}${m[1]}thumb/${m[2]}${m[3]}/${px}px-${m[3]}`;
}

/** Inverse of thumbVariant: recover the original file URL from a thumb URL
 *  (some generated thumbs 400 for names with commas/parentheses). */
function unthumb(url) {
  const u = new URL(url);
  const m = u.pathname.match(/^(\/wikipedia\/commons\/)thumb\/([0-9a-f]\/[0-9a-f]{2}\/)([^/]+)\/\d+px-.+$/);
  if (!m) return null;
  return `${u.origin}${m[1]}${m[2]}${m[3]}`;
}

async function main() {
  const { removeBackground } = await import("@imgly/background-removal-node");
  await mkdir(OUT_DIR, { recursive: true });

  const entries = [];
  const failures = [];

  for (const person of people) {
    let images;
    try {
      images = await pickImages(person);
    } catch (err) {
      failures.push(`${person.slug}: search failed — ${err.message}`);
      continue;
    }
    if (images.length === 0) {
      failures.push(`${person.slug}: no usable images found`);
      continue;
    }

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const pose = images.length > 1 ? `-pose-${i + 1}` : "";
      const fileName = `${person.slug}${pose}.webp`;
      try {
        let buf;
        try {
          buf = await download(img.thumbUrl);
        } catch (err) {
          // Thumb 400/429: rebuilt thumb sizes first (originals throttle hard),
          // then the original file as the last resort
          let lastErr = err;
          const candidates = [];
          const u = new URL(img.thumbUrl);
          const isOrig = /^\/wikipedia\/commons\/[0-9a-f]\/[0-9a-f]{2}\//.test(u.pathname);
          const orig = isOrig ? `${u.origin}${u.pathname}` : unthumb(img.thumbUrl);
          if (orig) {
            for (const px of [960, 1280, 640, 320]) {
              const t = thumbVariant(orig, px);
              if (t) candidates.push(t);
            }
            candidates.push(orig);
          }
          for (const alt of candidates) {
            if (!alt) continue;
            try {
              buf = await download(alt);
              break;
            } catch (err2) {
              lastErr = err2;
            }
          }
          if (!buf) throw lastErr;
        }
        // gentle stagger between downloads to avoid rate limiting
        await new Promise((r) => setTimeout(r, 400));
        // The node API detects the input format from the Blob MIME type
        const blob = new Blob([buf], { type: img.mime || "image/jpeg" });
        const cut = await removeBackground(blob, {
          output: { format: "image/webp", quality: 0.92 },
        });
        const bytes = Buffer.from(await cut.arrayBuffer());
        await writeFile(path.join(OUT_DIR, fileName), bytes);

        const suffix = i === 0 ? "" : ` ${i + 1}`;
        entries.push({
          id: `ceo-${person.slug}${pose}`,
          name: `${person.slug}${pose}`,
          title: `${person.name}${suffix}`,
          category: "tech-ceos",
          format: "photo",
          photoSrc: `/stickers/ceo/${fileName}`,
          aura: person.aura,
          description: `${person.name} (${person.role}) photo sticker — cut-out from a freely-licensed Wikimedia Commons photo.`,
          tags: [person.name.split(" ")[0].toLowerCase(), "ceo", "tech", "photo", person.role.split(" ")[0].toLowerCase()],
          attribution: {
            filePageUrl: img.filePageUrl,
            sourceTitle: img.title,
            author: img.author,
            license: img.license,
          },
          defaultRotation: i === 0 ? -4 : 3,
        });
        console.log(`  ok  ${fileName}  <-  ${img.title}`);
      } catch (err) {
        failures.push(`${person.slug} pose ${i + 1}: ${err.message}`);
        console.warn(`  FAIL ${person.slug} pose ${i + 1}: ${err.message}`);
      }
    }
    // pause between people so the search API never sees a burst
    await new Promise((r) => setTimeout(r, 1500));
  }

  const entriesFile = path.join(OUT_DIR, "entries.json");
  // Merge with previous run state so --only / retries don't wipe other entries
  let merged = entries;
  try {
    const prev = JSON.parse(await readFile(entriesFile, "utf8"));
    const byId = new Map(prev.map((e) => [e.id, e]));
    for (const e of entries) byId.set(e.id, e);
    const order = new Map(PEOPLE.map((p, i) => [p.slug, i]));
    merged = [...byId.values()].sort((a, b) => {
      const oa = order.get(a.name.replace(/-pose-\d+$/, "")) ?? 99;
      const ob = order.get(b.name.replace(/-pose-\d+$/, "")) ?? 99;
      return oa - ob || a.name.localeCompare(b.name);
    });
  } catch {
    /* first run */
  }
  await writeFile(entriesFile, JSON.stringify(merged, null, 2), "utf8");

  // ---- write generated TS catalog ----
  const ts = `// AUTO-GENERATED by scripts/build-ceo-stickers.mjs — do not edit by hand.
// Sources: Wikimedia Commons (CC / public-domain licensed photos, see attribution below).

export interface CeoPhotoSticker {
  id: string;
  name: string;
  title: string;
  category: "tech-ceos";
  format: "photo";
  photoSrc: string;
  aura: string;
  description: string;
  tags: string[];
  attribution: {
    filePageUrl: string;
    sourceTitle: string;
    author: string;
    license: string;
  };
  defaultRotation: number;
}

export const CEO_CATALOG: CeoPhotoSticker[] = ${JSON.stringify(merged, null, 2).replace(/"([a-zA-Z0-9_$-]+)":/g, "$1:")};
`;
  await writeFile(GENERATED_TS, ts, "utf8");

  // ---- attribution sidecar (human-readable credits) ----
  const attribution = merged.map((e) => ({
    sticker: e.photoSrc,
    source: e.attribution.sourceTitle,
    filePage: e.attribution.filePageUrl,
    author: e.attribution.author,
    license: e.attribution.license,
  }));
  await writeFile(path.join(OUT_DIR, "attribution.json"), JSON.stringify(attribution, null, 2), "utf8");

  console.log(`\nBuilt ${merged.length} CEO photo stickers -> ${path.relative(ROOT, OUT_DIR)}`);
  console.log(`Catalog  -> ${path.relative(ROOT, GENERATED_TS)}`);
  if (failures.length > 0) {
    console.log(`\n${failures.length} failure(s):`);
    failures.forEach((f) => console.log(`  - ${f}`));
  }
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
