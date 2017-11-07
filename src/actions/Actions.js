import * as Constants from '../Constants';

const move = (algebraic) => {
  return {
    type: Constants.MOVE,
    algebraic,
  };
};

const selectSpace = (index) => {
  return {
    type: Constants.SELECT_SPACE,
    index,
  };
};

const changeFen = (fen) => {
  return {
    type: Constants.CHANGE_FEN,
    fen,
  };
};

export { changeFen, move, selectSpace };
