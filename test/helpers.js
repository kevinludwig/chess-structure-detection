'use strict';

/**
 * Play a sequence of SAN moves and assert structure detection behavior.
 * Checks for a structure match after every half-move.
 *
 * Positive test: throws if the structure is never matched by the end of the sequence.
 * Negative test (options.negative === true): throws if the structure is ever matched.
 *
 * @param {import('bitboard-chess').default} Chess - BitboardChess constructor
 * @param {string[]} movesSan - Array of SAN moves (e.g. ['d4', 'f5', 'g3', ...])
 * @param {Function} detectStructures - (position) => string[]
 * @param {string} structureName - Expected structure name (e.g. 'Stonewall')
 * @param {{ negative?: boolean }} options - If negative: true, throws if the structure is ever matched.
 */
function playSequenceAndAssertStructure(Chess, movesSan, detectStructures, structureName, options = {}) {
  const negative = options.negative === true;
  const chess = new Chess();

  for (let i = 0; i < movesSan.length; i++) {
    const san = movesSan[i];
    const ok = chess.makeMoveSAN(san);
    if (!ok) {
      throw new Error(`Failed to play move ${i + 1}: ${san}`);
    }
    const position = chess.getPosition();
    const matches = detectStructures(position);
    const hasStructure = matches.includes(structureName);

    if (negative) {
      if (hasStructure) {
        throw new Error(`Negative test: structure "${structureName}" was matched after move ${i + 1} (${san})`);
      }
    } else {
      if (hasStructure) {
        return; // success
      }
    }
  }

  // End of sequence
  if (negative) {
    return; // success: never matched
  }
  throw new Error(`Structure "${structureName}" was never matched after ${movesSan.length} half-moves`);
}

module.exports = { playSequenceAndAssertStructure };
