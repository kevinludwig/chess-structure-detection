'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('KID Type 3', () => {
  it('King\'s Indian (4. e4 Bd3 6. Nge2 ... 9. d5 Ne7 10. a4 f5 11. exf5 gxf5) reaches KID Type 3 after 1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Bd3 O-O 6. Nge2 Nc6 7. O-O Nh5 8. Bc2 e5 9. d5 Ne7 10. a4 f5 11. exf5 gxf5', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bd3', 'O-O',
      'Nge2', 'Nc6', 'O-O', 'Nh5', 'Bc2', 'e5', 'd5', 'Ne7', 'a4', 'f5',
      'exf5', 'gxf5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'KID Type 3');
  });

  it('King\'s Indian (Classical 6. Nf3 e5 8. d5 ... 13. Rc1 Nf6) reaches KID Type 3 after 1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Nf3 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. Nd3 f5 11. Bd2 fxe4 12. Nxe4 Nf5 13. Rc1 Nf6', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Be2', 'O-O',
      'Nf3', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ne1', 'Nd7', 'Nd3', 'f5',
      'Bd2', 'fxe4', 'Nxe4', 'Nf5', 'Rc1', 'Nf6',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'KID Type 3');
  });
});
