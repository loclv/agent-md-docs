---
title: Configuration Guide
description: How to configure agent-md with .agent-md.json, markdownlintrc fallbacks, per-file overrides, and formatter settings.
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

`agent-md` uses a flexible configuration system that supports native JSON configurations, seamless backward-compatibility with `markdownlint` configuration files, and path-based rule overrides.

---

## Configuration Resolution Order

When running commands on a file or directory, `agent-md` discovers configuration files in the following priority order:

1. `.agent-md.json`
2. `agent-md.json`
3. `markdownlintrc.*` fallback:
   - `.markdownlint.json`
   - `.markdownlint.jsonc`
   - `.markdownlint.yaml`
   - `.markdownlint.yml`
   - `.markdownlintrc`
   - `.markdownlintrc.json`

### Discovery Walk

For any target Markdown file, `agent-md` checks the file's parent directory and walks upward through ancestor directories until a config file is found. If none is discovered, it falls back to the current working directory.

You can override discovery at any time using:

- `--config <PATH>`: Explicitly loads a config file from a specific path.
- `--cwd <PATH>`: Sets the base directory for config discovery.
- `--ignore-markdownlintrc`: Disables `markdownlintrc.*` fallbacks, only accepting native `agent-md.json` files.

---

## Generating Configuration

Run `agent-md init` to create a default configuration:

```bash
agent-md init
```

Generated `.agent-md.json`:

```json
{
  "remove-bold": true,
  "compact-blank-lines": true,
  "collapse-spaces": true,
  "remove-horizontal-rules": true,
  "remove-emphasis": true,
  "minify-html": true,
  "blanks-around-headings": true,
  "blanks-around-lists": true,
  "blanks-around-fences": true,
  "first-line-heading": false,
  "no-duplicate-headings": true,
  "no-hard-tabs": true
}
```

---

## Formatter Options

Formatter options can be set in `kebab-case` or `snake_case`, at the root level or nested inside a `"format"` block:

| Option | Type | Default | Description |
|---|---|---|---|
| `remove-bold` | bool | `true` | Strips `**bold**` and `__bold__` outside code blocks |
| `compact-blank-lines` | bool | `true` | Collapses consecutive blank lines into a single blank line |
| `collapse-spaces` | bool | `true` | Collapses multiple consecutive spaces between words |
| `remove-horizontal-rules` | bool | `true` | Removes `---`, `***`, and `___` horizontal dividers |
| `remove-emphasis` | bool | `true` | Strips `*italic*` and `_italic_` markers outside code blocks |
| `minify-html` | bool | `true` | Collapses HTML tags and blocks onto single lines; preserves `<pre>`, `<code>`, etc. |

### Nested Format Example

```json
{
  "format": {
    "remove_bold": false,
    "minify_html": true
  }
}
```

---

## Linter Options

| Option | Type | Default | Description |
|---|---|---|---|
| `blanks-around-headings` | bool | `true` | Requires blank lines before and after headings |
| `blanks-around-lists` | bool | `true` | Requires blank lines before and after list blocks |
| `blanks-around-fences` | bool | `true` | Requires blank lines around fenced code blocks |
| `first-line-heading` | bool | `true` | Enforces that line 1 of the file is a top-level heading |
| `no-duplicate-headings` | bool | `true` | Forbids duplicate heading titles within the same document |
| `line-length` | bool | `false` | Enables maximum line length enforcement |
| `max-line-length` | u64 | `0` | Maximum allowed line characters (when `line-length` is `true`) |
| `no-hard-tabs` | bool | `true` | Forbids hard tab characters (`\t`) outside code blocks |

---

## Per-File Rule Overrides

Use the `overrides` array to apply different linting and formatting rules to specific file paths or directories.

```json
{
  "remove-bold": true,
  "blanks-around-lists": true,
  "overrides": [
    {
      "includes": ["docs/*", "blog/**"],
      "rules": {
        "remove-bold": false
      }
    },
    {
      "includes": ["generated/*"],
      "excludes": ["generated/index.md"],
      "rules": {
        "first-line-heading": false
      }
    }
  ]
}
```

### Pattern Matching Rules

- Patterns match against the target file path relative to the config file or current directory.
- `*` matches across directories (e.g., `docs/*` matches `docs/api/endpoints.md`).
- Later override entries take precedence over earlier entries.
- Explicit CLI flags (such as `--remove-bold=false`) always override both config and override rules.
