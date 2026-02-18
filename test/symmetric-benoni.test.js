'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Symmetric Benoni', () => {
  it('King\'s Indian / Benoni (3. d5 d6 4. Nc3 ... 11. O-O exd5 12. exd5) reaches Symmetric Benoni after 1. d4 Nf6 2. c4 c5 3. d5 d6 4. Nc3 g6 5. e4 Bg7 6. Bd3 O-O 7. Nf3 Bg4 8. h3 Bxf3 9. Qxf3 Nbd7 10. Qd1 e6 11. O-O exd5 12. exd5 Ne8 13. Bd2', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'c5', 'd5', 'd6', 'Nc3', 'g6', 'e4', 'Bg7',
      'Bd3', 'O-O', 'Nf3', 'Bg4', 'h3', 'Bxf3', 'Qxf3', 'Nbd7', 'Qd1', 'e6',
      'O-O', 'exd5', 'exd5', 'Ne8', 'Bd2',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Symmetric Benoni');
  });

  it('English / King\'s Indian (6. Bg5 c5 7. d5 e6 8. Qd2 exd5 9. exd5) reaches Symmetric Benoni after 1. c4 g6 2. d4 Nf6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Bg5 c5 7. d5 e6 8. Qd2 exd5 9. exd5 Qb6 10. Nf3 Bf5', () => {
    const moves = [
      'c4', 'g6', 'd4', 'Nf6', 'Nc3', 'Bg7', 'e4', 'd6', 'Be2', 'O-O',
      'Bg5', 'c5', 'd5', 'e6', 'Qd2', 'exd5', 'exd5', 'Qb6', 'Nf3', 'Bf5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Symmetric Benoni');
  });
});
