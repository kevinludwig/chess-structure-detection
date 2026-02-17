'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Grunfeld Exchange Center', () => {
  it('Grunfeld Defense Exchange reaches Grunfeld Exchange Center after 1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. cxd5 Nxd5 6. e4 Nxc3 7. bxc3 c5 8. Rb1 O-O', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'd5', 'Nf3', 'Bg7', 'cxd5', 'Nxd5',
      'e4', 'Nxc3', 'bxc3', 'c5', 'Rb1', 'O-O',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Grunfeld Exchange Center');
  });
});
