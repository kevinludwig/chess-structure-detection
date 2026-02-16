let native: any = null;

try {
  native = require("../build/Release/chess-structure-detection.node");
} catch {
  native = null;
}

export const detectStructureNative = native
  ? native.detectStructure
  : null;
