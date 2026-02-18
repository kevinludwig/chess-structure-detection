'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('3-3 vs 4-2', () => {
  it('Catalan-style (4. Bg2 b5 ... 12. e4 Nxe4 13. Nxe4 dxe4 14. Bxe4 Rb8) reaches 3-3 vs 4-2 after 1. d4 Nf6 2. Nf3 e6 3. g3 d5 4. Bg2 b5 5. O-O Nbd7 6. Bg5 Be7 7. Nbd2 c5 8. dxc5 Nxc5 9. Nd4 Bd7 10. c3 O-O 11. Bxf6 Bxf6 12. e4 Nxe4 13. Nxe4 dxe4 14. Bxe4 Rb8', () => {
    const moves = [
      'd4', 'Nf6', 'Nf3', 'e6', 'g3', 'd5', 'Bg2', 'b5', 'O-O', 'Nbd7',
      'Bg5', 'Be7', 'Nbd2', 'c5', 'dxc5', 'Nxc5', 'Nd4', 'Bd7', 'c3', 'O-O',
      'Bxf6', 'Bxf6', 'e4', 'Nxe4', 'Nxe4', 'dxe4', 'Bxe4', 'Rb8',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, '3-3 vs 4-2');
  });
});
