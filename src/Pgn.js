import Fen from './Fen';
import Move from './Move';

class Pgn {
  static move(spaces, move) {
    let newSpaces = spaces.slice();
    let newSpace = move.slice(1, 3);
    let pieceToMove = spaces.find((space) => {
      return (
        space.piece === move.charAt(0) &&
        Move.moves(space, spaces)
          .moves
          .map((pm) => Fen.algebraic(pm))
          .includes(move.slice(1, 3))
      );
    });
    if (pieceToMove !== undefined) {
      newSpaces[Fen.index(newSpace)].piece = pieceToMove.piece;
      newSpaces[pieceToMove.index].piece = null;
    } else {
      newSpaces = spaces;
    }
    return newSpaces;
  }
}

export default Pgn;
