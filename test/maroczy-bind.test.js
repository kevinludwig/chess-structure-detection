'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('Maroczy Bind', () => {
  it('Sicilian Accelerated Dragon reaches Maroczy Bind after 1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 d6', () => {
    const moves = ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'g6', 'c4', 'd6'];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Maroczy Bind');
  });

  it('Queen\'s Indian reaches Maroczy Bind after 1. d4 Nf6 2. c4 e6 3. Nf3 b6 ... Nxd4', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'e6', 'Nf3', 'b6', 'a3', 'Ba6', 'Qc2', 'Bb7',
      'Nc3', 'c5', 'e4', 'cxd4', 'Nxd4',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Maroczy Bind');
  });

  it('King\'s Indian Sämisch (f3) reaches Maroczy Bind after 1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 c5 7. Nge2 cxd4 8. Nxd4', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O',
      'Be3', 'c5', 'Nge2', 'cxd4', 'Nxd4',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Maroczy Bind');
  });

  it('King\'s Indian Gligoric (Be2 Bg5) reaches Maroczy Bind after 1. d4 Nf6 2. c4 g6 ... dxc5 Qa5 Bd2 Qxc5', () => {
    const moves = [
      'd4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Be2', 'O-O',
      'Bg5', 'c5', 'dxc5', 'Qa5', 'Bd2', 'Qxc5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Maroczy Bind');
  });

  it('Sicilian Bb5 (Moscow) reaches Maroczy Bind after 1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Qxd4 Nc6 5. Bb5 Bd7 6. Bxc6 Bxc6 7. c4', () => {
    const moves = [
      'e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Qxd4', 'Nc6', 'Bb5', 'Bd7',
      'Bxc6', 'Bxc6', 'c4',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'Maroczy Bind');
  });
});
