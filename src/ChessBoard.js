import React, { Component } from 'react';
import _ from 'underscore';
import Fen from './Fen';
import Move from './Move';
import MoveForm from './MoveForm';
import Pgn from './Pgn';
import Rank from './Rank';

const magnusCarlsenFEN = 'r4bk1/5pp1/1p1p4/8/4Pp1P/1q3P2/3RQ2P/3R2K1 b - - 1 37';
const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

class ChessBoard extends Component {
  constructor(props) {
    super(props);

    let spaces = Fen.parse(startingFEN);
    this.state = { spaces, nextMove: '' };

    this.deletePieceOn = this.deletePieceOn.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  render() {
    this.calculateMoves();
    return (
      <div className="chess-board">
        {_.range(8).map((r) => (
          <Rank onSpaceClick={this.deletePieceOn} key={r}
            spaces={this.state.spaces.slice(r * 8, r * 8 + 8)} />
        ))}
        <MoveForm handleMove={this.handleMove} />
      </div>
    );
  }

  calculateMoves() {
    let possibleMoves = Move.possibleMoves(this.state.spaces);
    for (let space of this.state.spaces) {
      space.possibleMoves = possibleMoves[space.index];
    }
  }

  deletePieceOn(index) {
    this.state.spaces[index].piece = null;
    this.forceUpdate();
  }

  handleMove(move) {
    let newSpaces = Pgn.move(this.state.spaces, move);
    this.setState({ spaces: newSpaces, nextMove: '' });
  }
}

export default ChessBoard;
