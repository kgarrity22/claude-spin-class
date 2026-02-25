import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CATALOG } from '../lib/catalog.js';
import { resolveTheme, randomSpec } from '../lib/themes.js';

const THEMES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'themes');

// ---------------------------------------------------------------------------
// Catalog integrity
// ---------------------------------------------------------------------------

describe('catalog integrity', () => {
  for (const [catKey, category] of Object.entries(CATALOG)) {
    for (const [themeName, theme] of Object.entries(category.themes)) {
      const label = `${catKey}/${themeName}`;

      test(`${label}: theme file exists`, () => {
        assert.ok(
          existsSync(join(THEMES_DIR, theme.file)),
          `Missing file: themes/${theme.file}`,
        );
      });

      test(`${label}: all subtypes present in file`, async () => {
        const { default: data } = await import(
          join(THEMES_DIR, theme.file),
          { with: { type: 'json' } }
        );
        for (const subtype of theme.subtypes) {
          assert.ok(
            subtype in data,
            `Subtype '${subtype}' not found in themes/${theme.file}`,
          );
        }
      });

      test(`${label}: no empty subtype arrays`, async () => {
        const { default: data } = await import(
          join(THEMES_DIR, theme.file),
          { with: { type: 'json' } }
        );
        for (const subtype of theme.subtypes) {
          const entries = data[subtype];
          assert.ok(
            Array.isArray(entries) && entries.length > 0,
            `Subtype '${subtype}' in themes/${theme.file} is empty`,
          );
        }
      });

      test(`${label}: all entries are non-empty strings`, async () => {
        const { default: data } = await import(
          join(THEMES_DIR, theme.file),
          { with: { type: 'json' } }
        );
        for (const subtype of theme.subtypes) {
          for (const [i, entry] of (data[subtype] ?? []).entries()) {
            assert.strictEqual(
              typeof entry,
              'string',
              `${label}:${subtype}[${i}] is not a string`,
            );
            assert.ok(
              entry.trim().length > 0,
              `${label}:${subtype}[${i}] is an empty string`,
            );
          }
        }
      });
    }
  }
});

// ---------------------------------------------------------------------------
// resolveTheme
// ---------------------------------------------------------------------------

describe('resolveTheme', () => {
  test('bare theme name returns all subtypes combined', () => {
    const verbs = resolveTheme('spanish');
    // spanish has 7 subtypes of 25 entries each = 175
    assert.strictEqual(verbs.length, 175);
    assert.ok(verbs.every((v) => typeof v === 'string' && v.length > 0));
  });

  test('theme:subtype returns only that subtype', () => {
    const verbs = resolveTheme('spanish:greetings');
    assert.strictEqual(verbs.length, 25);
  });

  test('category name returns all themes in that category', () => {
    const techVerbs = resolveTheme('tech');
    const manualSum = ['http', 'vscode', 'terminal', 'regex', 'bigo']
      .reduce((sum, t) => sum + resolveTheme(t).length, 0);
    assert.strictEqual(techVerbs.length, manualSum);
  });

  test('"all" returns every entry across all categories', () => {
    const all = resolveTheme('all');
    const manualSum = Object.keys(CATALOG)
      .reduce((sum, cat) => sum + resolveTheme(cat).length, 0);
    assert.strictEqual(all.length, manualSum);
    assert.ok(all.length > 0);
  });

  test('returns an array of strings', () => {
    const verbs = resolveTheme('http:4xx');
    assert.ok(Array.isArray(verbs));
    assert.ok(verbs.every((v) => typeof v === 'string'));
  });

  test('throws on unknown theme name', () => {
    assert.throws(
      () => resolveTheme('nonexistent'),
      /Unknown theme/,
    );
  });

  test('throws on unknown subtype', () => {
    assert.throws(
      () => resolveTheme('spanish:gibberish'),
      /Unknown subtype/,
    );
  });

  test('throws on unknown category', () => {
    assert.throws(
      () => resolveTheme('fakecategory'),
      /Unknown theme/,
    );
  });
});

// ---------------------------------------------------------------------------
// randomSpec
// ---------------------------------------------------------------------------

describe('randomSpec', () => {
  test('returns a valid theme:subtype spec', () => {
    const spec = randomSpec();
    assert.ok(spec.includes(':'), `Expected "theme:subtype", got: ${spec}`);
    const [theme, subtype] = spec.split(':');
    const found = Object.values(CATALOG).some((cat) =>
      cat.themes[theme]?.subtypes.includes(subtype),
    );
    assert.ok(found, `Spec "${spec}" not found in catalog`);
  });

  test('with a category, returns a spec from that category', () => {
    const validSpecs = new Set(
      Object.entries(CATALOG.tech.themes).flatMap(([name, theme]) =>
        theme.subtypes.map((s) => `${name}:${s}`),
      ),
    );
    const spec = randomSpec('tech');
    assert.ok(validSpecs.has(spec), `Expected a tech spec, got: ${spec}`);
  });

  test('throws on unknown category', () => {
    assert.throws(
      () => randomSpec('fakecategory'),
      /Unknown category/,
    );
  });
});
