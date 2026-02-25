import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { CATALOG } from "./catalog.js";

const THEMES_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "themes",
);

function loadFile(filePath) {
  return JSON.parse(readFileSync(join(THEMES_DIR, filePath), "utf8"));
}

function getThemeEntry(name) {
  for (const cat of Object.values(CATALOG)) {
    if (cat.themes[name]) return cat.themes[name];
  }
  return null;
}

function allVerbsForEntry(entry) {
  const data = loadFile(entry.file);
  return entry.subtypes.flatMap((s) => data[s] ?? []);
}

export function resolveTheme(spec) {
  if (spec === "all") {
    return Object.values(CATALOG).flatMap((cat) =>
      Object.values(cat.themes).flatMap(allVerbsForEntry),
    );
  }

  if (CATALOG[spec]) {
    return Object.values(CATALOG[spec].themes).flatMap(allVerbsForEntry);
  }

  if (spec.includes(":")) {
    const [themeName, subtype] = spec.split(":", 2);
    const entry = getThemeEntry(themeName);
    if (!entry) throw new Error(`Unknown theme: '${themeName}'`);
    if (!entry.subtypes.includes(subtype)) {
      throw new Error(
        `Unknown subtype '${subtype}' for theme '${themeName}'. Available: ${entry.subtypes.join(", ")}`,
      );
    }
    const data = loadFile(entry.file);
    return data[subtype] ?? [];
  }

  const entry = getThemeEntry(spec);
  if (!entry) {
    throw new Error(
      `Unknown theme: '${spec}'. Run 'claude-spin-class list' to see available themes.`,
    );
  }
  return allVerbsForEntry(entry);
}

export function randomSpec(category) {
  const cats = category ? { [category]: CATALOG[category] } : CATALOG;

  if (category && !CATALOG[category]) {
    throw new Error(
      `Unknown category: '${category}'. Available: ${Object.keys(CATALOG).join(", ")}`,
    );
  }

  const specs = Object.values(cats).flatMap((cat) =>
    Object.entries(cat.themes).flatMap(([name, theme]) =>
      theme.subtypes.map((s) => `${name}:${s}`),
    ),
  );

  return specs[Math.floor(Math.random() * specs.length)];
}

export function formatList(category) {
  const cats = category ? { [category]: CATALOG[category] } : CATALOG;

  if (category && !CATALOG[category]) {
    throw new Error(
      `Unknown category: '${category}'. Available: ${Object.keys(CATALOG).join(", ")}`,
    );
  }

  const lines = [];
  for (const [catKey, cat] of Object.entries(cats)) {
    lines.push(`\n\x1b[1m${cat.label}\x1b[0m  \x1b[2m(${catKey})\x1b[0m`);
    lines.push(`  ${cat.description}`);
    for (const [themeName, theme] of Object.entries(cat.themes)) {
      lines.push(`\n  \x1b[36m${themeName}\x1b[0m — ${theme.label}`);
      lines.push(`    subtypes: ${theme.subtypes.join(", ")}`);
    }
  }
  return lines.join("\n");
}
