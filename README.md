# Overview

Detect chess pawn structures and attributes (including central majorities / pawn majorities) from a bitboard representation. Definitions are authored in JSON; the library compiles them to bitmasks and matches positions using either a **JavaScript** matcher or an optional **native (C++)** addon for better performance.

## Architecture

- **JSON definitions** (`data/structures.json`) describe named structures: required/forbidden pawn squares per color and **regions** (e.g. center) with count constraints (e.g. white ≥ 2, black ≤ 1 for a center majority).
- **Compiler** (`src/compiler.ts`) turns these definitions into a compiled form (bitboard masks) using `bitboard-chess`.
- **Matcher**: `detectStructures(position)` uses the **native addon** (`native/matcher.cpp` + N-API binding) when built; otherwise it falls back to the **JavaScript matcher** (`src/matcher-js.ts`) with the same semantics.

## Building the native addon

Requires [node-gyp](https://github.com/nodejs/node-gyp) (build tools: Visual Studio on Windows, Xcode on macOS, or build-essential on Linux).

```bash
npm install
npm run build
```

The addon is written to `build/Release/chess-structure-detection.node`. If it is missing, the package uses the JavaScript matcher automatically.

## JSON Format of Chess structures
```JSON
{
  "Slav": {
    "allowColorFlip": true,

    "squares": {
      "white": {
        "required": ["d4", "c4"],
        "forbidden": [],
        "optional": []
      },
      "black": {
        "required": ["c6", "e6"],
        "forbidden": ["d7", "d6"],
        "optional": []
      }
    },

    "regions": [
      {
        "name": "centerMajority",
        "files": ["c", "d", "e"],
        "ranks": [3, 4, 5],
        "whiteCount": { "op": ">=", "value": 2 },
        "blackCount": { "op": "<=", "value": 1 }
      }
    ]
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
