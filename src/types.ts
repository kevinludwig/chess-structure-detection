// JSON schema (authoring format)
export interface StructureDefinition {
  allowColorFlip: boolean;

  squares: {
    white: {
      required: string[];
      forbidden: string[];
      optional: string[];
    };
    black: {
      required: string[];
      forbidden: string[];
      optional: string[];
    };
  };

  regions: RegionDefinition[];
}

export interface RegionDefinition {
  name: string;
  files: string[];
  ranks: number[];
  whiteCount?: CountConstraint;
  blackCount?: CountConstraint;
}

export interface CountConstraint {
  op: "==" | "!=" | ">" | ">=" | "<" | "<=";
  value: number;
}

// Compiled form (what C++ receives)
export interface CompiledStructure {
  name: string;
  allowColorFlip: boolean;

  whiteRequired: bigint;
  whiteForbidden: bigint;
  blackRequired: bigint;
  blackForbidden: bigint;

  regions: CompiledRegion[];
}

export interface CompiledRegion {
  mask: bigint;
  whiteOp?: string;
  whiteValue?: number;
  blackOp?: string;
  blackValue?: number;
}

export interface PositionSnapshot { whitePawns: bigint; blackPawns: bigint; }