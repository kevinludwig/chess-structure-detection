'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Panov', () => {
  it('Slav / QGD (8. Bd3 c5 ... 13. c5) reaches Panov after 1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Qb3 Qb6 5. Qc2 Bg4 6. Nbd2 Nbd7 7. e3 e6 8. Bd3 c5 9. b3 Be7 10. Bb2 Qc7 11. O-O cxd4 12. exd4 O-O 13. c5', () => {
    const moves = [
      'd4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Qb3', 'Qb6', 'Qc2', 'Bg4',
      'Nbd2', 'Nbd7', 'e3', 'e6', 'Bd3', 'c5', 'b3', 'Be7', 'Bb2', 'Qc7',
      'O-O', 'cxd4', 'exd4', 'O-O', 'c5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Panov');
  });

  it('Alekhine (4. d4 d6 5. exd6 cxd6 ... 12. c5 Nc8) reaches Panov after 1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. d4 d6 5. exd6 cxd6 6. Nc3 g6 7. Be3 Bg7 8. Nf3 O-O 9. Be2 Nc6 10. O-O Bg4 11. b3 d5 12. c5 Nc8', () => {
    const moves = [
      'e4', 'Nf6', 'e5', 'Nd5', 'c4', 'Nb6', 'd4', 'd6', 'exd6', 'cxd6',
      'Nc3', 'g6', 'Be3', 'Bg7', 'Nf3', 'O-O', 'Be2', 'Nc6', 'O-O', 'Bg4',
      'b3', 'd5', 'c5', 'Nc8',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Panov');
  });
});
