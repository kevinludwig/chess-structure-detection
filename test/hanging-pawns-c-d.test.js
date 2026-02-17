'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Hanging Pawns (c-d)', () => {
  it('Sicilian c3 (Alapin) reaches Hanging Pawns (c-d) after e5 Nd5 d4 cxd4 ... Qe2 Bb7', () => {
    const moves = [
      'e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'cxd4', 'e6',
      'Nf3', 'd6', 'exd6', 'Bxd6', 'Nc3', 'Nxc3', 'bxc3', 'O-O', 'Bd3', 'a6',
      'O-O', 'b5', 'Qe2', 'Bb7',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Hanging Pawns (c-d)');
  });

  it('Catalan reaches Hanging Pawns (c-d) after g3 Bb4+ Bd2 ... dxc5 bxc5 Nb3', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'e6', 'g3', 'Bb4+', 'Bd2', 'Bxd2+', 'Nxd2', 'd5',
      'Bg2', 'O-O', 'Ng1f3', 'b6', 'O-O', 'Bb7', 'Rc1', 'Nbd7', 'cxd5', 'exd5',
      'Ne5', 'c5', 'Nxd7', 'Nxd7', 'dxc5', 'bxc5', 'Nb3',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Hanging Pawns (c-d)');
  });
});
