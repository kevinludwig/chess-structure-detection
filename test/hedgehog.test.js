'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Hedgehog', () => {
  it('Sicilian (e6) / English-style reaches Hedgehog after 1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. c4 Nf6 6. Nc3 Qc7 7. a3 b6 8. Be3 Bb7 9. f3 d6 10. Be2 Be7 11. Rc1 O-O 12. O-O', () => {
    const moves = [
      'e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6', 'c4', 'Nf6',
      'Nc3', 'Qc7', 'a3', 'b6', 'Be3', 'Bb7', 'f3', 'd6', 'Be2', 'Be7',
      'Rc1', 'O-O', 'O-O',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Hedgehog');
  });

  it('English / Symmetrical reaches Hedgehog after 1. c4 Nf6 2. Nc3 c5 3. g3 e6 4. Nf3 b6 ... e4', () => {
    const moves = [
      'c4', 'Nf6', 'Nc3', 'c5', 'g3', 'e6', 'Nf3', 'b6', 'Bg2', 'Bb7',
      'O-O', 'Be7', 'd4', 'cxd4', 'Qxd4', 'O-O', 'Rd1', 'd6', 'Bg5', 'Nc6',
      'Qd2', 'Qb8', 'h3', 'Rd8', 'Rac1', 'h6', 'Be3', 'Rd7', 'b3', 'Qf8',
      'Nd4', 'Nxd4', 'Bxd4', 'Bxg2', 'Kxg2', 'Rc8', 'e4',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Hedgehog');
  });
});
