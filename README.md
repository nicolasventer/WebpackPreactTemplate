# Webpack React Template

This is a template for a really quick creation of React project with Webpack build.  
This should be used with Visual Studio Code and the Live Server extension.

**Note: This is not possible to use modules in this template.**

## Installation

```bash
npm install -g -D webpack webpack-cli
git clone git@github.com:nicolasventer/ApiBuilder.git
npm install
```

### Watch mode installation

```bash
npm install -g nodemon nodemon-webpack-plugin
```

In [webpack.config.js](./webpack.config.js), uncomment the following line:

```js
	// plugins: [RefreshLiveServerPlugin],
```

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
webpack --watch
```
