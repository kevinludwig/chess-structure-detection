'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('KID Complex Center', () => {
  it('King\'s Indian Fianchetto (7. Rb1 e5 ... 18. d4 Nf6) reaches KID Complex Center after 1. Nf3 Nf6 2. c4 g6 3. g3 Bg7 4. Bg2 d6 5. Nc3 O-O 6. O-O Nc6 7. Rb1 e5 8. b4 a6 9. d3 h6 10. Bd2 Be6 11. Qc1 Kh7 12. e4 Nh5 13. Nd5 Ne7 14. Be3 c6 15. Bb6 Qd7 16. Nc7 Rac8 17. Nxe6 Qxe6 18. d4 Nf6', () => {
    const moves = [
      'Nf3', 'Nf6', 'c4', 'g6', 'g3', 'Bg7', 'Bg2', 'd6', 'Nc3', 'O-O',
      'O-O', 'Nc6', 'Rb1', 'e5', 'b4', 'a6', 'd3', 'h6', 'Bd2', 'Be6',
      'Qc1', 'Kh7', 'e4', 'Nh5', 'Nd5', 'Ne7', 'Be3', 'c6', 'Bb6', 'Qd7',
      'Nc7', 'Rac8', 'Nxe6', 'Qxe6', 'd4', 'Nf6',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'KID Complex Center');
  });
});
