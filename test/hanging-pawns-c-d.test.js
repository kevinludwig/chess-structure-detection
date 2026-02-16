'use strict';
const { describe } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const { BitboardChess } = require('bitboard-chess');

describe('Hanging Pawns (c-d)', () => {
  // N-tests: play move sequence, get position, assert detectStructures(position) includes this structure
});
