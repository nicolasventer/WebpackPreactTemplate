# Server

This is the server side of the application.

# Development

## Requirements

- [bun](https://bun.sh/)
- [typedoc](https://typedoc.org/)
- [chocolatey](https://chocolatey.org/)
  - [lcov](https://community.chocolatey.org/packages/lcov)
- VSCode extension: [Coverage Gutter](https://marketplace.visualstudio.com/items?itemName=ryanluker.vscode-coverage-gutters)

## Installation

```bash
bun install
```

## Run

```bash
bun run dev
```

## Launch

```bash
bun run start
```

## Test

Execute tests with:

```bash
bun run test
```

Execute tests coverage with:

```bash
bun run cov
```

Execute tests coverage and open the report with:

```bash
bun run covhtml
```

## Documentation

```bash
bun run doc
```