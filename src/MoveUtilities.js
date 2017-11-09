import _ from 'underscore';

class MoveUtilities {
  static file(index) {
    return index % 8;
  }

  static rank(index) {
    return Math.floor(index / 8);
  }

  static moveVertical(increment) {
    return (space) => space - (8 * increment);
  }

  static moveHorizontal(increment) {
    return (space) => space + increment;
  }

  static invalidMove(h, v, startIndex) {
    const BOTTOM_RANK = 7;
    const LEFT_FILE = 0;
    const RIGHT_FILE = 7;
    const TOP_RANK = 0;

    const down = v < 0;
    const left = h < 0;
    const right = h > 0;
    const up = v > 0;

    const file = this.file(startIndex);
    const rank = this.rank(startIndex);

    return (
      (right  &&  file + h > RIGHT_FILE) || (left && file + h < LEFT_FILE) ||
      (up && rank - v < TOP_RANK) || (down && rank - v > BOTTOM_RANK)
    );
  }

  static lambda(horizontal, vertical, recursive, axesRever, reflX, reflY) {
    let moveFunc = recursive ? this.moveRecursive : this.move;
    let hValues = reflX ? _.uniq([ horizontal, -1 * horizontal ]) : [ horizontal ];
    let vValues = reflY ? _.uniq([ vertical, -1 * vertical ]) : [ vertical ];

    return (space, spaces, capture) => {
      return _.flatten(
        hValues.map((h) => (
          vValues.map((v) => {
            let possibleMoves = moveFunc.call(this, h, v, space, spaces, capture);
            if (axesRever) {
              possibleMoves = possibleMoves.concat(
                moveFunc.call(this, v, h, space, spaces, capture)
              );
            }
            return possibleMoves;
          })
        ))
      );
    };
  }

  static moveRecursive(h, v, startIndex, spaces, capture = false) {
    let possibleSpaces = [];
    let nextIndex = this.move(h, v, startIndex, spaces, capture);

    while (nextIndex.length > 0) {
      let nextSpace = spaces[nextIndex[0]]; if (nextSpace.piece) {
        if (capture) {
          possibleSpaces.push(nextIndex[0]);
        }
        nextIndex = [];
      } else {
        possibleSpaces.push(nextIndex[0]);
        nextIndex = this.move(h, v, nextIndex[0], spaces, capture);
      }
    }

    return possibleSpaces;
  }

  static move(horizontal, vertical, startIndex, spaces, capture) {
    if (this.invalidMove(horizontal, vertical, startIndex)) { return []; }
    const horFunc = this.moveHorizontal(horizontal);
    const vertFunc = this.moveVertical(vertical);

    const newSpaceIndex = horFunc(vertFunc(startIndex));

    if (capture || !spaces[newSpaceIndex].piece) {
      return [ newSpaceIndex ];
    } else {
      return [];
    }
  }
}

export default MoveUtilities;
