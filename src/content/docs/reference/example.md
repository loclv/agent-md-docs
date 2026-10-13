---
title: Quick Reference Cheat Sheet
description: Compact cheat sheet of the most essential agent-md commands, flags, and rules.
---

## Essential CLI Commands

```bash
# In-place formatting
agent-md fmt README.md
agent-md fmt .

# Validate without writing
agent-md lint README.md
agent-md lint --content "# Header\nContent"

# Section-level read
agent-md read README.md --content "## Installation"

# Section-level write
agent-md write-section README.md --section "## Installation" --content "New instructions"

# Inspect structure
agent-md read README.md --field headings
agent-md search README.md "TODO"

# Config & Ignore
agent-md init
agent-md config --check
agent-md ignore
```

---

## Key Formatter Toggles

```bash
agent-md fmt --remove-bold=false README.md
agent-md fmt --minify-html=false README.md
agent-md fmt --remove-emphasis=false README.md
```

---

## Editor Shortcuts

- **Format Document**: `Shift + Option + F` (macOS) / `Shift + Alt + F` (Windows/Linux)
- **Extension ID**: `loclv.agent-md-formatter`
