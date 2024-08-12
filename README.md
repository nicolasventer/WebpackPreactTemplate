# Webpack React Template

This is a template for a really quick creation of React project with Webpack build.  
This should be used with Visual Studio Code and the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server).

## Installation

```bash
npm install -g -D webpack webpack-cli
```

```bash
git clone https://github.com/nicolasventer/WebpackReactTemplate.git
cd WebpackReactTemplate
npm install
```

### Watch mode installation

```bash
npm install -g nodemon nodemon-webpack-plugin
```

## Demo

![Demo](./demo.gif)

## Usage

Build: *(make a pre-check with tsc)*

```bash
npm run build
```

Rebuild: *(no pre-check, delete dist before build)*

```bash
npm run rebuild
```

Watch: *(no pre-check, no delete, watch for changes)*

```bash
npm run watch
```
