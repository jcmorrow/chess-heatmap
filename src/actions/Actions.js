import * as Constants from '../Constants';

const changeFen = (fen) => ({ type: Constants.CHANGE_FEN, fen });
const move = (algebraic) => ({ type: Constants.MOVE, algebraic });
const selectSpace = (index) => ({ type: Constants.SELECT_SPACE, index });
const toggleSetting = (setting) => ({ type: Constants.TOGGLE_SETTING, setting });

export { changeFen, move, selectSpace, toggleSetting };
