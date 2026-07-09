#!/usr/bin/env node
/**
 * Smoke checks for FaoTor demo (routes + locale files).
 * Usage:
 *   node scripts/smoke-check.mjs
 *   node scripts/smoke-check.mjs http://127.0.0.1:3001
 *   BASE_URL=http://127.0.0.1:3011 node scripts/smoke-check.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputBase = process.argv.find((arg, idx) => idx > 1 && !arg.startsWith("--"));
const base = process.env.BASE_URL ?? inputBase ?? "http://127.0.0.1:3000";
const routes = ["/", "/report", "/dashboard", "/about", "/line"];

let failed = 0;
let routeFailures = 0;

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
    if (res.status !== 200) routeFailures++;
  } catch (e) {
    console.error(`FAIL: GET ${path}`, e.message);
    failed++;
    routeFailures++;
  }
}

const samples = [
  "public/samples/samples/Example/อุดตันหนัก.jpg",
  "public/samples/samples/Example/เริ่มอุดตัน.jpg",
  "public/samples/samples/Example/ปกติ.jpg",
  "public/samples/samples/Mock List 1-4/ซอยลาดพร้าว 42.jpg",
  "public/samples/samples/Mock List 1-4/ตลาดนัดจตุจักร โซน B.jpg",
  "public/samples/samples/Mock List 1-4/ชุมชนคลองเตย ซอย 12.jpg",
  "public/samples/samples/Mock List 1-4/หมู่บ้านสุขใจ ซอย 3.jpg",
];
for (const sample of samples) {
  assert(`${sample} exists`, readFileSync(join(root, sample)).length > 0);
}

if (failed > 0) {
  if (routeFailures > 0) {
    console.error(
      `Hint: make sure server is running on ${base} (or pass BASE_URL / explicit URL argument).`,
    );
  }
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll smoke checks passed");
