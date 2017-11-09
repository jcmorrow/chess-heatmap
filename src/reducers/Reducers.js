import Move from '../Move';
import Fen from '../Fen';
import Heatmap from '../Heatmap';
import Pgn from '../Pgn';
import * as Constants from '../Constants';

const magnusCarlsenFEN = 'r4bk1/5pp1/1p1p4/8/4Pp1P/1q3P2/3RQ2P/3R2K1 b - - 1 37';
const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const initialState = { fen: startingFEN, spaces: [] };

const chessBoardReducer = (state = initialState, action) => {
  let newSpaces;
  switch (action.type) {
    case Constants.SELECT_SPACE:
      let currentlySelectedSpace = state.spaces.find((space) => (space.selected));
      if (currentlySelectedSpace &&
        currentlySelectedSpace.moves.includes(action.index)
      ) {
        state.spaces[action.index].piece = currentlySelectedSpace.piece;
        currentlySelectedSpace.piece = null;
        currentlySelectedSpace.selected = false;
        newSpaces = state.spaces;
      } else if (currentlySelectedSpace &&
        currentlySelectedSpace.captures.includes(action.index)
      ) {
        state.spaces[action.index].piece = currentlySelectedSpace.piece;
        currentlySelectedSpace.piece = null;
        newSpaces = state.spaces;
        currentlySelectedSpace.selected = false;
      } else {
        newSpaces = state.spaces.map((space) => (
          Object.assign({}, space, { selected: (space.index === action.index) })
        ));
      }
      break;
    case Constants.CHANGE_FEN:
      newSpaces = Fen.parse(action.fen);
      break;
    default:
      newSpaces = Fen.parse(state.fen);
  }
  return Object.assign({}, state, {
    fen: Fen.create(newSpaces),
    spaces: Heatmap.threatenMap(Move.allMoves(newSpaces)),
  });
};

export default chessBoardReducer;
