---
title: CLI Usage Guide
description: Complete reference and usage guide for all agent-md CLI subcommands, flags, options, and structured JSON outputs.
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

`agent-md` is designed from the ground up for both human developers and autonomous AI agents. By default, every command outputs compact JSON. When working in an interactive terminal, add the global `--human` flag for styled, human-friendly output.

---

## Global Options

Global options must precede the subcommand:

```bash
agent-md [GLOBAL_OPTIONS] <SUBCOMMAND> [ARGS...]
```

| Option | Description |
|---|---|
| `--human` | Pretty-prints terminal output instead of raw compact JSON |
| `--cwd <PATH>` | Sets working directory for configuration discovery |
| `--config <PATH>` | Explicit path to configuration file (bypasses automatic discovery) |
| `--ignore-markdownlintrc` | Skips `markdownlintrc.*` fallback files during configuration search |
| `-v, --version` | Prints version information |
| `-h, --help` | Displays help message |

Example:

```bash
agent-md --human lint README.md
agent-md --cwd /path/to/project fmt document.md
```

---

## Reading Documents

### `agent-md read <path>`

Reads a Markdown document and returns metadata and content:

```bash
agent-md read README.md
```

**JSON Output:**

```json
{
  "path": "README.md",
  "content": "# Project Title\n\nProject content...",
  "word_count": 420,
  "line_count": 68,
  "headings": [
    { "level": 1, "text": "Project Title", "line": 1 },
    { "level": 2, "text": "Installation", "line": 12 }
  ]
}
```

### Extracting Specific Fields

Avoid transmitting the entire document across tool calls with `--field` (or `-f`):

```bash
# Extract only the heading outline
agent-md read README.md --field headings

# Extract only the raw text content
agent-md read README.md --field content

# Extract word or line count
agent-md read README.md -f word_count
```

Available fields: `path`, `content`, `word_count`, `line_count`, `headings`.

### Reading a Specific Section

Fetch only the content underneath a target heading:

```bash
agent-md read README.md --content "## Installation"
```

For nested sections, use the `>` hierarchy delimiter:

```bash
agent-md read README.md --content "## Installation > Build From Source"
```

The output returns only lines within that section boundary, ending when a heading of equal or higher level is reached.

---

## Editing Documents

All write operations run pre-validation to ensure output complies with AI-friendly Markdown standards.

### `agent-md write <path> <content>`

Overwrites or creates a file with validated Markdown content:

```bash
agent-md write docs/new-page.md "# New Title\n\nValidated content here."
```

Returns:

```json
{
  "success": true,
  "message": "File written successfully",
  "document": { "path": "docs/new-page.md", "line_count": 3, "word_count": 6 }
}
```

If validation fails, the file is not written and an error report is returned.

### `agent-md write-section <path>`

Replaces the body of an existing section or appends a new section if it does not yet exist:

```bash
agent-md write-section README.md \
  --section "## Installation" \
  --content "Run `brew install agent-md` to install."
```

Nested sections:

```bash
agent-md write-section README.md \
  --section "## Features > Performance" \
  --content "Powered by SIMD acceleration."
```

### `agent-md append <path> <content>`

Appends content to the end of a document:

```bash
agent-md append notes.md "- New item added at the end"
```

### `agent-md insert <path> <line> <content>`

Inserts content at a specific 1-based line number:

```bash
agent-md insert README.md 5 "> [!NOTE]\n> Important announcement."
```

### `agent-md delete <path> <line> [count]`

Deletes one or more lines starting at a 1-based line number:

```bash
# Delete line 15
agent-md delete README.md 15

# Delete 4 lines starting at line 15
agent-md delete README.md 15 4
```

---

## Document Discovery & Analysis

### `agent-md list [directory]`

Recursively lists Markdown files in the target directory (defaulting to `.`):

```bash
agent-md list
agent-md list src/
```

Automatically excludes paths matching `.markdownlintignore` and `.gitignore`.

### `agent-md search <path> <query>`

Performs fast string searching inside a document:

```bash
agent-md search README.md "TODO"
```

**Output:**

```json
{
  "query": "TODO",
  "matches": [
    { "line": 42, "content": "- TODO: add documentation" }
  ],
  "total": 1
}
```

### `agent-md headings <path>`

Returns the complete table of contents outline with heading levels and line numbers:

```bash
agent-md headings docs/guide.md
```

### `agent-md stats <path>`

Calculates word count, line count, and total heading count:

```bash
agent-md stats README.md
```

### `agent-md to-jsonl <path>`

Converts a Markdown document into line-delimited JSON (JSONL) representations of its parsed blocks:

```bash
agent-md to-jsonl README.md
```

---

## Formatting

### `agent-md fmt <path>`

Formats a single file or an entire directory recursively in-place:

```bash
# Format single file
agent-md fmt README.md

# Format all markdown files in current project
agent-md fmt .
```

### Formatting Features

- **Padded Table Compaction**: Trims leading and trailing spaces inside cells. Normalizes separator rows from `|:---|:---|` to `|---|---|`. Formats empty cells with a single space (`| |`).
- **Code Block Comments**: Collapses excessive whitespace before `#` comments in shell code blocks (`bash`, `sh`, `zsh`) while preserving indentations.
- **Folder Tree Simplification**: Replaces `├──` with `├─` and `└──` with `└─`. Strips empty vertical spacer lines (`│`).
- **Trailing Colon Removal**: Normalizes `## Section:` to `## Section`.
- **Default Code Tags**: Adds `text` tag to unlabeled code blocks.
- **HTML Minification**: Minifies HTML blocks to a single line, stripping redundant whitespace while preserving `<pre>`, `<code>`, and script contents.
- **List Indent Normalization**: Standardizes 4-space list indentation to 2 spaces.

### Formatting Flags

Override configuration values directly from the CLI:

```bash
# Keep bold formatting
agent-md fmt --remove-bold=false README.md

# Keep HTML blocks unminified
agent-md fmt --minify-html=false README.md

# Keep italic formatting
agent-md fmt --remove-emphasis=false README.md
```

---

## Linting & Validation

### `agent-md lint <path>`

Validates a Markdown file and returns error and warning lists:

```bash
agent-md lint README.md
```

### `agent-md lint --content "<content>"`

Validates a string directly without creating a temporary file:

```bash
agent-md lint --content "# Title\n\n**Bold text is invalid**"
```

### `agent-md lint-file <path>`

Returns human-formatted output with line numbers, error diagnostics, and a status summary.

---

## Configuration Management

### `agent-md init [path] [--force]`

Initializes a `.agent-md.json` configuration file:

```bash
agent-md init
agent-md init custom-config.json
agent-md init --force
```

### `agent-md config`

Inspects configuration resolution for the current directory or a specific file:

```bash
agent-md config
agent-md config path/to/document.md
agent-md config --check
```

### `agent-md ignore [path]`

Outputs active ignore patterns parsed from `.markdownlintignore` and `.gitignore`:

```bash
agent-md ignore
agent-md --human ignore
```
