import Move from '../Move';
import Fen from '../Fen';
import Pgn from '../Pgn';
import * as Constants from '../Constants';

const magnusCarlsenFEN = 'r4bk1/5pp1/1p1p4/8/4Pp1P/1q3P2/3RQ2P/3R2K1 b - - 1 37';
const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const initialState = { fen: startingFEN, spaces: [] };

const chessBoardReducer = (state = initialState, action) => {
  let newSpaces;
  switch (action.type) {
    case Constants.MOVE:
      newSpaces = Pgn.move(state.spaces, action.algebraic);
      break;
    case Constants.SELECT_SPACE:
      let currentlySelectedSpace = state.spaces.find((space) => (space.selected));
      if ((currentlySelectedSpace && currentlySelectedSpace.piece) &&
        (Move.possibleMovesForSpace(currentlySelectedSpace, state.spaces).find(
          (space) => (space === action.index)
        ))) {
        newSpaces = Pgn.move(
          state.spaces,
          `${currentlySelectedSpace.piece}${Fen.algebraic(action.index)}`
        );
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
    spaces: Move.possibleMoves(newSpaces),
  });
};

export default chessBoardReducer;
