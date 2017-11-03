const ALPHABET = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ];

class Fen {
  static index(algebraicPosition) {
    const file = ALPHABET.indexOf(algebraicPosition.charAt(0));
    const rank = (8 - parseInt(algebraicPosition.charAt(1))) * 8;
    return rank + file;
  };

  static algebraic(indexPosition) {
    const file = ALPHABET[indexPosition % 8];
    const rank = 8 - Math.floor(indexPosition / 8);
    return file + rank;
  }

  static parse(fen) {
    const positionString = fen.match(/[^\s]*/)[0];
    let spaces = [];
    for (let s = 0; s < positionString.length; s++) {
      const nextChar = positionString.charAt(s);
      if (nextChar.match(/[bknpqrBKNPQR]/)) {
        spaces.push(this.spaceObjectFromIndex(spaces.length, nextChar));
      } else if (nextChar.match(/[0-9]/)) {
        for (let i = 0; i < nextChar; i++) {
          spaces.push(this.spaceObjectFromIndex(spaces.length, null));
        }
      }
    }
    return spaces;
  }

  static spaceObjectFromIndex(i, piece) {
    return {
      color: this.colorFromIndex(i),
      file: this.fileFromIndex(i),
      index: i,
      piece,
      rank: this.rankFromIndex(i),
    };
  }

  static fileFromIndex(i) {
    return ALPHABET[(i % 8)];
  }

  static rankFromIndex(i) {
    return 8 - Math.floor(i / 8);
  }

  static colorFromIndex(i) {
    return ((i + (this.rankFromIndex(i) % 2)) % 2) ? 'black' : 'white';
  }
}

export default Fen;
