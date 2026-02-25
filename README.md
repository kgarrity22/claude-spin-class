# claude-spin-class

> Learn while Claude thinks.

claude-spin-class replaces the default Claude Code spinner verbs with themed content — Spanish vocabulary, HTTP status codes, regex syntax, keyboard shortcuts, collective nouns — so every waiting moment becomes a micro-lesson.

```
⠋ 403 → Forbidden: auth won't help
⠙ A shrewdness of apes
⠹ ¿Cuánto cuesta? (How much does it cost?)
⠸ ⌘⇧P → Command Palette
```

## Install

```bash
npm install -g claude-spin-class
```

Or use without installing:

```bash
npx claude-spin-class spanish
```

## Usage

```bash
claude-spin-class <theme>              # set a theme
claude-spin-class random [category]   # pick a random theme
claude-spin-class list [category]     # browse available themes
claude-spin-class --help
```

The theme is written to `~/.claude/settings.json` and persists across all future `claude` sessions until you change it.

## Examples

```bash
# Language learning
claude-spin-class spanish              # all 175 Spanish entries
claude-spin-class spanish:greetings    # just greetings & pleasantries
claude-spin-class spanish:travel       # travel phrases

# Tech reference
claude-spin-class http                 # all HTTP status codes (33 entries)
claude-spin-class http:4xx             # just client errors
claude-spin-class vscode               # all VS Code shortcuts
claude-spin-class vscode:editing       # editing shortcuts only
claude-spin-class terminal:history     # bash history tricks
claude-spin-class regex:patterns       # real-world regex examples
claude-spin-class bigo                 # all Big O notation (44 entries)
claude-spin-class bigo:sorting         # algorithm time/space complexities
claude-spin-class bigo:data-structures # common data structure operations

# Trivia & inspiration
claude-spin-class oscars               # all 97 Best Picture winners by year
claude-spin-class oscars:classics      # 1927-1959 golden age
claude-spin-class oscars:2020s         # recent winners
claude-spin-class collectives          # collective nouns (a murder of crows...)
claude-spin-class collectives:birds    # bird-specific collective nouns
claude-spin-class collectives:ocean    # ocean creatures

# Combinations
claude-spin-class tech                 # all tech themes (244 entries)
claude-spin-class languages            # all language themes
claude-spin-class trivia               # all trivia themes
claude-spin-class all                  # everything (475 entries)

# Discovery
claude-spin-class random               # surprise me
claude-spin-class random tech          # random tech subtopic
claude-spin-class list                 # browse all themes
claude-spin-class list languages       # browse language themes
```

## Themes

### Tech
Shortcuts and codes you use every day — learn them passively.

| Theme      | Subtypes                                                        | Entries |
|------------|-----------------------------------------------------------------|---------|
| `http`     | `1xx` `2xx` `3xx` `4xx` `5xx`                                   | 33      |
| `vscode`   | `navigation` `editing` `search`                                 | 62      |
| `terminal` | `navigation` `history` `power`                                  | 54      |
| `regex`    | `anchors` `character-classes` `quantifiers` `groups` `patterns` | 51      |
| `bigo`     | `concepts` `sorting` `searching` `data-structures`              | 44      |

### Languages
Vocabulary and phrases for foreign language practice.

| Theme     | Subtypes                                                      | Entries |
|-----------|---------------------------------------------------------------|---------|
| `spanish` | `greetings` `verbs` `travel` `food` `sports` `numbers` `time` | 175     |

*French, Italian, and more coming soon.*

### Trivia
General knowledge and fun facts.

| Theme         | Subtypes                                               | Entries |
|---------------|--------------------------------------------------------|---------|
| `oscars`      | `classics` `1960s-70s` `1980s-90s` `2000s-10s` `2020s` | 97      |
| `collectives` | `animals` `birds` `ocean` `people`                     | 61      |

*Countries & capitals coming soon.*

## How it works

Claude Code reads `spinnerVerbs` from `~/.claude/settings.json` and cycles through those strings in the CLI spinner while it's working. claude-spin-class is just a focused tool for managing that setting.

```jsonc
// ~/.claude/settings.json (after running claude-spin-class http:4xx)
{
  "spinnerVerbs": [
    "400 → Bad Request: malformed syntax",
    "401 → Unauthorized: auth required",
    "403 → Forbidden: auth won't help",
    ...
  ]
}
```

## Theme format

Each theme file under `themes/` is a plain JSON object mapping subtype names to string arrays:

```json
{
  "greetings": ["Hola (Hello)", "Buenos días (Good morning)", ...],
  "verbs":     ["Pensando (Thinking)", "Trabajando (Working)", ...]
}
```

Want to add a theme? Drop a JSON file in `themes/<category>/`, add an entry to `lib/catalog.js`, and open a PR.

## Roadmap
- [ ] Trivia: countries & capitals, periodic table of elements
- [ ] Languages: French, Italian, Vietnamese

## License

MIT
