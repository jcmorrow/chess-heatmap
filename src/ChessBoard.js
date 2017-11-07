import FenForm from './FenForm';
import Rank from './Rank';
import React from 'react';
import _ from 'underscore';

const spaces = (spaces, rank) => (
  spaces.slice(rank * 8, rank * 8 + 8)
);

const ChessBoard = (props) => (
  <div className="container">
    <div className="chess-board">
      {_.range(8).map(
        (rank) => (
          <Rank
            key={rank}
            clickOnSpace={props.clickOnSpace}
            spaces={spaces(props.spaces, rank)} />
        )
      )}
    </div>
    <FenForm value={props.fen} handleFenChange={props.handleFenChange} />
  </div>
);

export default ChessBoard;
