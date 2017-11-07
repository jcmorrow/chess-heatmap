import ChessBoard from './ChessBoard';
import { connect } from 'react-redux';
import { move, selectSpace, changeFen } from './actions/Actions';

const mapStateToProps = (state) => ({ spaces: state.spaces, fen: state.fen });

const mapDispatchToProps = (dispatch) => ({
  clickOnSpace: (index) => {
    dispatch(selectSpace(index));
  },
  handleFenChange: (newFen) => {
    dispatch(changeFen(newFen));
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
