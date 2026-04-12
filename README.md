# Quest to Now

A browser-based mobile adventure game built with HTML, CSS, and JavaScript.

## About

Quest to Now is a multi-screen mobile game where players assemble a tribe of 3 companions (myTribe) and navigate layered quests across locations — including a Tavern, Forest, Lake, Mountain, Bridge, and Dungeon.

The game is built as a single-page application (SPA) with JavaScript-driven screen navigation, companion logic, and game state management.

## Features

- Multi-screen SPA navigation with no page reloads
- myTribe companion system with 3 unique characters
- Layered quest progression across multiple locations
- Save/load game functionality
- Mobile-first responsive design
- Built with Cordova/Monaca for native mobile deployment

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Apache Cordova (via Monaca)

## Project Structure

```
QuestNow/
├── index.html          # Main app shell and all screens
├── css/
│   └── style.css       # Custom styles and theme
├── js/
│   └── maincode.js     # Game logic, navigation, state
└── components/         # Monaca/Cordova loader files
```

## Getting Started

### Local development

Open `index.html` with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code for quick previews.

> Note: `cordova.js` and `components/loader.js` are injected by the Monaca build environment and will not resolve locally — this is expected.

### Mobile build

This project is managed via [Monaca](https://monaca.io). Import the project into Monaca to build and deploy to iOS or Android.

## Screens

| Screen | ID | Description |
|---|---|---|
| Welcome | `#pgWelcome` | Title screen with Start / Load options |
| New Game | `#pgGameStart` | Player name and email setup |
| Load Game | `#pgLoadGame` | Tribe and saved game selection |
| Tavern | `#pgTavern` | Aesop's Tavern hub |
| Forest | `#pgForest` | Forest quest location |
| Lake | `#pgLake` | Lake quest location |
| Mountain | `#pgMountain` | Mountain quest location |
| Bridge | `#pgBridge` | Bridge quest location |
| Dungeon | `#pgDungeon` | Dungeon quest location |
| Settings | `#pgSettings` | App settings |

## License

Copyright 2026 J. Summers. All rights reserved.
