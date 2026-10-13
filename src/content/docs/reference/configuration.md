---
title: Configuration Reference
description: Complete specification and JSON schema options for .agent-md.json and markdownlint fallback files.
---

## Complete `.agent-md.json` Schema

Below is a complete reference of all valid configuration properties recognized by `agent-md`:

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
  "no-hard-tabs": true,

  "line-length": false,
  "max-line-length": 0,
  "ignore-markdownlintrc": false,

  "overrides": [
    {
      "includes": ["docs/*"],
      "excludes": ["docs/generated/*"],
      "rules": {
        "remove-bold": false
      }
    }
  ]
}
```

---

## Configuration Properties

### Formatter Properties

- `remove-bold` (`bool`, default: `true`): Strips `**text**` and `__text__` outside code blocks.
- `compact-blank-lines` (`bool`, default: `true`): Collapses multiple consecutive empty lines to 1.
- `collapse-spaces` (`bool`, default: `true`): Normalizes consecutive whitespace between words.
- `remove-horizontal-rules` (`bool`, default: `true`): Deletes `---`, `***`, and `___` divider lines.
- `remove-emphasis` (`bool`, default: `true`): Strips `*italic*` and `_italic_` outside code blocks.
- `minify-html` (`bool`, default: `true`): Collapses HTML blocks onto single lines; preserves `<pre>` and `<code>`.

### Linter Properties

- `blanks-around-headings` (`bool`, default: `true`): Blank lines around `#` headings.
- `blanks-around-lists` (`bool`, default: `true`): Blank lines around list items.
- `blanks-around-fences` (`bool`, default: `true`): Blank lines around fenced blocks.
- `first-line-heading` (`bool`, default: `true`): Enforces first line is a title.
- `no-duplicate-headings` (`bool`, default: `true`): Flags duplicate heading names.
- `no-hard-tabs` (`bool`, default: `true`): Forbids `\t` tab characters outside code.
- `line-length` (`bool`, default: `false`): Enables line character limit.
- `max-line-length` (`u64`, default: `0`): Character threshold when `line-length` is enabled.

### Discovery Properties

- `ignore-markdownlintrc` (`bool`, default: `false`): When `true`, ignores `.markdownlint.*` fallback files during search.
