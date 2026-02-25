#!/usr/bin/env node
import { resolveTheme, randomSpec, formatList } from "../lib/themes.js";
import { writeSpinnerVerbs, getSettingsPath } from "../lib/settings.js";

const G = "\x1b[32m"; // green
const C = "\x1b[36m"; // cyan
const Y = "\x1b[33m"; // yellow
const B = "\x1b[1m"; // bold
const D = "\x1b[2m"; // dim
const R = "\x1b[0m"; // reset

function help() {
  console.log(`
${B}claude-spin-class${R} — Learn while Claude thinks

${B}Usage:${R}
  claude-spin-class ${C}<theme>${R}              Set a theme (persists in ~/.claude/settings.json)
  claude-spin-class random ${D}[category]${R}   Set a random theme, optionally scoped to a category
  claude-spin-class list ${D}[category]${R}     List available themes
  claude-spin-class --help              Show this help

${B}Theme formats:${R}
  ${C}spanish${R}                      All Spanish phrases (175 entries)
  ${C}spanish:greetings${R}            Just Spanish greetings
  ${C}http:4xx${R}                     HTTP 4xx error codes
  ${C}tech${R}                         All tech themes combined
  ${C}all${R}                          Everything

${B}Categories:${R}
  tech · languages · trivia

${B}Themes:${R}
  tech       →  http, vscode, terminal, regex
  languages  →  spanish
  trivia     →  collectives, oscars

${B}Examples:${R}
  claude-spin-class spanish             # Practice Spanish while you code
  claude-spin-class http                # Learn HTTP status codes
  claude-spin-class http:4xx            # Just the client error codes
  claude-spin-class regex:patterns      # Common regex patterns
  claude-spin-class random              # Surprise me
  claude-spin-class random tech         # Random tech topic
  claude-spin-class list                # See everything available
  claude-spin-class all                 # Set every entry as spinner verbs
`);
}

const [, , cmd, ...rest] = process.argv;

if (!cmd || cmd === "--help" || cmd === "-h") {
  help();
  process.exit(0);
}

try {
  if (cmd === "list") {
    const category = rest[0];
    console.log(formatList(category));
    process.exit(0);
  }

  if (cmd === "random") {
    const category = rest[0];
    const spec = randomSpec(category);
    const verbs = resolveTheme(spec);
    writeSpinnerVerbs(verbs);
    console.log(
      `${G}✓${R} Theme set to ${C}${spec}${R} (${verbs.length} entries)`,
    );
    console.log(`${D}  ${getSettingsPath()}${R}`);
    process.exit(0);
  }

  const spec = cmd;
  const verbs = resolveTheme(spec);
  writeSpinnerVerbs(verbs);
  console.log(
    `${G}✓${R} Theme set to ${C}${spec}${R} (${verbs.length} entries)`,
  );
  console.log(`${D}  ${getSettingsPath()}${R}`);
} catch (err) {
  console.error(`${Y}Error:${R} ${err.message}`);
  process.exit(1);
}
