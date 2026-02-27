# claude-spin-class

> Learn while Claude thinks.

A small CLI that swaps the Claude Code spinner verbs for something worth reading — Spanish vocab, HTTP status codes, Oscar winners, periodic table elements, collective nouns, and more. Every time Claude is working, you're passively picking something up.

```
⠋ 403 → Forbidden: auth won't help
⠙ A shrewdness of apes
⠹ ¿Cuánto cuesta? (How much does it cost?)
⠸ ⌘⇧P → Command Palette
```

It just writes to `~/.claude/settings.json`. That's the whole trick.

### Example with `claude-spin-class spanish`
<img width="262" height="80" alt="Screenshot 2026-02-26 at 1 41 49 PM" src="https://github.com/user-attachments/assets/6763f17e-90a6-48e6-9022-2690b1f846d6" />

---

## Install

```bash
npm install -g claude-spin-class
```

Or without installing:

```bash
npx claude-spin-class spanish
```

Requires Node ≥ 18 and [Claude Code](https://claude.ai/download).

## Usage

```bash
claude-spin-class <theme>             # set a theme
claude-spin-class random [category]  # pick something at random
claude-spin-class list [category]    # see what's available
claude-spin-class --help
```

The theme persists in `~/.claude/settings.json` until you change it.

## Themes

### Tech
| Theme      | Subtypes                                                        | Entries |
|------------|-----------------------------------------------------------------|---------|
| `http`     | `1xx` `2xx` `3xx` `4xx` `5xx`                                   | 33      |
| `vscode`   | `navigation` `editing` `search`                                 | 62      |
| `terminal` | `navigation` `history` `power`                                  | 54      |
| `regex`    | `anchors` `character-classes` `quantifiers` `groups` `patterns` | 51      |
| `bigo`     | `concepts` `sorting` `searching` `data-structures`              | 44      |

### Languages
| Theme        | Subtypes                                                        | Entries |
|--------------|-----------------------------------------------------------------|---------|
| `spanish`    | `greetings` `verbs` `travel` `food` `sports` `numbers` `time`  | 175     |
| `french`     | `greetings` `verbs` `travel` `food` `numbers` `time`           | 150     |
| `italian`    | `greetings` `verbs` `travel` `food` `numbers` `time`           | 150     |
| `vietnamese` | `greetings` `numbers` `food` `travel` `phrases`                | 90      |

### Trivia
| Theme         | Subtypes                                                   | Entries |
|---------------|------------------------------------------------------------|---------|
| `oscars`      | `classics` `1960s-70s` `1980s-90s` `2000s-10s` `2020s`    | 97      |
| `elements`    | `periods-1-3` `period-4` `period-5` `period-6` `period-7`  | 118     |
| `capitals`    | `africa` `americas` `asia` `europe` `oceania`              | 96      |
| `collectives` | `animals` `birds` `ocean` `people`                         | 61      |

You can use a category name to get everything in it (`claude-spin-class languages`), or narrow to a subtype (`claude-spin-class http:4xx`). `claude-spin-class all` loads all 1,181 entries.

## How it works

Claude Code reads `spinnerVerbs` from `~/.claude/settings.json` and cycles through the strings while it's processing. This tool just manages that field.

```jsonc
// ~/.claude/settings.json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": [
      "400 → Bad Request: malformed syntax",
      "401 → Unauthorized: auth required",
      "403 → Forbidden: auth won't help"
    ]
  }
}
```

The tool always uses `"mode": "replace"` so your theme verbs are shown exclusively, rather than mixed in with Claude's defaults.

## Contributing

Adding a theme is straightforward:

1. Create a JSON file in `themes/<category>/` — keys are subtype names, values are string arrays
2. Add an entry to `lib/catalog.js`
3. Run `npm test` to make sure everything's wired up correctly
4. Open a PR

```json
{
  "basics": ["Bonjour (Hello)", "Merci (Thank you)"],
  "numbers": ["Un (One)", "Deux (Two)"]
}
```

Ideas welcome — new languages, trivia categories, whatever seems fun to learn passively.

## Development

```bash
npm test
```

No dependencies. Uses Node's built-in test runner. The suite validates catalog integrity (file exists, subtypes present, no empty arrays, all entries are strings) and core resolution logic. New themes get covered automatically.

## CI/CD

Tests run automatically on every push to `main` and on all PRs, against Node 18, 20, and 22.

Releases are published to npm via [npm Trusted Publishers](https://docs.npmjs.com/generating-provenance-statements) (OIDC — no token stored in GitHub secrets). To publish a new version:

```bash
npm version patch   # or minor / major
git push --tags
```

The tag push triggers the publish workflow, which runs tests and then publishes with provenance.

## License

MIT — see [LICENSE](LICENSE).
