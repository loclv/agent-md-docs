---
title: VS Code & Editor Extension
description: Integrate agent-md into VS Code, Cursor, Devin, and Antigravity for seamless on-save and on-demand Markdown formatting.
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

The **Agent-MD Formatter** extension brings the speed and token-efficiency of the `agent-md` CLI directly into your code editor.

Supported editors include **VS Code**, **Cursor**, **Devin**, **Windsurf**, and **Antigravity**.

---

## Installation

### From the Extension Marketplace

Search for **Agent-MD Formatter** in your editor's Extensions view, or install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=loclv.agent-md-formatter).

Or install via terminal:

```bash
# Standard VS Code
code --install-extension loclv.agent-md-formatter

# Cursor
cursor --install-extension loclv.agent-md-formatter
```

### From VSIX Package

If building the extension from source:

```bash
cd vscode-extension
bun install
bun compile
code --install-extension agent-md-formatter-0.1.0.vsix
```

---

## Configuration

All extension settings can be added to your User or Workspace `settings.json`.

### Enable Format on Save

To automatically format Markdown documents whenever you save:

```json
{
  "[markdown]": {
    "editor.defaultFormatter": "loclv.agent-md-formatter",
    "editor.formatOnSave": true
  }
}
```

---

## Settings Reference

| Setting | Type | Default | Description |
|---|---|---|---|
| `agentMd.path` | string | `"agent-md"` | Custom path to the `agent-md` binary. Automatically checks project `target/release`, `~/.cargo/bin`, and system PATH |
| `agentMd.format.removeBold` | boolean | `true` | Strip `**bold**` and `__bold__` markers |
| `agentMd.format.compactBlankLines` | boolean | `true` | Collapse consecutive blank lines |
| `agentMd.format.collapseSpaces` | boolean | `true` | Collapse redundant whitespace between words |
| `agentMd.format.removeHorizontalRules` | boolean | `true` | Remove horizontal divider lines (`---`) |
| `agentMd.format.removeEmphasis` | boolean | `true` | Strip italic markers |

---

## Keybindings & Manual Formatting

Format the active Markdown document at any time:

| Action | macOS | Windows / Linux |
|---|---|---|
| **Format Document** | `Shift + Option + F` | `Shift + Alt + F` |
| **Command Palette** | `Cmd + Shift + P` -> "Format Document" | `Ctrl + Shift + P` -> "Format Document" |
