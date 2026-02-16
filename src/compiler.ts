import { squareNameToBitboard, getFileMask, getRankMask } from "bitboard-chess";
import {
  StructureDefinition,
  CompiledStructure,
  CompiledZone,
  RegionDef,
} from "./types";

export function compileStructure(
  name: string,
  def: StructureDefinition
): CompiledStructure {
  const white = def.white ?? {};
  const black = def.black ?? {};

  const whiteRequired = bitmaskFromSquares(white.requiredSquares ?? []);
  const whiteForbidden = bitmaskFromSquares(white.forbiddenSquares ?? []);
  const blackRequired = bitmaskFromSquares(black.requiredSquares ?? []);
  const blackForbidden = bitmaskFromSquares(black.forbiddenSquares ?? []);

  const whiteRegions = zonesFromRegionDefs([
    ...(white.requiredRegions ?? []),
    ...(white.forbiddenRegions ?? []),
  ]);
  const blackRegions = zonesFromRegionDefs([
    ...(black.requiredRegions ?? []),
    ...(black.forbiddenRegions ?? []),
  ]);

  return {
    name,
    colorFlip: def.colorFlip,
    whiteRequired,
    whiteForbidden,
    blackRequired,
    blackForbidden,
    whiteRegions,
    blackRegions,
  };
}

function bitmaskFromSquares(squares: string[]): bigint {
  return squares.reduce((acc, sq) => acc | squareNameToBitboard(sq), 0n);
}

function zonesFromRegionDefs(defs: RegionDef[]): CompiledZone[] {
  return defs.map((r) => {
    const fileMask = r.files.reduce((acc, f) => acc | getFileMask(f), 0n);
    const rankMask = r.ranks.reduce((acc, rank) => acc | getRankMask(rank), 0n);
    const mask = fileMask & rankMask;
    return { mask, min: r.min, max: r.max };
  });
}
