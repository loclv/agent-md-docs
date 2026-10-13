---
title: Rust Library API
description: Using agent-md programmatically in Rust applications and services.
---

`agent-md` can be used as a high-performance, zero-external-parser Rust library.

---

## Adding the Dependency

Add to `Cargo.toml`:

```toml
[dependencies]
agent-md = "0.5.0"
```

---

## Core Functions

### 1. `format_markdown`

Formats a Markdown string in accordance with token-efficiency standards:

```rust
use agent_md::format_markdown;

let raw = "# Header\n\n| Col A | Col B |\n|---|---|\n|  1  |  2  |\n";
let formatted = format_markdown(raw);

println!("{}", formatted);
```

### 2. `validate_markdown`

Validates a Markdown document string against AI-friendly validation rules:

```rust
use agent_md::validate_markdown;

let text = "# Title\n\nThis is **bold** text.";
let report = validate_markdown(text);

if !report.valid {
    for err in report.errors {
        println!("Line {}: {} ({})", err.line, err.message, err.rule);
    }
}
```

### 3. `parse_markdown`

Parses a Markdown document into structured `MarkdownBlock` elements:

```rust
use agent_md::parse_markdown;

let document = parse_markdown("# Title\n\nParagraph text.");
println!("Word count: {}", document.word_count);
println!("Line count: {}", document.line_count);
println!("Headings: {:?}", document.headings);
```

---

## Performance Characteristics

- **Zero External Parser**: Eliminates `pulldown-cmark` and heavy AST trees, keeping compile times fast and binary size minimal.
- **Hardware SIMD Acceleration**: Uses ARM NEON and x86_64 AVX2/SSE2 vectorization for rapid newline scanning and ASCII pattern recognition.
- **Allocation Efficiency**: Operates largely over string slices without redundant buffer duplication.
