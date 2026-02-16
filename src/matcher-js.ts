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

  for (const r of s.regions) {
    const w = popcount(whitePawns & r.mask);
    const b = popcount(blackPawns & r.mask);

    if (r.whiteOp && !evalOp(w, r.whiteOp, r.whiteValue!)) return false;
    if (r.blackOp && !evalOp(b, r.blackOp, r.blackValue!)) return false;
  }

  return true;
}

function popcount(bb: bigint): number {
  return bb.toString(2).split("1").length - 1;
}

function evalOp(a: number, op: string, b: number): boolean {
  switch (op) {
    case "==": return a === b;
    case "!=": return a !== b;
    case ">": return a > b;
    case ">=": return a >= b;
    case "<": return a < b;
    case "<=": return a <= b;
  }
  return false;
}
