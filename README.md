# The Bazaar Tracker

Overwolf Electron app para trackear estadísticas y progreso en el juego **The Bazaar**.

Construido con [@overwolf/ow-electron](https://npmjs.com/package/@overwolf/ow-electron) para acceso a overlays in-game y Game Events Provider (GEP).

## Features

- 🎮 Overlay in-game para visualización en tiempo real
- 📊 Captura de eventos del juego via GEP
- 🔧 Arquitectura basada en el sample oficial de ow-electron

Para más detalles sobre ow-electron, consultar la [documentación oficial](https://overwolf.github.io/tools/ow-electron).

## Setup

To set up this app, you must first install its dependencies (using [yarn](https://yarnpkg.com/), [npm](https://www.npmjs.com/), or any other package manager).

From there, you can easily run/interact with it.

## Quick start 

To run the app in development mode, simply run the `build` script, followed by the `start` script from the package.json.  
For example:

```shell
# Using npm
npm run build
npm run start

# Using yarn
yarn build
yarn start
```

### VSCode launch.json

This repository also includes a working `.vscode/launch.json` file, meaning that you can launch the app by simply clicking `F5` on your keyboard (for default vscode settings).

## Quick Build

To build the app for production, you must run the `build` script, followed by the `build:ow-electron` script from the package.json.  
For example:

```shell
# Using npm
npm run build
npm run build:ow-electron

# Using yarn
yarn build
yarn build:ow-electron
```

## Working with ow-electron packages

In order to add more/remove certain ow-electron "packages" from the project, simply edit the `overwolf.packages` array in the [package.json](/package.json) file, like so:

```json
{
  ...
  "overwolf": {
    "packages": [
      "gep",
      "overlay"
    ]
  },
  ...
}
```