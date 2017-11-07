import Fen from './Fen';

it('can convert from algebraic notation to index position', () => {
  expect(Fen.index('a8')).toEqual(0);
  expect(Fen.index('h8')).toEqual(7);
  expect(Fen.index('a1')).toEqual(56);
  expect(Fen.index('h1')).toEqual(63);
});

it('can convert from index notation to algebraic position', () => {
  expect(Fen.algebraic(0)).toEqual('a8');
  expect(Fen.algebraic(7)).toEqual('h8');
  expect(Fen.algebraic(56)).toEqual('a1');
  expect(Fen.algebraic(63)).toEqual('h1');
});

it('can parse a board with no pieces on it', () => {
  let spaces = Fen.parse('8/8/8/8/8/8/8/8 w KQkq - 0 1');
  expect(spaces.slice(0,2)).toEqual([
    {
      color: 'white',
      file: 'a',
      index: 0,
      piece: null,
      rank: 8,
    },
    {
      color: 'black',
      file: 'b',
      index: 1,
      piece: null,
      rank: 8,
    },
  ]);
  expect(spaces.length).toEqual(64);
});

it('can create a FEN from a set of spaces', () => {
  let spaces = Array(64).fill({ piece: null });
  spaces[0] = { piece: 'r' };

  expect(Fen.create(spaces)).toEqual('r7/8/8/8/8/8/8/8');
});

it('can parse a board with pieces on it', () => {
  let spaces = Fen.parse('r7/8/8/8/8/8/8/8 w KQkq - 0 1');
  expect(spaces.slice(0,2)).toEqual([
    {
      color: 'white',
      file: 'a',
      index: 0,
      piece: 'r',
      rank: 8,
    },
    {
      color: 'black',
      file: 'b',
      index: 1,
      piece: null,
      rank: 8,
    },
  ]);
});
