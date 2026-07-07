#!/usr/bin/env node
/**
 * Smoke checks for FaoTor demo (routes + locale files).
 * Run after: npm run dev
 * Usage: node scripts/smoke-check.mjs [baseUrl]
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const base = process.argv[2] ?? "http://127.0.0.1:3000";
const routes = ["/", "/report", "/dashboard", "/about", "/line"];

let failed = 0;

function assert(name, ok) {
  if (!ok) {
    console.error(`FAIL: ${name}`);
    failed++;
  } else {
    console.log(`OK: ${name}`);
  }
}

for (const file of ["lib/locales/en.json", "lib/locales/th.json"]) {
  try {
    const buf = readFileSync(join(root, file));
    new TextDecoder("utf-8", { fatal: true }).decode(buf);
    JSON.parse(buf.toString());
    assert(`${file} valid UTF-8 JSON`, true);
  } catch {
    assert(`${file} valid UTF-8 JSON`, false);
  }
}

for (const path of routes) {
  try {
    const res = await fetch(`${base}${path}`);
    assert(`GET ${path} -> 200`, res.status === 200);
  } catch (e) {
    console.error(`FAIL: GET ${path}`, e.message);
    failed++;
  }
}

const samples = [
  "public/samples/drain-severe.svg",
  "public/samples/drain-partial.svg",
  "public/samples/drain-normal.svg",
];
for (const sample of samples) {
  assert(`${sample} exists`, readFileSync(join(root, sample)).length > 0);
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll smoke checks passed");
