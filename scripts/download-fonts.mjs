/**
 * Download self-hosted font files into public/fonts.
 * Prefer Fontsource via jsDelivr (static per-weight files).
 *
 * Usage: node scripts/download-fonts.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "fonts");
mkdirSync(out, { recursive: true });

const files = [
  [
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-400-normal.woff2",
    "Inter-400.woff2",
  ],
  [
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-600-normal.woff2",
    "Inter-600.woff2",
  ],
  [
    "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-thai@5.2.5/thai-400-normal.woff2",
    "IBMPlexSansThai-thai-400.woff2",
  ],
  [
    "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-thai@5.2.5/thai-600-normal.woff2",
    "IBMPlexSansThai-thai-600.woff2",
  ],
  [
    "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-thai@5.2.5/thai-700-normal.woff2",
    "IBMPlexSansThai-thai-700.woff2",
  ],
  [
    "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-thai@5.2.5/latin-400-normal.woff2",
    "IBMPlexSansThai-latin-400.woff2",
  ],
  [
    "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-thai@5.2.5/latin-600-normal.woff2",
    "IBMPlexSansThai-latin-600.woff2",
  ],
  [
    "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-thai@5.2.5/latin-700-normal.woff2",
    "IBMPlexSansThai-latin-700.woff2",
  ],
];

async function download(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(join(out, filename), buf);
  console.log(`OK ${filename} (${buf.length} bytes)`);
}

for (const [url, filename] of files) {
  await download(url, filename);
}
console.log("DONE");
