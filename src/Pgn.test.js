import Fen from './Fen';
import Pgn from './Pgn';

it('produces a new FEN based on a previous set of spaces and a valid move', () => {
  let spaces = Fen.parse('r7/8/8/8/8/8/8/8 w KQkq - 0 1');
  let newSpaces = Pgn.move(spaces, 'ra1');

  expect(newSpaces[Fen.index('a8')].piece).toEqual(null);
  expect(newSpaces[Fen.index('a1')].piece).toEqual('r');
});

it('return the original FEN when given an invalid move', () => {
  let spaces = Fen.parse('r7/8/8/8/8/8/8/8 w KQkq - 0 1');
  let newSpaces = Pgn.move(spaces, 'ba1');

  expect(newSpaces).toEqual(spaces);
});
