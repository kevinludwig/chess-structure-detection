'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Slav Formation', () => {
  it('Slav Defense reaches Slav Formation after 1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 ... Qb3', () => {
    const moves = [
      'd4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5',
      'e3', 'e6', 'Bxc4', 'Bb4', 'O-O', 'Nbd7', 'Qb3',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Slav Formation');
  });

  it('Catalan (Open) reaches Slav Formation after 1. Nf3 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. O-O O-O 6. d4 dxc4 ... Rad1 c6', () => {
    const moves = [
      'Nf3', 'Nf6', 'c4', 'e6', 'g3', 'd5', 'Bg2', 'Be7', 'O-O', 'O-O',
      'd4', 'dxc4', 'Qc2', 'a6', 'a4', 'Bd7', 'Qxc4', 'Bc6', 'Bf4', 'a5',
      'Nc3', 'Na6', 'Ne5', 'Bxg2', 'Kxg2', 'Nd5', 'Rad1', 'c6',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Slav Formation');
  });

  it('1. d4 Nf6 2. Nf3 d5 3. e3 c5 (Colle / QGD) reaches Slav Formation after 4. c3 Bg4 5. Bd3 e6 6. O-O Nc6 7. dxc5 Bxc5', () => {
    const moves = [
      'd4', 'Nf6', 'Nf3', 'd5', 'e3', 'c5', 'c3', 'Bg4', 'Bd3', 'e6',
      'O-O', 'Nc6', 'dxc5', 'Bxc5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Slav Formation');
  });
});
