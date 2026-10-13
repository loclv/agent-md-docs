---
title: CLI Command Reference
description: Quick-reference documentation for all agent-md CLI commands, flags, arguments, and JSON return types.
---

## Summary of Subcommands

| Command | Purpose | Input Arguments | Output Format |
|---|---|---|---|
| `read` | Read document or extract fields / sections | `<PATH> [--field <NAME>] [--content <HEADING>]` | JSON / Field |
| `write` | Write or overwrite document with validation | `<PATH> <CONTENT>` | JSON Report |
| `write-section` | Replace or create specific heading section | `<PATH> --section <HEADING> --content <CONTENT>` | JSON Report |
| `append` | Append content to end of file | `<PATH> <CONTENT>` | JSON Report |
| `insert` | Insert content at specific line number | `<PATH> <LINE> <CONTENT>` | JSON Report |
| `delete` | Delete line(s) starting at line number | `<PATH> <LINE> [COUNT]` | JSON Report |
| `list` | List Markdown files honoring ignore rules | `[DIR]` | JSON Array |
| `search` | Match pattern or string within file | `<PATH> <QUERY>` | JSON Matches |
| `headings` | Extract document table of contents outline | `<PATH>` | JSON Headings |
| `stats` | Calculate word, line, and heading counts | `<PATH>` | JSON Stats |
| `to-jsonl` | Convert document blocks to JSONL stream | `<PATH>` | JSONL Stream |
| `fmt` | In-place Markdown formatting | `<PATH> [FLAGS...]` | JSON Document |
| `lint` | Validate Markdown structure & rules | `<PATH> [--content <STR>]` | JSON Report |
| `lint-file` | Human-readable validation diagnostics | `<PATH>` | Formatted Text |
| `init` | Initialize default `.agent-md.json` | `[PATH] [--force]` | JSON Status |
| `config` | Inspect active configuration resolution | `[PATH] [--check]` | JSON Config |
| `ignore` | Inspect active ignore patterns | `[DIR]` | JSON Array |

---

## Detailed Command Signatures

### `read`

```bash
agent-md read <PATH> [--field <FIELD>] [--content <HEADING_PATH>]
```

- `--field` (`-f`): One of `path`, `content`, `word_count`, `line_count`, `headings`.
- `--content`: Section heading path, e.g. `"## Features"` or `"## Features > Speed"`.

### `write`

```bash
agent-md write <PATH> <CONTENT>
```

- Validates `<CONTENT>` against all active rules before writing.
- If invalid, aborts and returns an error array without touching disk.

### `write-section`

```bash
agent-md write-section <PATH> --section <HEADING_PATH> --content <CONTENT>
```

- `--section`: Target section title, e.g. `"## Installation"`.
- `--content`: New body text to place under that section.

### `fmt`

```bash
agent-md fmt <PATH> [OPTIONS]
```

- `<PATH>`: File path or directory path. Directories are processed recursively.
- Options:
  - `--remove-bold=<true|false>`
  - `--compact-blank-lines=<true|false>`
  - `--collapse-spaces=<true|false>`
  - `--remove-horizontal-rules=<true|false>`
  - `--remove-emphasis=<true|false>`
  - `--minify-html=<true|false>`

### `lint`

```bash
agent-md lint <PATH>
agent-md lint --content <CONTENT_STRING>
```

- Returns:
  ```json
  {
    "valid": false,
    "errors": [
      { "line": 5, "column": 1, "message": "...", "rule": "no-bold" }
    ],
    "warnings": []
  }
  ```
