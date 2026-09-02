#!/usr/bin/env node
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, "..", "src", "messages");

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) return flatten(v, key);
    return [key];
  });

const ref = readFileSync(join(messagesDir, "en", "common.json"), "utf8");
const refKeys = new Set(flatten(JSON.parse(ref)));

const fail = [];
for (const locale of readdirSync(messagesDir)) {
  const file = join(messagesDir, locale, "common.json");
  if (!readFileSync(file, "utf8")) continue;
  const keys = new Set(flatten(JSON.parse(readFileSync(file, "utf8"))));
  for (const k of refKeys) if (!keys.has(k)) fail.push(`${locale} missing: ${k}`);
  for (const k of keys) if (!refKeys.has(k)) fail.push(`${locale} extra: ${k}`);
}

if (fail.length) {
  console.error("Locale coverage FAILED:");
  for (const line of fail) console.error(" -", line);
  process.exit(1);
}
console.log(`Locale coverage OK across ${readdirSync(messagesDir).length} locales.`);