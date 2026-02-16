// JSON schema (authoring format)

export interface RegionDef {
  files: string[];
  ranks: number[];
  min: number;
  max: number;
}

export interface ColorDef {
  requiredSquares?: string[];
  forbiddenSquares?: string[];
  requiredRegions?: RegionDef[];
  forbiddenRegions?: RegionDef[];
}

export interface StructureDefinition {
  colorFlip: boolean;
  white: ColorDef;
  black: ColorDef;
}

// Compiled form (bitmasks + region constraints for matching)

export interface CompiledZone {
  mask: bigint;
  min: number;
  max: number;
}

export interface CompiledStructure {
  name: string;
  colorFlip: boolean;

  whiteRequired: bigint;
  whiteForbidden: bigint;
  blackRequired: bigint;
  blackForbidden: bigint;

  whiteRegions: CompiledZone[];
  blackRegions: CompiledZone[];
}

export interface PositionSnapshot {
  whitePawns: bigint;
  blackPawns: bigint;
}
