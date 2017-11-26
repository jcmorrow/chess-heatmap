import { color, lambda } from './Utilities';

class Move {
  static allMoves(spaces) {
    return spaces.map((space) => (
      Object.assign({}, space, this.moves(space, spaces))
    ));
  }

  static moves(space, spaces) {
    if (!space.piece) {
      return Object.assign(
        {},
        space,
        { captures: [], moves: [], threatens: [] }
      );
    }

    const moveFunc = this.MOVES[space.piece];

    let moves = moveFunc.call(this, space.index, spaces, false).sort();
    let threatens = moveFunc.call(this, space.index, spaces, true)
      .filter((index) => (
        !spaces[index].piece || color(spaces[index].piece) !== color(space.piece)
      )).sort();
    let captures = threatens.filter((index) => (
      spaces[index].piece && color(spaces[index].piece) !== color(space.piece)
    )).sort();

    return Object.assign({}, space, { captures, moves, threatens });
  }

  static blackPawn(space, spaces, capture = false) {
    let possibleMoves = [];
    if (capture) {
      return lambda(1, -1, false, false, true, false)(space, spaces, capture);
    } else {
      if (spaces[space].rank === 7) {
        possibleMoves.push(
          lambda(0, -2, false, false, false, false)(space, spaces, capture)[0]
        );
      }
      possibleMoves.push(
        lambda(0, -1, false, false, false, false)(space, spaces, capture)[0]
      );
    }
    return possibleMoves;
  }

  static whitePawn(space, spaces, capture = false) {
    let possibleMoves = [];
    if (capture) {
      return lambda(1, 1, false, false, true, false)(space, spaces, capture);
    } else {
      if (spaces[space].rank === 2) {
        possibleMoves.push(
          lambda(0, 2, false, false, false, false)(space, spaces, capture)[0]
        );
      }
      possibleMoves.push(
        lambda(0, 1, false, false, false, false)(space, spaces, capture)[0]
      );
    }
    return possibleMoves;
  }

  static bishop(space, spaces, capture = false) {
    return lambda(1, 1, true, false, true, true)(space, spaces, capture);
  }

  static rook(space, spaces, capture = false) {
    return lambda(1, 0, true, true, true, true)(space, spaces, capture);
  }

  static queen(space, spaces, capture = false) {
    return this.bishop(space, spaces, capture)
      .concat(this.rook(space, spaces, capture));
  }

  static knight(space, spaces, capture) {
    return lambda(1, 2, false, true, true, true)(space, spaces, capture);
  }

  static king(space, spaces, capture) {
    return lambda(1, 1, false, false, true, true)(space, spaces, capture).concat(
      lambda(1, 0, false, true, true, true)(space, spaces, capture));
  }

}

Move.MOVES = {
  B: Move.bishop,
  K: Move.king,
  N: Move.knight,
  P: Move.whitePawn,
  Q: Move.queen,
  R: Move.rook,
  b: Move.bishop,
  k: Move.king,
  n: Move.knight,
  p: Move.blackPawn,
  q: Move.queen,
  r: Move.rook,
};

export default Move;
