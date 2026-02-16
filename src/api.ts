import { loadStructures, getCompiledStructures, getStructure } from "./loader";
import { matchStructureJS } from "./matcher-js";
import { detectStructureNative } from "./native";
import { CompiledStructure, PositionSnapshot } from "./types";

/** Mirror a bitboard across the horizontal axis (rank 1 <-> rank 8, etc.). */
function mirrorBitboard(bb: bigint): bigint {
  let result = 0n;
  for (let rank = 0; rank < 8; rank++) {
    const row = (bb >> BigInt(rank * 8)) & 0xffn;
    result |= row << BigInt((7 - rank) * 8);
  }
  return result;
}

/** Position with colors swapped and boards mirrored so the structure def (white POV) can match the other color. */
function flipPosition(pos: PositionSnapshot): PositionSnapshot {
  return {
    whitePawns: mirrorBitboard(pos.blackPawns),
    blackPawns: mirrorBitboard(pos.whitePawns),
  };
}

function singleMatch(pos: PositionSnapshot, struct: CompiledStructure): boolean {
  if (detectStructureNative) {
    return detectStructureNative(pos.whitePawns, pos.blackPawns, struct);
  }
  return matchStructureJS(pos, struct);
}

export function detectStructures(pos: PositionSnapshot): string[] {
  const results: string[] = [];

  for (const [name, struct] of getCompiledStructures()) {
    let match = singleMatch(pos, struct);
    if (!match && struct.colorFlip) {
      match = singleMatch(flipPosition(pos), struct);
    }
    if (match) results.push(name);
  }

  return results;
}

export { loadStructures, getStructure };
