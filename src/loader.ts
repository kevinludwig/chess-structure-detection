import { StructureDefinition, CompiledStructure } from "./types";
import { compileStructure } from "./compiler";

const compiled = new Map<string, CompiledStructure>();

export function loadStructures(defs: Record<string, StructureDefinition>) {
  compiled.clear();
  for (const [name, def] of Object.entries(defs)) {
    compiled.set(name, compileStructure(name, def));
  }
}

export function getCompiledStructures() {
  return compiled;
}

export function getStructure(name: string) {
  return compiled.get(name);
}
