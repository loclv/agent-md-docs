---
title: Validation Rules Reference
description: Complete reference table of all error and warning rules implemented in agent-md.
---

## Error Rules

Error rules result in a non-zero validation failure and prevent write operations when using `agent-md write`.

| Rule ID | Severity | Configuration Key | Description |
|---|---|---|---|
| `no-bold` | Error | `remove-bold` (formatter) | Prohibits `**bold**` and `__bold__` outside code blocks |
| `heading-structure` | Error | `first-line-heading` | Requires valid hierarchy: single H1, no skipped levels |
| `table-syntax` | Error | Built-in | Disallows alignment colons (`:`) in separator row `|---|---|` |
| `simple-table-syntax` | Error | Built-in | Tables must have ≤ 6 columns and consistent cell counts |
| `table-trailing-spaces` | Error | Built-in | Prohibits trailing whitespace inside table cells |
| `no-ascii-graphs` | Error | Built-in | Prohibits Unicode/ASCII box-drawing art diagrams |
| `code-blocks` | Error | `blanks-around-fences` | Requires valid language tags on fences and matching closing fences |
| `list-formatting` | Error | `blanks-around-lists` | Enforces uniform bullet symbols and proper list spacing |
| `space-indentation` | Error | Built-in | Forbids excessive indentation (>2 spaces) outside code |
| `no-useless-links` | Error | Built-in | Forbids `[url](url)` redundancy; requires `<url>` autolink |
| `no-hard-tabs` | Error | `no-hard-tabs` | Forbids `\t` tab characters outside code blocks |

---

## Warning Rules

Warning rules report style inconsistencies without failing the `valid` status.

| Rule ID | Severity | Configuration Key | Description |
|---|---|---|---|
| `no-duplicate-headings` | Warning | `no-duplicate-headings` | Flags duplicate heading titles within a single file |
| `no-multiple-blanks` | Warning | `compact-blank-lines` | Flags consecutive blank lines |
| `line-length` | Warning | `line-length` / `max-line-length` | Flags lines exceeding maximum character threshold |

---

## Configuration Mapping

Rules can be toggled in `.agent-md.json` or `.markdownlint.json`:

```json
{
  "blanks-around-headings": true,
  "blanks-around-lists": true,
  "blanks-around-fences": true,
  "first-line-heading": false,
  "no-duplicate-headings": true,
  "no-hard-tabs": true,
  "line-length": false,
  "max-line-length": 0
}
```
