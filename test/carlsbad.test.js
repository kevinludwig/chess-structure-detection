'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Carlsbad', () => {
  it('Queen\'s Gambit Declined Exchange reaches Carlsbad after 1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 Be7 6. e3 c6', () => {
    const moves = [
      'd4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'Be7',
      'e3', 'c6',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Carlsbad');
  });

  it('Caro-Kann Exchange reaches Carlsbad after 1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Bd3 Nf6 5. c3 Nc6 6. Bf4 e6 7. Nf3', () => {
    const moves = [
      'e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'Bd3', 'Nf6', 'c3', 'Nc6',
      'Bf4', 'e6', 'Nf3',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Carlsbad');
  });
});
