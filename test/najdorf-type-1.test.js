'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Najdorf Type 1', () => {
  it('Sicilian Najdorf (Be3) reaches Najdorf Type 1 after 1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3 b5 9. Qd2 Nbd7 10. Nd5 Bxd5 11. exd5', () => {
    const moves = [
      'e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6',
      'Be3', 'e5', 'Nb3', 'Be6', 'f3', 'b5', 'Qd2', 'Nbd7', 'Nd5', 'Bxd5', 'exd5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Najdorf Type 1');
  });

  it('Sicilian Najdorf (h3 g4) reaches Najdorf Type 1 after 1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. h3 e5 7. Nde2 h5 8. g4 Be6 9. Bg2 Nbd7 10. Be3 b5 11. Nd5 Bxd5 12. exd5', () => {
    const moves = [
      'e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6',
      'h3', 'e5', 'Nde2', 'h5', 'g4', 'Be6', 'Bg2', 'Nbd7', 'Be3', 'b5',
      'Nd5', 'Bxd5', 'exd5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Najdorf Type 1');
  });
});
