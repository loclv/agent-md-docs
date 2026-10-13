---
title: LLM & AI Agent Integration
description: How to configure LLMs, autonomous coding agents, and agentic workflows to use agent-md for token-efficient documentation tasks.
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

When autonomous AI coding agents (such as Claude Code, Cursor, Devin, Aider, or Antigravity) interact with documentation, they frequently make the mistake of reading entire 2,000-line files or rewriting entire files just to adjust a single bullet point.

This guide provides instructions and system rules to integrate `agent-md` directly into your agentic loops.

---

## The Rule for AI Agents

Add the following instruction to your project's `AGENTS.md`, `CLAUDE.md`, or custom instructions:

```markdown
## Markdown Operations Rule

When reading, modifying, or creating Markdown files, always use the `agent-md` CLI instead of direct file read/write operations:

1. Use `agent-md read <path> --field headings` to view the document outline.
2. Use `agent-md read <path> --content "<heading>"` to read only the target section.
3. Use `agent-md write-section <path> --section "<heading>" --content "<new_content>"` to update specific sections.
4. Always validate new Markdown content before saving: `agent-md lint --content "<draft>"`.
5. Upon completing documentation tasks, run `agent-md lint <path>` and `agent-md fmt <path>` to ensure AI-friendly formatting.
```

---

## Why Agents Should Use agent-md

| Traditional Agent Editing | `agent-md` Workflow |
|---|---|
| Reads entire 1,500-line document into context | Reads only the target heading section (~30 lines) |
| Writes entire file back to disk | Edits only the target section with `write-section` |
| Risk of accidentally wiping out unrelated sections | Isolated section edits protect surrounding text |
| Leaves messy tables, trailing colons, bold markers | Automatically formats into token-optimized Markdown |
| No validation on closing code blocks | Pre-validates fences, heading structures, and tables |

---

## 5-Step Agentic Workflow

When an AI agent is asked to update documentation (e.g., adding an API method or updating installation instructions), the agent should follow this standard 5-step workflow:

### Step 1: Inspect Document Outline

Instead of reading the entire file, fetch only the heading tree:

```bash
agent-md read README.md --field headings
```

Output:

```json
[
  { "level": 1, "text": "agent-md", "line": 1 },
  { "level": 2, "text": "Installation", "line": 15 },
  { "level": 2, "text": "Usage", "line": 42 },
  { "level": 2, "text": "Development", "line": 95 }
]
```

### Step 2: Search for Keywords

If the heading structure is large, find exact occurrences of relevant keywords:

```bash
agent-md search README.md "Homebrew"
```

### Step 3: Read Only the Relevant Section

Fetch the exact lines under the target section:

```bash
agent-md read README.md --content "## Installation"
```

### Step 4: Validate Content Before Writing

Before modifying files, pass the draft string into `agent-md lint --content`:

```bash
agent-md lint --content "Run `brew install agent-md` to install."
```

If the draft contains unclosed code blocks or forbidden bold formatting, the linter rejects it immediately, giving the agent clear line-and-column feedback to fix it before touching the filesystem.

### Step 5: Update the Section

Write the validated update:

```bash
agent-md write-section README.md \
  --section "## Installation" \
  --content "Run `brew install agent-md` to install."
```

---

## Agent Task Completion Checklist

When configuring agents in CI or multi-turn benchmarks, enforce this verification checklist before the agent declares a task complete:

- [ ] All touched Markdown files pass `agent-md lint <path>`.
- [ ] No bold formatting outside code blocks (`**bold**` or `__bold__`).
- [ ] All code fences specify a language tag (or default to `text`).
- [ ] Tables are formatted compactly without trailing padding.
- [ ] Run `agent-md fmt <path>` to ensure clean formatting.
