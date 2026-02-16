import { squareNameToBitboard, getFileMask, getRankMask } from "bitboard-chess";
import {StructureDefinition, CompiledStructure} from "./types";

export function compileStructure(name: string, def: StructureDefinition): CompiledStructure {
  const whiteRequired = bitmaskFromSquares(def.squares.white.required);
  const whiteForbidden = bitmaskFromSquares(def.squares.white.forbidden);
  const blackRequired = bitmaskFromSquares(def.squares.black.required);
  const blackForbidden = bitmaskFromSquares(def.squares.black.forbidden);

  const regions = def.regions.map(r => {
    const fileMask = r.files.reduce((acc, f) => acc | getFileMask(f), 0n);
    const rankMask = r.ranks.reduce((acc, r) => acc | getRankMask(r), 0n);
    const mask = fileMask & rankMask;

    return {
      mask,
      whiteOp: r.whiteCount?.op,
      whiteValue: r.whiteCount?.value,
      blackOp: r.blackCount?.op,
      blackValue: r.blackCount?.value
    };
  });

  return {
    name,
    allowColorFlip: def.allowColorFlip,
    whiteRequired,
    whiteForbidden,
    blackRequired,
    blackForbidden,
    regions
  };
}

function bitmaskFromSquares(squares: string[]): bigint {
  return squares.reduce((acc, sq) => acc | squareNameToBitboard(sq), 0n);
}
