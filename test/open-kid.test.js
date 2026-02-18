'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Open KID', () => {
  it('King\'s Indian (5. d4 O-O 6. Be2 e5 ... 9. Bf1 exd4 10. Nxd4) reaches Open KID after 1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. d4 O-O 6. Be2 e5 7. O-O Nbd7 8. Re1 c6 9. Bf1 exd4 10. Nxd4 Rd8', () => {
    const moves = [
      'Nf3', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'd4', 'O-O',
      'Be2', 'e5', 'O-O', 'Nbd7', 'Re1', 'c6', 'Bf1', 'exd4', 'Nxd4', 'Rd8',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Open KID');
  });

  it('English / King\'s Indian (11. Qd2 e5 12. Rad1 exd4 13. Nxd4) reaches Open KID after 1. c4 Nf6 2. Nc3 g6 3. e4 d6 4. d4 Bg7 5. Bd3 O-O 6. Nge2 a6 7. O-O c6 8. a4 a5 9. h3 Na6 10. Be3 Nd7 11. Qd2 e5 12. Rad1 exd4 13. Nxd4 Ndc5', () => {
    const moves = [
      'c4', 'Nf6', 'Nc3', 'g6', 'e4', 'd6', 'd4', 'Bg7', 'Bd3', 'O-O',
      'Nge2', 'a6', 'O-O', 'c6', 'a4', 'a5', 'h3', 'Na6', 'Be3', 'Nd7',
      'Qd2', 'e5', 'Rad1', 'exd4', 'Nxd4', 'Ndc5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Open KID');
  });
});
