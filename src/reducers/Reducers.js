import Move from '../Move';
import Fen from '../Fen';
import Heatmap from '../Heatmap';
import * as Constants from '../Constants';

const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const initialState = {
  fen: startingFEN,
  spaces: [],
  settings: {
    showPieces: true,
    showWhiteThreatens: true,
    showBlackThreatens: true,
  },
  colorToMove: 'white',
};

const chessBoardReducer = (state = initialState, action) => {
  const color = (piece) => (
    piece && piece.match(/[a-z]/) ? 'black' : 'white'
  );
  let newSpaces, newSettings, colorToMove;
  switch (action.type) {
    case Constants.SELECT_SPACE:
      let currentlySelectedSpace = state.spaces.find((space) => (space.selected));
      if (currentlySelectedSpace &&
        (currentlySelectedSpace.moves.includes(action.index) ||
          currentlySelectedSpace.captures.includes(action.index)
        )
      ) {
        state.spaces[action.index].piece = currentlySelectedSpace.piece;
        currentlySelectedSpace.piece = null;
        currentlySelectedSpace.selected = false;
        newSpaces = state.spaces;
        colorToMove = (state.colorToMove === 'white') ? 'black' : 'white';
      } else {
        newSpaces = state.spaces.map((space) => (
          Object.assign({}, space, {
            selected: (space.index === action.index &&
              color(space.piece) === state.colorToMove),
          })
        ));
        colorToMove = state.colorToMove;
      }
      newSettings = state.settings;
      break;
    case Constants.CHANGE_FEN:
      newSpaces = Fen.parse(action.fen);
      newSettings = state.settings;
      colorToMove = state.colorToMove;
      break;
    case Constants.TOGGLE_SETTING:
      newSettings = Object.assign({}, state.settings);
      newSettings[action.setting] = !state.settings[action.setting];
      newSpaces = Fen.parse(state.fen);
      colorToMove = state.colorToMove;
      break;
    default:
      newSpaces = Fen.parse(state.fen);
      newSettings = state.settings;
      colorToMove = state.colorToMove;
  }
  return Object.assign({}, state, {
    fen: Fen.create(newSpaces),
    spaces: Heatmap.threatenMap(Move.allMoves(newSpaces), newSettings),
    settings: newSettings,
    colorToMove,
  });
};

export default chessBoardReducer;
