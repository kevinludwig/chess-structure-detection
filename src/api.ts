import { loadStructures, getCompiledStructures, getStructure } from "./loader";
import { matchStructureJS } from "./matcher-js";
import { detectStructureNative } from "./native";
import { PositionSnapshot } from "./types";

export function detectStructures(pos: PositionSnapshot): string[] {
  const results: string[] = [];

  for (const [name, struct] of getCompiledStructures()) {
    const match = detectStructureNative
      ? detectStructureNative(pos.whitePawns, pos.blackPawns, struct)
      : matchStructureJS(pos, struct);

    if (match) results.push(name);
  }

  return results;
}

export { loadStructures, getStructure };
