'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Asymmetric Benoni', () => {
  it('Queen\'s Pawn / Benoni (4. d5 exd5 5. cxd5) reaches Asymmetric Benoni after 1. d4 Nf6 2. c4 e6 3. Nc3 c5 4. d5 exd5 5. cxd5 d6 6. Nf3 g6 7. Bf4', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'e6', 'Nc3', 'c5', 'd5', 'exd5', 'cxd5', 'd6',
      'Nf3', 'g6', 'Bf4',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Asymmetric Benoni');
  });

  it('King\'s Indian Sämisch (f3) / Benoni (7. d5 e6 8. Ng3 exd5 9. cxd5) reaches Asymmetric Benoni after 1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Nge2 c5 7. d5 e6 8. Ng3 exd5 9. cxd5', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O',
      'Nge2', 'c5', 'd5', 'e6', 'Ng3', 'exd5', 'cxd5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Asymmetric Benoni');
  });
});
