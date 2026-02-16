'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('IQP', () => {
  it('reaches IQP after QGA line (c4 dxc4 ... exd4 b5 a4 b4 Nbd2)', () => {
    const moves = [
      'd4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'Be7',
      'O-O', 'a6', 'Bb3', 'c5', 'Qe2', 'cxd4', 'exd4', 'b5', 'a4', 'b4', 'Nbd2',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'IQP');
  });

  it('reaches IQP after 1. d4 d5 2. c4 e6 3. Nc3 c5 ... cxd4 Nxd4 Bg5', () => {
    const moves = [
      'd4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6',
      'g3', 'cxd4', 'Nxd4', 'Be7', 'O-O', 'O-O', 'Bg5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'IQP');
  });
});
