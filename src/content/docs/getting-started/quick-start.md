---
title: Quick Start
description: Get up and running with agent-md in under 5 minutes. Learn common commands for formatting, linting, and section operations.
---

import { Steps } from '@astrojs/starlight/components';

This guide walks you through the most common workflows with `agent-md`, from initial setup to running formatting, linting, and section queries.

---

## 1. Initialize Configuration

Run `agent-md init` to generate a standard configuration file in your project root:

```bash
agent-md init
```

This creates `.agent-md.json` with recommended AI-friendly defaults. If an existing config already exists, pass `--force` to overwrite it:

```bash
agent-md init --force
```

---

## 2. Format a Markdown File

Format any Markdown file in-place:

```bash
agent-md fmt README.md
```

By default, `agent-md` outputs structured JSON describing what was updated. To format an entire project directory recursively:

```bash
agent-md fmt .
```

`agent-md` automatically honors patterns in `.markdownlintignore` and `.gitignore`, skipping directories like `node_modules`, `target/`, and `dist/`.

---

## 3. Lint and Validate Markdown

Check if your Markdown adheres to AI-friendly standards:

```bash
agent-md lint README.md
```

Sample JSON output:

```json
{
  "valid": true,
  "errors": [],
  "warnings": []
}
```

If issues are detected (such as unclosed code fences, missing language tags, or bold text formatting), `agent-md` reports the line and column numbers:

```json
{
  "valid": false,
  "errors": [
    {
      "line": 14,
      "column": 1,
      "message": "Bold text not allowed outside code blocks",
      "rule": "no-bold"
    }
  ],
  "warnings": []
}
```

### Human-Readable Output

Add the global `--human` flag for formatted terminal output:

```bash
agent-md --human lint README.md
```

---

## 4. Work with Document Sections

Rather than reading and writing entire large documents, `agent-md` lets you interact with individual headings.

### List Headings Outline

```bash
agent-md headings README.md
```

Or extract the headings field using `read`:

```bash
agent-md read README.md --field headings
```

### Read Only a Specific Section

Fetch the content under a specific heading:

```bash
agent-md read README.md --content "## Installation"
```

For nested sections, use the `>` separator:

```bash
agent-md read README.md --content "## Installation > Build From Source"
```

### Update a Specific Section

Update or create a heading section without rewriting the rest of the file:

```bash
agent-md write-section README.md --section "## Installation" --content "Run `brew install agent-md` to install."
```

---

## 5. Search Inside Documents

Quickly find lines containing a keyword or pattern:

```bash
agent-md search README.md "TODO"
```

Output:

```json
{
  "query": "TODO",
  "matches": [
    {
      "line": 42,
      "content": "- TODO: add integration tests"
    }
  ],
  "total": 1
}
```

---

## Next Steps

- Explore the complete command manual in the [CLI Usage Guide](/guides/cli-usage/).
- Understand how to embed `agent-md` commands in LLM agents with the [LLM & Agent Integration Guide](/guides/llm-agent-integration/).
- Review the [Markdown Writing Rules](/guides/markdown-writing-rules/) enforced during linting.
