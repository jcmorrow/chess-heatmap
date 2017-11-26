import { color } from './Utilities';
import { BLACK, WHITE } from './Constants';

class Heatmap {
  static threatenMap(spaces, settings) {
    spaces.forEach((space) => { space.possibleMoves = 0; });
    spaces.forEach((space) => {
      const pieceColor = color(space.piece);

      if ((pieceColor === WHITE && settings.showWhiteThreatens) ||
        (pieceColor === BLACK && settings.showBlackThreatens)) {
        space.threatens.forEach((threaten) => {
          spaces[threaten].possibleMoves += 1;
        });
      }
    });

    return spaces;
  }
}

export default Heatmap;
