# Architecture

## Overview

![overview](../../../docs/assets/architecture.png)

```
title: Architecture
CLI->Engine: file*s*
Engine->Core: file
Core->Kernel: text
Kernel->Kernel: Linting text
Kernel-->Core: Message
Core-->Engine: Results
Engine-->CLI: output
```

- CLI know Engine
- Engine know Core
- Core know [kernel](https://github.com/textlint/textlint/tree/master/packages/@textlint/kernel/)

textlint apply [Separation of Concern](http://weblogs.asp.net/arturtrosin/separation-of-concern-vs-single-responsibility-principle-soc-vs-srp "Separation of Concern").

## CLI

- [options.ts](./options.ts)
    - Parse cli options
- [cli.ts](./cli.ts)
    - create config
    - run engine
    - output result
    
### Concern

- Parse command line options
- Run Engine
- Receive results
- output to stdout/stderr
    
## Engine

Process file**s** are wanted to lint/fix and prepare configuration of rules and plugins.
After all, return a **array** of `TextLintResult` or `TextLintFixResult`

- engine/ directory
- textlint-engine.js
- rule-manager.js
- textlint-module-resolver.js

These are shared between config and engine.
Don't shared between engine and core.

### Concern

- Prepare rules from config
- Pass rules and configs to Core
- Could handle multiple files

## Core

Process file/text wanted to lint/fix.
After all, return a `TextLintResult` or `TextLintFixResult`


- `core/` directory
- textlint-core.js
- source-code.js
- rule-creator-set.js
- task/
- linter/
- fixer/

To be clear about difference of linter and fixer.

- *Linter* process in parallel.
- *Fixer* process in series.

### Concern

- Handle AST of the text
- Do linting to the AST
- Create fixable messages from the result
- Could handle a single files

## Terms

- Ignore: a rule request to **ignore** range
- Filter: textlint filter requested range that is reported by rule
    - a rule can't filter.
