import { loadStructures, detectStructures, getStructure } from "./api";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const _require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const structures = _require(path.join(__dirname, "..", "data", "structures.json")) as Record<string, import("./types").StructureDefinition>;

// Auto-load at module import time
loadStructures(structures);

export { detectStructures, getStructure };
export * from "./types";
