import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

export function getSettingsPath() {
  return join(homedir(), '.claude', 'settings.json');
}

function readSettings() {
  const path = getSettingsPath();
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return {};
  }
}

export function writeSpinnerVerbs(verbs) {
  const path = getSettingsPath();
  const dir = join(homedir(), '.claude');
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const settings = readSettings();
  settings.spinnerVerbs = verbs;
  writeFileSync(path, JSON.stringify(settings, null, 2) + '\n', 'utf8');
}
