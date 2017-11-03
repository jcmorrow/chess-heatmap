import ChessBoard from './ChessBoard';
import Fen from './Fen';
import Pieces from './Pieces';

const EMPTY_FEN = '8/8/8/8/8/8/8/8';
const EMPTY_SPACES = Fen.parse(EMPTY_FEN);

it('can move one space up', () => {
  expect(Pieces.move(0, 1, 9, EMPTY_SPACES)).toEqual(1);
});

it('can move two spaces up', () => {
  expect(Pieces.move(0, 2, 16, EMPTY_SPACES)).toEqual(0);
});

it('cannot move one space up if it is too close to the edge', () => {
  expect(Pieces.move(0, 1, 0, EMPTY_SPACES)).toEqual(-1);
});

it('cannot move two spaces up if it is too close to the edge', () => {
  expect(Pieces.move(0, 2, 8, EMPTY_SPACES)).toEqual(-1);
});

it('can move one space down', () => {
  expect(Pieces.move(0, -1, 8, EMPTY_SPACES)).toEqual(16);
});

it('cannot move one space down if it is on the edge', () => {
  expect(Pieces.move(0, -1, 56, EMPTY_SPACES)).toEqual(-1);
});

it('can move two spaces down', () => {
  expect(Pieces.move(0, -2, 16, EMPTY_SPACES)).toEqual(32);
});

it('cannot move one space down if it is too close to the edge', () => {
  expect(Pieces.move(0, -1, 63, EMPTY_SPACES)).toEqual(-1);
  expect(Pieces.move(0, -1, 56, EMPTY_SPACES)).toEqual(-1);
});

it('cannot move two spaces down if it is too close to the edge', () => {
  expect(Pieces.move(0, -2, 56, EMPTY_SPACES)).toEqual(-1);
});

it('can move one space right', () => {
  expect(Pieces.move(1, 0, 0, EMPTY_SPACES)).toEqual(1);
});

it('can move two spaces right', () => {
  expect(Pieces.move(2, 0, 0, EMPTY_SPACES)).toEqual(2);
});

it('cannot move one space right if it is on the edge', () => {
  expect(Pieces.move(1, 0, 63, EMPTY_SPACES)).toEqual(-1);
});

it('cannot move two spaces right if it is too close to the edge', () => {
  expect(Pieces.move(2, 0, 46, EMPTY_SPACES)).toEqual(-1);
});

it('can move one space left', () => {
  expect(Pieces.move(-1, 0, 9, EMPTY_SPACES)).toEqual(8);
});

it('can move two spaces left', () => {
  expect(Pieces.move(-2, 0, 2, EMPTY_SPACES)).toEqual(0);
});

it('cannot move one space left if it is on the edge', () => {
  expect(Pieces.move(-1, 0, 56, EMPTY_SPACES)).toEqual(-1);
});

it('cannot move two spaces left if it is too close to the edge', () => {
  expect(Pieces.move(-2, 0, 57, EMPTY_SPACES)).toEqual(-1);
});

it('cannot move two spaces right if it is too close to the edge', () => {
  expect(Pieces.move(3, 0, 6, EMPTY_SPACES)).toEqual(-1);
});

it('can calculate the take moves for a pawn', () => {
  // white pawn on g2 threatens to take on h3 and f3
  let fen = '8/8/8/8/8/8/6P1/8';
  let spaces = Fen.parse(fen);
  let answer = [ Fen.index('f3'), Fen.index('h3') ];

  expect(Pieces.possibleMoves(spaces[Fen.index('g2')], spaces))
    .toEqual(expect.arrayContaining(answer));
});

it('can calculate possible take moves for a knight on b2', () => {
  let fen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
  let spaces = Fen.parse(fen);
  spaces[Fen.index('b1')].piece = 'n';
  let answer = [ 'a3', 'c3', 'd2' ].map(
    (algebraic) => Fen.index(algebraic)
  );

  expect(Pieces.possibleMoves(spaces[Fen.index('b1')], spaces))
    .toEqual(expect.arrayContaining(answer));
});

it('broken rook regression test', () => {
  let fen = '8/8/8/8/8/8/8/r7';
  let spaces = Fen.parse(fen);
  let answer = [
    'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
    'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
  ];

  expect(Pieces.possibleMoves(spaces[Fen.index('a1')], spaces).map(
    (index) => Fen.algebraic(index)
  )).toEqual(expect.arrayContaining(answer));

});

it('can calculate possible take moves for a bishop', () => {
  let fen = '8/8/8/8/8/8/8/8';
  let spaces = Fen.parse(fen);
  spaces[Fen.index('e4')].piece = 'B';
  let answer = [
    'a8', 'b7', 'c6', 'd5', 'f3', 'g2', 'h1',
    'b1', 'c2', 'd3', 'f5', 'g6', 'h7',
  ];

  expect(
    Pieces.possibleMoves(spaces[Fen.index('e4')], spaces).map(
      (index) => Fen.algebraic(index)
    )
  ).toEqual(expect.arrayContaining(answer));
});
