import { CompiledStructure, PositionSnapshot } from "./types";

export function matchStructureJS(
  pos: PositionSnapshot,
  s: CompiledStructure
): boolean {
  const { whitePawns, blackPawns } = pos;

  if ((whitePawns & s.whiteRequired) !== s.whiteRequired) return false;
  if ((blackPawns & s.blackRequired) !== s.blackRequired) return false;

  if (whitePawns & s.whiteForbidden) return false;
  if (blackPawns & s.blackForbidden) return false;

  for (const z of s.whiteRegions) {
    const count = popcount(whitePawns & z.mask);
    if (count < z.min || count > z.max) return false;
  }

  for (const z of s.blackRegions) {
    const count = popcount(blackPawns & z.mask);
    if (count < z.min || count > z.max) return false;
  }

  return true;
}

function popcount(bb: bigint): number {
  return bb.toString(2).split("1").length - 1;
}
