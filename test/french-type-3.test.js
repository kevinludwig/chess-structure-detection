'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('French Type 3', () => {
  it('Caro-Kann (2. d4 d5 3. e5 Bf5 4. Be3 e6 ... 8. Nf3 Rc8) reaches French Type 3 after 1. e4 c6 2. d4 d5 3. e5 Bf5 4. Be3 e6 5. Nd2 Nd7 6. Ngf3 Bg6 7. Nxg6 hxg6 8. Nf3 Rc8', () => {
    const moves = [
      'e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Be3', 'e6', 'Nd2', 'Nd7',
      'Ngf3', 'Bg6', 'Nxg6', 'hxg6', 'Nf3', 'Rc8',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'French Type 3');
  });

  it('French Advance (3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. a3 c4) reaches French Type 3 after 1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. a3 c4', () => {
    const moves = [
      'e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Qb6',
      'a3', 'c4',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'French Type 3');
  });
});
