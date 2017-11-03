import React, { Component } from 'react';
import Fen from './Fen';
import Pieces from './Pieces';

class ChessBoard extends Component {
  render() {
    return (
      <div className="chess-board">
        {this.renderSpaces()}
      </div>
    );
  }

  deletePieceOn(index) {
    this.props.spaces[index].piece = null;
    this.forceUpdate();
  }

  renderSpaces() {
    let spaces = [];
    let possibleMoves = ChessBoard.countPossibleMoves(this.props.spaces);
    for (let i = 0; i < 9; i++) {
      spaces.push(<div key={i} className="rank">
        {this.props.spaces.slice(i * 8, i * 8 + 8).map(
          (space, c) => {
            let spaceStyle = {
              backgroundColor: this.spaceColor(space.color),
            };
            let heatMapStyle = {
              backgroundColor: this.redShade(possibleMoves[space.index]),
            };
            return (
              <div onClick={() => { this.deletePieceOn(space.index); } } style={spaceStyle} key={space.index} {...space} className="space" >
                {space.piece}
                <div className="heatmap" style={heatMapStyle}>
                </div>
              </div>
            );
          }
        )}
      </div>);
    }
    return spaces;
  }

  static countPossibleMoves(spaces) {
    let possibleMoves = Array(64).fill(0);
    for (let space of spaces) {
      if (space.piece) {
        for (let possibleMove of Pieces.possibleMoves(space, spaces)) {
          possibleMoves[possibleMove] += 1;
        }
      }
    }
    return possibleMoves;
  }

  redShade(degree) {
    return 'rgba(255, 0, 0, ' + degree * .1 + ')';
  }

  spaceColor(whiteOrBlack) {
    if (whiteOrBlack === 'white') {
      return 'rgba(255, 255, 255, 1)';
    } else {
      return 'rgba(0, 0, 255, .00)';
    }
  }
}

const magnusCarlsenFEN = 'r4bk1/5pp1/1p1p4/8/4Pp1P/1q3P2/3RQ2P/3R2K1 b - - 1 37';
const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const bishopFEN = '8/8/8/5P2/4B3/3P1P2/8/8';
const rookFEN = '8/8/8/8/8/8/r7/8';

ChessBoard.defaultProps = {
  spaces: Fen.parse(magnusCarlsenFEN),
};

export default ChessBoard;
