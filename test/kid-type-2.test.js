'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('KID Type 2', () => {
  it('King\'s Indian (Fianchetto) (8. d5 Na5 9. Nd2 c5 10. e4 ... 14. exf5 gxf5) reaches KID Type 2 after 1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nc6 7. O-O Bf5 8. d5 Na5 9. Nd2 c5 10. e4 Bd7 11. Qc2 e5 12. b3 Ng4 13. Bb2 f5 14. exf5 gxf5', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'Nf3', 'd6', 'g3', 'O-O',
      'Bg2', 'Nc6', 'O-O', 'Bf5', 'd5', 'Na5', 'Nd2', 'c5', 'e4', 'Bd7',
      'Qc2', 'e5', 'b3', 'Ng4', 'Bb2', 'f5', 'exf5', 'gxf5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'KID Type 2');
  });

  it('King\'s Indian (Classical 6. Be2 e5 11. d5 ... 16. bxc5 bxc5) reaches KID Type 2 after 1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. Be3 Ng4 9. Bg5 f6 10. Bh4 Kh8 11. d5 Ne7 12. Nd2 Nh6 13. f3 c5 14. a3 b6 15. b4 f5 16. bxc5 bxc5', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O',
      'Be2', 'e5', 'O-O', 'Nc6', 'Be3', 'Ng4', 'Bg5', 'f6', 'Bh4', 'Kh8',
      'd5', 'Ne7', 'Nd2', 'Nh6', 'f3', 'c5', 'a3', 'b6', 'b4', 'f5',
      'bxc5', 'bxc5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'KID Type 2');
  });
});
