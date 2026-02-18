'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('French Type 2', () => {
  it('French Advance (4. e5 Nfd7 5. f4 ... 12. dxc5 Nxc5) reaches French Type 2 after 1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. Nf3 Nc6 7. Be3 a6 8. Qd2 b5 9. a3 Bb7 10. Bd3 Be7 11. O-O Qc7 12. dxc5 Nxc5 13. b4 Nd7', () => {
    const moves = [
      'e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'e5', 'Nfd7', 'f4', 'c5',
      'Nf3', 'Nc6', 'Be3', 'a6', 'Qd2', 'b5', 'a3', 'Bb7', 'Bd3', 'Be7',
      'O-O', 'Qc7', 'dxc5', 'Nxc5', 'b4', 'Nd7',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'French Type 2');
  });

  it('French Advance (4. e5 Nfd7 ... 14. Qe1 cxd4 15. Nxd4) reaches French Type 2 after 1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. Nf3 Nc6 7. Be3 Be7 8. Qd2 O-O 9. Be2 a6 10. O-O b5 11. Kh1 Qc7 12. a3 Bb7 13. Rad1 Rac8 14. Qe1 cxd4 15. Nxd4 Nxd4 16. Bxd4 Bc5', () => {
    const moves = [
      'e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'e5', 'Nfd7', 'f4', 'c5',
      'Nf3', 'Nc6', 'Be3', 'Be7', 'Qd2', 'O-O', 'Be2', 'a6', 'O-O', 'b5',
      'Kh1', 'Qc7', 'a3', 'Bb7', 'Rad1', 'Rac8', 'Qe1', 'cxd4', 'Nxd4', 'Nxd4',
      'Bxd4', 'Bc5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'French Type 2');
  });

  it('English / Reversed (2. ... e5 5. cxd5 ... 13. d4 e4) reaches French Type 2 after 1. c4 Nf6 2. Nc3 e5 3. Nf3 Nc6 4. d3 d5 5. cxd5 Nxd5 6. e3 Be7 7. Be2 O-O 8. O-O Be6 9. a3 a5 10. Qc2 f5 11. Na4 Qd6 12. Rd1 Rad8 13. d4 e4 14. Nd2 Bf7 15. Nc3 Qh6', () => {
    const moves = [
      'c4', 'Nf6', 'Nc3', 'e5', 'Nf3', 'Nc6', 'd3', 'd5', 'cxd5', 'Nxd5',
      'e3', 'Be7', 'Be2', 'O-O', 'O-O', 'Be6', 'a3', 'a5', 'Qc2', 'f5',
      'Na4', 'Qd6', 'Rd1', 'Rad8', 'd4', 'e4', 'Nd2', 'Bf7', 'Nc3', 'Qh6',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'French Type 2');
  });
});
