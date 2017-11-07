import _ from 'underscore';

class Move {
  static possibleMoves(spaces) {
    let possibleMoves = Array(64).fill(0);
    for (let space of spaces) {
      if (space.piece) {
        let moveFunc = Move.MOVES[space.piece];
        for (let possibleMove of moveFunc.call(this, space.index, spaces)) {
          if (this.colorOfPiece(spaces[possibleMove]) !== this.colorOfPiece(space)) {
            possibleMoves[possibleMove] += 1;
          }
        }
      }
    }

    return spaces.map((space) => (
      Object.assign({}, space, {
        possibleMoves: possibleMoves[space.index],
      })
    ));
  }

  static possibleMovesForSpace(space, spaces) {
    return Move.MOVES[space.piece].call(this, space.index, spaces);
  }

  static blackPawn(space, spaces) {
    return this.lambda(1, -1, false, false, true, false)(space, spaces);
  }

  static whitePawn(space, spaces) {
    return this.lambda(1, 1, false, false, true, false)(space, spaces);
  }

  static bishop(space, spaces) {
    return this.lambda(1, 1, true, false, true, true)(space, spaces);
  }

  static rook(space, spaces) {
    return this.lambda(1, 0, true, true, true, true)(space, spaces);
  }

  static queen(space, spaces) {
    return this.bishop(space, spaces)
      .concat(this.rook(space, spaces));
  }

  static knight(space, spaces) {
    return this.lambda(1, 2, false, true, true, true)(space, spaces);
  }

  static king(space, spaces) {
    return this.lambda(1, 1, false, false, true, true)(space, spaces).concat(
      this.lambda(1, 0, false, true, true, true)(space, spaces));
  }

  static lambda(horizontal, vertical, recursive, axesRever, reflX, reflY) {
    let moveFunc = recursive ? this.moveRecursive : this.move;
    let hValues = reflX ? _.uniq([ horizontal, -1 * horizontal ]) : [ horizontal ];
    let vValues = reflY ? _.uniq([ vertical, -1 * vertical ]) : [ vertical ];

    return (space, spaces) => {
      return _.flatten(
        hValues.map((h) => {
          return vValues.map((v) => {
            let possibleMoves = moveFunc.call(this, h, v, space, spaces);
            if (axesRever) {
              possibleMoves = possibleMoves.concat(
                moveFunc.call(this, v, h, space, spaces)
              );
            }
            return possibleMoves;
          });
        })
      );
    };
  }

  static moveVertical(increment) {
    return (space) => space - (8 * increment);
  }
  static moveHorizontal(increment) {
    return (space) => space + increment;
  }

  static move(horizontal, vertical, space, spaces, piece) {
    if (this.invalidMove(horizontal, vertical, space)) { return []; }
    const horFunc = this.moveHorizontal(horizontal);
    const vertFunc = this.moveVertical(vertical);

    const newSpaceIndex = horFunc(vertFunc(space));

    return [ newSpaceIndex ];
  }

  static moveRecursive(h, v, space, spaces) {
    let possibleSpaces = [];
    let piece = spaces[space].piece;
    let nextCandidate = this.move(h, v, space, spaces, piece);
    while (nextCandidate.length > 0) {
      let nextCandidateSpace = spaces[nextCandidate[0]];
      if (
        (this.colorOfPiece(nextCandidateSpace) === 'white' &&
          this.colorOfPiece(spaces[space]) === 'black') ||
        (this.colorOfPiece(nextCandidateSpace) === 'black' &&
          this.colorOfPiece(spaces[space]) === 'white')
      ) {
        possibleSpaces.push(nextCandidate[0]);
        nextCandidate = [];
      } else if (nextCandidateSpace.piece) {
        nextCandidate = [];
      } else {
        possibleSpaces.push(nextCandidate[0]);
        nextCandidate = this.move(h, v, nextCandidate[0], spaces, piece);
      }
    }
    return possibleSpaces;
  }

  static colorOfPiece(space) {
    if (space.piece) {
      return space.piece.match(/[a-z]/) ? 'black' : 'white';
    }
  }

  static invalidMove(h, v, space) {
    return (
      // Check right edge while moving right
      (h > 0 && (space % 8) + h > 7) ||
      // Check left edge while moving left
      (h < 0 && space % 8 < Math.abs(h)) ||
      // Check top edge while moving up
      (v > 0 && Math.floor(space / 8) < v) ||
      // Check bottom edge while moving down
      (v < 0 && Math.abs(v) > 7 - Math.floor(space / 8))
    );
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
