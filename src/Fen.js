import _ from 'underscore';
import { BOARD_SIZE, FILES } from './Constants';
import { file, rank, spaceColor } from './Utilities';

class Fen {
  static index(algebraic) {
    const file = FILES.indexOf(algebraic.charAt(0));
    const rank = (BOARD_SIZE - parseInt(algebraic.charAt(1), 10)) * BOARD_SIZE;

    return rank + file;
  };

  static algebraic(index) {
    const fileInt = FILES[file(index)];
    const rankInt = rank(index);

    return fileInt + rankInt;
  }

  static parse(fen) {
    const positionString = fen.match(/[^\s]*/)[0];
    let spaces = [];
    for (let s = 0; s < positionString.length; s++) {
      const nextChar = positionString.charAt(s);
      if (nextChar.match(/[bknpqrBKNPQR]/)) {
        spaces.push(this.spaceObjectFromIndex(spaces.length, nextChar));
      } else if (nextChar.match(/[0-8]/)) {
        for (let i = 0; i < nextChar; i++) {
          spaces.push(this.spaceObjectFromIndex(spaces.length, null));
        }
      }
    }

    return spaces;
  }

  static create(spaces) {
    const coagulateOnes = (string) => {
      return string.replace(/(1+)/g, (match) => (match.length));
    };

    let ranks = _.range(BOARD_SIZE).map((r) => (
      spaces.slice(r * BOARD_SIZE, r * BOARD_SIZE + BOARD_SIZE))
    );
    return ranks.map(rank => (
      coagulateOnes(
        rank.map(
          (space) => (space.piece || 1)
        ).join('')
      )
    )).join('/');
  }

  static spaceObjectFromIndex(i, piece) {
    return {
      color: spaceColor(i),
      file: FILES[file(i)],
      index: i,
      piece,
      rank: rank(i),
    };
  }
}

export default Fen;
