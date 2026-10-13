---
title: Markdown Writing Rules
description: Complete specification of AI-friendly Markdown writing rules enforced by agent-md, with valid and invalid examples.
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

`agent-md` validates Markdown against a strict set of rules designed to maximize token efficiency, prevent parsing ambiguities, and optimize document structure for AI agents.

---

## Error Rules (Block Content)

Error rules cause `agent-md lint` to return `"valid": false` and block `write` operations.

### 1. `no-bold`

- **Severity**: Error
- **Reason**: Bold markers (`**text**` and `__text__`) add zero semantic signal to an LLM while inflating token counts by 2–4 tokens per emphasized phrase.
- **Scope**: Outside code blocks. Code blocks and inline code spans are exempt.

#### Invalid:
```markdown
This is **critical** information.
Please check the __status__ flag.
```

#### Valid Alternatives:
```markdown
This is critical information.
Please check the `status` flag.
```

---

### 2. `heading-structure`

- **Severity**: Error
- **Reason**: Multiple H1 headings confuse document hierarchy and table-of-contents parsers. Skipped heading levels (e.g., jumping from `## H2` to `#### H4`) break section extraction logic.

#### Invalid:
```markdown
# First Title
# Second Title (Multiple H1s forbidden)

## Main Section
#### Deeply Nested (Skipped H3 level)
```

#### Valid:
```markdown
# Document Title

## Main Section
### Sub Section
#### Deeply Nested Subsection
```

---

### 3. `table-syntax` & `simple-table-syntax`

- **Severity**: Error
- **Reason**: Complex table structures with extra alignment colons (`:---:`) or mismatched column counts waste tokens and frequently cause markdown parsing failures.

#### Rules:
1. Normal separator rows must use `|---|---|` without colons.
2. Tables should not exceed 6 columns.
3. Every row must match the column count of the header.
4. Cells should avoid complex block-level nesting.

#### Invalid:
```markdown
| Name | Type | Value | Extra | Options | Notes | Debug |
|:-----|:----:|------:|:------|:--------|:------|:------|
| one  | two  | three |
```

#### Valid:
```markdown
| Name | Type | Value | Notes |
|---|---|---|---|
| one | two | three | four |
```

---

### 4. `table-trailing-spaces`

- **Severity**: Error
- **Reason**: Invisible trailing spaces at the end of table cells consume tokens without rendering any visible difference.

#### Invalid:
```markdown
| Name  | Value    |
|---|---|
| foo   | bar      |
```

#### Valid:
```markdown
| Name | Value |
|---|---|
| foo | bar |
```

---

### 5. `no-ascii-graphs`

- **Severity**: Error
- **Reason**: Visual ASCII art diagrams, unicode boxes, and complex line-drawn flowcharts consume hundreds of tokens that LLMs struggle to parse accurately.
- **Alternative**: Use structured lists, tables, or standard Mermaid code blocks.

#### Invalid:
```text
+------------+      +------------+
| ComponentA | ---> | ComponentB |
+------------+      +------------+
```

#### Valid:
```mermaid
graph LR
    ComponentA --> ComponentB
```

---

### 6. `code-blocks`

- **Severity**: Error
- **Reason**: Fenced code blocks without language tags prevent syntax highlighting and hinder LLM code-block parsers. Unclosed fences corrupt the remainder of the document.

#### Rules:
1. Every opening fence (` ``` `) must specify an explicit language identifier (e.g., `bash`, `rust`, `json`, or default to `text`).
2. Every code block must have a matching closing fence.

#### Invalid:
````markdown
```
echo "hello world"
````

#### Valid:
````markdown
```bash
echo "hello world"
```
````

---

### 7. `list-formatting`

- **Severity**: Error
- **Reason**: Inconsistent list markers (`*`, `+`, `-`) or irregular numbering within the same list create formatting noise.

#### Invalid:
```markdown
- First item
* Second item with different bullet
+ Third item with yet another bullet
```

#### Valid:
```markdown
- First item
- Second item
- Third item
```

---

### 8. `space-indentation`

- **Severity**: Error
- **Reason**: Indenting regular text by 4 spaces causes Markdown parsers to treat it as an legacy indented code block.
- **Rule**: Limit regular paragraph indentation to 2 spaces. Nested lists should use 2 spaces per indentation level.

---

### 9. `no-useless-links`

- **Severity**: Error
- **Reason**: Writing `[https://example.com](https://example.com)` duplicates the entire URL string in the token stream.
- **Alternative**: Use standard Markdown autolinks: `<https://example.com>`.

#### Invalid:
```markdown
Visit [https://github.com/loclv/agent-md](https://github.com/loclv/agent-md)
```

#### Valid:
```markdown
Visit <https://github.com/loclv/agent-md>
```

---

## Warning Rules (Style Guidelines)

Warnings indicate stylistic deviations that do not prevent operations:

### `no-duplicate-headings`

- **Severity**: Warning
- **Reason**: Two identical heading names within the same document break anchor links and ambiguous section path lookups.

### `no-multiple-blanks`

- **Severity**: Warning
- **Reason**: More than one consecutive blank line wastes vertical space and context tokens.
