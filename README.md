# Overview

Detect chess pawn structures and attributes (including central majorities / pawn majorities) from a bitboard representation. Definitions are authored in JSON; the library compiles them to bitmasks and matches positions using either a **JavaScript** matcher or an optional **native (C++)** addon for better performance.

## Architecture

- **JSON definitions** (`data/structures.json`) describe named structures per color: **requiredSquares** (a pawn of that color must be on each square), **forbiddenSquares** (no pawn of that color on those squares), and **requiredRegions** / **forbiddenRegions** (zones with `min`/`max` pawn counts, e.g. `min: 0, max: 0` = no pawns in that zone).
- **Compiler** (`src/compiler.ts`) turns these definitions into a compiled form (bitboard masks and zone constraints) using `bitboard-chess`.
- **Matcher**: `detectStructures(position)` uses the **native addon** (`native/matcher.cpp` + N-API binding) when built; otherwise it falls back to the **JavaScript matcher** (`src/matcher-js.ts`) with the same semantics.

## Building the native addon

Requires [node-gyp](https://github.com/nodejs/node-gyp) (build tools: Visual Studio on Windows, Xcode on macOS, or build-essential on Linux).

```bash
npm install
npm run build
```

The addon is written to `build/Release/chess-structure-detection.node`. If it is missing, the package uses the JavaScript matcher automatically.

## JSON format

Each structure has **colorFlip** (whether the structure can be matched with colors reversed) and **white** / **black** objects. Each color may define:

- **requiredSquares** – A pawn of that color must exist on each of these squares (e.g. `["d4", "c4"]`).
- **forbiddenSquares** – No pawn of that color may be on any of these squares.
- **requiredRegions** – List of zones where pawn count must lie between `min` and `max` (inclusive). E.g. exactly one pawn in the c-file on ranks 2–4: `{ "files": ["c"], "ranks": [2,3,4], "min": 1, "max": 1 }`.
- **forbiddenRegions** – Same shape; typically `min: 0, max: 0` to forbid pawns in a zone. E.g. no pawns on the e-file from ranks 2–7: `{ "files": ["e"], "ranks": [2,3,4,5,6,7], "min": 0, "max": 0 }`.

All fields are optional; omit or use empty arrays/objects as needed.

```json
{
  "Slav Formation": {
    "colorFlip": true,
    "white": {
      "requiredSquares": ["d4"],
      "forbiddenRegions": [
        { "files": ["c"], "ranks": [2,3,4,5,6,7], "min": 0, "max": 0 }
      ]
    },
    "black": {
      "requiredSquares": ["d5", "c6"]
    }
  }
}
```
## Example Usage

```js
import { detectStructures } from "chess-structure-detection";
import { BitboardChess } from "bitboard-chess";

const chess = new BitboardChess();
chess.loadFromFEN("r2qkb1r/pp1n1ppp/2p1pn2/5b2/P1BP4/2N1PN2/1P3PPP/R1BQK2R w KQkq - 1 8");
const position = chess.getPosition(); // { whitePawns, blackPawns }
const matches = detectStructures(position);

console.log(matches); // e.g. ["Slav"]
```

## Public API

- **`loadStructures(defs)`** – Load (or replace) structure definitions from a `Record<string, StructureDefinition>`. Called automatically with `data/structures.json` on import.
- **`detectStructures(position: PositionSnapshot): string[]`** – Returns names of all structures that match the given `{ whitePawns, blackPawns }` position.
- **`getStructure(name: string)`** – Returns the compiled structure for a name, or `undefined`.
- **Types** – `StructureDefinition`, `CompiledStructure`, `PositionSnapshot`, etc. are re-exported from the package.

The native addon is optional: if `build/Release/chess-structure-detection.node` is not present, matching uses the JavaScript implementation with the same behavior.
