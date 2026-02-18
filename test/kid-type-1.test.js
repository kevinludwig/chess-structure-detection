'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('KID Type 1', () => {
  it('Catalan / QGD (10. e4 e5 11. d5 ... 14. Nxd6 cxd6) reaches KID Type 1 after 1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Bb4+ 5. Nd2 O-O 6. Nf3 dxc4 7. Qc2 Nc6 8. Qxc4 Bd6 9. O-O Qe7 10. e4 e5 11. d5 Nb8 12. Qc2 Nbd7 13. Nc4 Nb6 14. Nxd6 cxd6 15. a4', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'e6', 'g3', 'd5', 'Bg2', 'Bb4+', 'Nd2', 'O-O',
      'Ngf3', 'dxc4', 'Qc2', 'Nc6', 'Qxc4', 'Bd6', 'O-O', 'Qe7', 'e4', 'e5',
      'd5', 'Nb8', 'Qc2', 'Nbd7', 'Nc4', 'Nb6', 'Nxd6', 'cxd6', 'a4',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'KID Type 1');
  });

  it('King\'s Indian Sämisch (f3) (6. Nge2 e5 9. d5 ... 11. cxd5) reaches KID Type 1 after 1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Nge2 e5 7. Bg5 c6 8. Qd2 Nbd7 9. d5 h6 10. Be3 cxd5 11. cxd5 a6', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O',
      'Nge2', 'e5', 'Bg5', 'c6', 'Qd2', 'Nbd7', 'd5', 'h6', 'Be3', 'cxd5',
      'cxd5', 'a6',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'KID Type 1');
  });
});
