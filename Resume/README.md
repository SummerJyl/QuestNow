# Quest to Now

A browser-based mobile adventure game built with vanilla HTML, CSS, and JavaScript.

## About

Quest to Now is a single-page mobile RPG where players create a tribe of 3 companions (myTribe) and battle their way through 6 locations to claim a region and complete their quest.

Players name their hero, generate a randomized tribe with unique stats, weapons, and classes, then navigate through progressively challenging encounters — culminating in a combined tribe attack against a final boss in the Dungeon.

## Gameplay

```
Welcome → New Game → Aesop's Tavern → Forbidden Forest
                                              ↓
                                    Lake | Mountain | Bridge (random)
                                              ↓
                                           Dungeon (final boss)
```

### Locations

| Location         | Type       | Challenge                                   |
| ---------------- | ---------- | ------------------------------------------- |
| Aesop's Tavern   | Battle     | Challenge an opponent to a contest of STATS |
| Forbidden Forest | Choice     | Ask a wise sage for HP or MP boost          |
| Eel Lake         | Battle     | Defeat a mini-boss with your tribe          |
| Monty Mountain   | Battle     | Defeat a mini-boss, earn gold               |
| The Bridge       | Battle     | Defeat a mini-boss, earn gold               |
| The Dungeon      | Final Boss | Combined tribe attack to claim a region     |

### myTribe System

Each playthrough generates 3 unique characters with randomized:

- Stats: HP, STR, SPD, MP, LUK
- Weapons: Sword, Staff, Club, Bow, Slingshot, Magic Wand
- Classes: Knight, Healer, Magician, Ninja, Jester, Farmer, Noble, Sage

### Winning

Defeat the final boss in the Dungeon using your tribe's combined STR to claim one of 6 regions: Haus, Verdania, Stonekeep, Ironmoor, Duskfen, or Cresthaven.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Apache Cordova (via Monaca) for mobile deployment

## Project Structure

```
www/
├── Resume/                  ← production version
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── maincode.js
│   ├── images/              ← level artwork + branding
│   └── components/          ← Monaca/Cordova loader files
└── Dev/                     ← development version
    └── ...
```

## Local Development

Open `Resume/index.html` with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.

> Note: `cordova.js` and `components/loader.js` are injected by the Monaca build environment and will not resolve locally — this is expected behavior.

## Mobile Build

This project is built and deployed via [Monaca](https://monaca.io). Import the project into Monaca to build for iOS or Android.

## Save System

Game progress is saved to `localStorage` using the player's email as a unique key. Multiple saved games are supported on the same device.

## License

Copyright 2026 J. Summers. All rights reserved.

Copyright 2026 J. Summers. All rights reserved.
