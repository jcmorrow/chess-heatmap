import Move from './Move';
import Fen from './Fen';
import { invalidMove } from './Utilities';

it('calculates moves, captures, and threatens for a pawn', () => {
  let spaces = Fen.parse('8/8/8/8/8/2p5/1P6/8 w KQkq - 0 1');

  expect(Move.moves(spaces[Fen.index('b2')], spaces)).toEqual(
    {
      color: 'black',
      file: 'b',
      index: 49,
      rank: 2,
      piece: 'P',
      moves: [ Fen.index('b3'), Fen.index('b4') ].sort(),
      captures: [ Fen.index('c3') ],
      threatens: [ Fen.index('c3'), Fen.index('a3') ].sort(),
    }
  );
});

it('calculates moves, captures, and threatens for a bishop', () => {
  let spaces = Fen.parse('8/8/8/8/3p4/2B5/8/8 w KQkq - 0 1');

  expect(Move.moves(spaces[Fen.index('c3')], spaces)).toEqual(
    {
      color: 'black',
      file: 'c',
      index: 42,
      rank: 3,
      piece: 'B',
      moves: [ 'a1', 'a5', 'b2', 'b4', 'd2', 'e1' ].map(Fen.index).sort(),
      captures: [ Fen.index('d4') ],
      threatens: [ 'a1', 'a5', 'b2', 'b4', 'd2', 'd4', 'e1' ].map(Fen.index).sort(),
    }
  );
});

it('rejects invalid moves', () => {
  expect(invalidMove(1, 0, 7)).toEqual(true);
  expect(invalidMove(1, 0, 6)).toEqual(false);

  expect(invalidMove(1, 0, 63)).toEqual(true);
  expect(invalidMove(1, 0, 62)).toEqual(false);

  expect(invalidMove(-1, 0, 0)).toEqual(true);
  expect(invalidMove(-1, 0, 1)).toEqual(false);

  expect(invalidMove(-1, 0, 56)).toEqual(true);
  expect(invalidMove(-1, 0, 57)).toEqual(false);

  expect(invalidMove(0, -1, 56)).toEqual(true);
  expect(invalidMove(0, -1, 48)).toEqual(false);

  expect(invalidMove(0, -1, 63)).toEqual(true);
  expect(invalidMove(0, -1, 55)).toEqual(false);

  expect(invalidMove(0, 1, 7)).toEqual(true);
  expect(invalidMove(0, 1, 0)).toEqual(true);

  expect(invalidMove(2, 0, 6)).toEqual(true);
  expect(invalidMove(2, 0, 62)).toEqual(true);

  expect(invalidMove(-2, 0, 1)).toEqual(true);
  expect(invalidMove(-2, 0, 57)).toEqual(true);

  expect(invalidMove(0, -2, 48)).toEqual(true);
  expect(invalidMove(0, -2, 55)).toEqual(true);

  expect(invalidMove(0, 2, 15)).toEqual(true);
  expect(invalidMove(0, 2, 8)).toEqual(true);
});
