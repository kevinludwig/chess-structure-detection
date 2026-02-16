'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Stonewall', () => {
  it('reaches Stonewall (black) after the given move sequence', () => {
    const moves = [
      'd4', 'f5', 'g3', 'Nf6', 'Bg2', 'e6', 'Nf3', 'c6', 'O-O', 'd5',
      'Qc2', 'Bd6', 'Nbd2', 'O-O', 'b3', 'a5', 'Bb2', 'Na6',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Stonewall');
  });

  it('reaches Stonewall (white) after the given move sequence', () => {
    const moves = [
      'd4', 'd5', 'e3', 'e6', 'f4', 'Nf6', 'Nf3', 'Be7', 'Bd3', 'O-O',
      'O-O', 'c5', 'c3', 'Nc6', 'Nbd2',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Stonewall');
  });
});
