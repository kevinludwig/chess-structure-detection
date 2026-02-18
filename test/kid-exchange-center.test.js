'use strict';
const { describe, it } = require('node:test');
const { detectStructures, getStructure } = require('../src/index.ts');
const bitboardChess = require('bitboard-chess');
const { playSequenceAndAssertStructure } = require('./helpers.js');

const Chess = bitboardChess.default ?? bitboardChess;

describe('KID Exchange Center', () => {
  it('King\'s Indian (6. Be2 e5 7. dxe5 dxe5 ... 10. Nd5 c6) reaches KID Exchange Center after 1. c4 g6 2. Nf3 Bg7 3. Nc3 d6 4. d4 Nf6 5. e4 O-O 6. Be2 e5 7. dxe5 dxe5 8. Qxd8 Rxd8 9. Bg5 Nbd7 10. Nd5 c6 11. Ne7 Kf8 12. Nxc8 Rdxc8 13. O-O-O Nc5', () => {
    const moves = [
      'c4', 'g6', 'Nf3', 'Bg7', 'Nc3', 'd6', 'd4', 'Nf6', 'e4', 'O-O',
      'Be2', 'e5', 'dxe5', 'dxe5', 'Qxd8', 'Rxd8', 'Bg5', 'Nbd7', 'Nd5', 'c6',
      'Ne7', 'Kf8', 'Nxc8', 'Rdxc8', 'O-O-O', 'Nc5',
    ];
    playSequenceAndAssertStructure(Chess, moves, detectStructures, 'KID Exchange Center');
  });
});
