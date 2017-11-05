class Pieces {
  static possibleMoves(space, spaces) {
    if (space.piece === null) { return []; }
    return this.movePatterns[space.piece](space.index, spaces)
      .filter((space) => space >= 0);
  }

  static moveVertical(increment) {
    return (space) => space + (-8 * increment);
  }
  static moveHorizontal(increment) {
    return (space) => space + increment;
  }

  static move(horizontal, vertical, space, spaces, piece) {
    if (this.invalidMove(horizontal, vertical, space)) { return -1; }
    const horFunc = this.moveHorizontal(horizontal);
    const vertFunc = this.moveVertical(vertical);
    const newSpaceIndex = horFunc(vertFunc(space));
    const newSpace = spaces[newSpaceIndex];
    if (newSpace.piece) { // && this.colorOf(newSpace.piece) === this.colorOf(piece)) {
      return -1;
    }
    return newSpaceIndex;
  }

  static colorOf(piece) {
    if (piece.match(/[a-z]/)) {
      return 'BLACK';
    } else if (piece.match(/[A-Z]/)) {
      return 'WHITE';
    }
  }

  static moveRecursive(horizontal, vertical, space, spaces) {
    let possibleSpaces = [];
    let piece = spaces[space].piece;
    let nextCandidate = this.move(horizontal, vertical, space, spaces, piece);
    while (nextCandidate !== -1) {
      possibleSpaces.push(nextCandidate);
      nextCandidate = this.move(horizontal, vertical, nextCandidate, spaces, piece);
    }
    return possibleSpaces;
  }

  static invalidMove(horizontal, vertical, space) {
    if (
      // Check right edge while moving right
      ((space % 8) + horizontal > 7 && horizontal > 0) ||
      // Check left edge while moving left
      (space % 8 < Math.abs(horizontal)  && horizontal < 0) ||
      // Check top edge while moving up
      (Math.floor(space / 8) < vertical && vertical > 0) ||
      // Check bottom edge while moving down
      (
        Math.abs(vertical) > 7 - Math.floor(space / 8) && vertical < 0
        // Math.ceil(space / 8) - vertical > 7
      )
    ) { return true; }
  }
}

Pieces.movePatterns = {
  'r': (space, spaces) => {
    return Pieces.moveRecursive(1, 0, space, spaces)
      .concat(Pieces.moveRecursive(-1, 0, space, spaces))
      .concat(Pieces.moveRecursive(0, 1, space, spaces))
      .concat(Pieces.moveRecursive(0, -1, space, spaces));
  },
  'R': (space, spaces) => {
    return Pieces.movePatterns.r(space, spaces);
  },
  'n': (space, spaces) => {
    return [
      Pieces.move(1, 2, space, spaces, spaces[space].piece),
      Pieces.move(-1, -2, space, spaces, spaces[space].piece),
      Pieces.move(-1, 2, space, spaces, spaces[space].piece),
      Pieces.move(1, -2, space, spaces, spaces[space].piece),
      Pieces.move(2, 1, space, spaces, spaces[space].piece),
      Pieces.move(-2, -1, space, spaces, spaces[space].piece),
      Pieces.move(-2, 1, space, spaces, spaces[space].piece),
      Pieces.move(2, -1, space, spaces, spaces[space].piece),
    ];
  },
  'N': (space, spaces) => {
    return Pieces.movePatterns.n(space, spaces);
  },
  'k': (space, spaces) => {
    return [
      Pieces.move(1, 0, space, spaces, spaces[space].piece),
      Pieces.move(1, 1, space, spaces, spaces[space].piece),
      Pieces.move(0, 1, space, spaces, spaces[space].piece),
      Pieces.move(-1, 1, space, spaces, spaces[space].piece),
      Pieces.move(1, -1, space, spaces, spaces[space].piece),
      Pieces.move(-1, 0, space, spaces, spaces[space].piece),
      Pieces.move(-1, -1, space, spaces, spaces[space].piece),
      Pieces.move(0, -1, space, spaces, spaces[space].piece),
    ];
  },
  'K': (space, spaces) => {
    return Pieces.movePatterns.k(space, spaces);
  },
  'q': (space, spaces) => {
    return Pieces.movePatterns.b(space, spaces)
      .concat(Pieces.movePatterns.r(space, spaces));
  },
  'Q': (space, spaces) => {
    return Pieces.movePatterns.q(space, spaces);
  },
  'p': (space, spaces) => {
    return [
      Pieces.move(-1, -1, space, spaces, spaces[space].piece),
      Pieces.move(1, -1, space, spaces, spaces[space].piece),
    ];
  },
  'P': (space, spaces) => {
    return [
      Pieces.move(-1, 1, space, spaces, spaces[space].piece),
      Pieces.move(1, 1, space, spaces, spaces[space].piece),
    ];
  },
  'b': (space, spaces) => {
    return Pieces.moveRecursive(1, 1, space, spaces)
      .concat(Pieces.moveRecursive(-1, 1, space, spaces))
      .concat(Pieces.moveRecursive(-1, -1, space, spaces))
      .concat(Pieces.moveRecursive(1, -1, space, spaces));
  },
  'B': (space, spaces) => {
    return Pieces.movePatterns.b(space, spaces);
  },
};

export default Pieces;
