import ChessBoard from './ChessBoard';
import { connect } from 'react-redux';
import { move, selectSpace, changeFen, toggleSetting } from './actions/Actions';

const mapStateToProps = (state) => (
  {
    spaces: state.spaces,
    fen: state.fen,
    settings: state.settings,
  }
);

const mapDispatchToProps = (dispatch) => ({
  clickOnSpace: (index) => {
    dispatch(selectSpace(index));
  },
  handleFenChange: (newFen) => {
    dispatch(changeFen(newFen));
  },
  clickOnSetting: (setting) => {
    dispatch(toggleSetting(setting));
  },
  move: (algebraicMove) => {
    dispatch(move(algebraicMove));
  },
});

const StatefulChessboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChessBoard);

export default StatefulChessboard;
