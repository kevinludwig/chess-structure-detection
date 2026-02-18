'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('French Type 1', () => {
  it('French (2. d3 ... 10. e5 Nd7 11. d4 f6 12. exf6 Nxf6) reaches French Type 1 after 1. e4 e6 2. d3 d5 3. Nd2 c5 4. g3 Nf6 5. Bg2 Nc6 6. Ngf3 g6 7. O-O Bg7 8. c3 O-O 9. Re1 Re8 10. e5 Nd7 11. d4 f6 12. exf6 Nxf6', () => {
    const moves = [
      'e4', 'e6', 'd3', 'd5', 'Nd2', 'c5', 'g3', 'Nf6', 'Bg2', 'Nc6',
      'Ngf3', 'g6', 'O-O', 'Bg7', 'c3', 'O-O', 'Re1', 'Re8', 'e5', 'Nd7',
      'd4', 'f6', 'exf6', 'Nxf6',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'French Type 1');
  });

  it('French (Steinitz 3. e5 Nfd7 4. d4 ... 10. exf6 Bxf6) reaches French Type 1 after 1. e4 Nf6 2. Nc3 d5 3. e5 Nfd7 4. d4 c5 5. Nf3 e6 6. Ne2 Nc6 7. c3 Be7 8. a3 O-O 9. g3 f6 10. exf6 Bxf6 11. Bg2', () => {
    const moves = [
      'e4', 'Nf6', 'Nc3', 'd5', 'e5', 'Nfd7', 'd4', 'c5', 'Nf3', 'e6',
      'Ne2', 'Nc6', 'c3', 'Be7', 'a3', 'O-O', 'g3', 'f6', 'exf6', 'Bxf6',
      'Bg2',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'French Type 1');
  });
});
