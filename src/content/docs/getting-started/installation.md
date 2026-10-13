---
title: Installation
description: How to install the agent-md CLI, VS Code extension, and Rust library crate.
---

import { Tabs, TabItem, Steps } from '@astrojs/starlight/components';

`agent-md` can be installed as a standalone CLI executable, an editor extension (VS Code, Cursor, Devin, Antigravity), or imported as a native Rust crate in your applications.

---

## Installing the CLI

<Tabs>
  <TabItem label="Homebrew (macOS & Linux)">
Install using the official Homebrew tap:

```bash
brew tap loclv/tools
brew install agent-md
```

Verify installation:

```bash
agent-md --version
```
  </TabItem>

  <TabItem label="Cargo">
Install directly from crates.io using Cargo:

```bash
cargo install agent-md
```

Ensure Cargo's bin directory is added to your environment `PATH`:

```bash
export PATH="$HOME/.cargo/bin:$PATH"
```
  </TabItem>

  <TabItem label="Build From Source">
<Steps>
1. Ensure Rust 1.94.0 or later is installed via [rustup](https://rustup.rs/):
   ```bash
   rustc --version
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/loclv/agent-md.git
   cd agent-md
   ```

3. Build the release binary:
   ```bash
   cargo build --release
   ```
   The compiled executable will be located at `target/release/agent-md`.

4. (Optional) Add the binary to your `PATH` or copy it to `/usr/local/bin`:
   ```bash
   cp target/release/agent-md /usr/local/bin/
   ```
</Steps>
  </TabItem>
</Tabs>

---

## VS Code & Editor Extension

`agent-md` is available as a formatting extension for VS Code and compatible editors (Cursor, Devin, Windsurf, Antigravity):

- **Marketplace**: Search for **Agent-MD Formatter** or visit the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=loclv.agent-md-formatter).
- **Extension ID**: `loclv.agent-md-formatter`

### Quick Install via Terminal

```bash
code --install-extension loclv.agent-md-formatter
```

For Cursor:

```bash
cursor --install-extension loclv.agent-md-formatter
```

See the [VS Code Extension Guide](/guides/vscode-extension/) for configuration options and setting up format-on-save.

---

## Rust Library Dependency

To integrate `agent-md`'s formatting, parsing, and validation directly into your Rust services or agent tool implementations:

Add `agent-md` to your `Cargo.toml`:

```toml
[dependencies]
agent-md = "0.5.0"
```

### Basic Example

```rust
use agent_md::{format_markdown, validate_markdown, parse_markdown};

fn main() {
    let raw = "# Hello World\n\n| Col A | Col B |\n|---|---|\n| 1 | 2 |\n";
    
    // Format markdown into token-optimized representation
    let formatted = format_markdown(raw);
    
    // Validate adherence to AI-friendly standards
    let report = validate_markdown(&formatted);
    if report.valid {
        println!("Markdown is valid and AI-friendly!");
    } else {
        println!("Found issues: {:?}", report.errors);
    }
}
```

See the [Rust Library API Reference](/reference/rust-api/) for detailed function signatures.
