import { BOARD_SIZE } from './Constants';
import FenForm from './FenForm';
import SettingsForm from './SettingsForm';
import Rank from './Rank';
import React from 'react';
import _ from 'underscore';

const spaces = (spaces, rank) => (
  spaces.slice(rank * BOARD_SIZE, rank * BOARD_SIZE + BOARD_SIZE)
);

const ChessBoard = (props) => {
  return (
    <div>
      <div className="container">
        <div className="chess-board">
          {_.range(BOARD_SIZE).map(
            (rank) => (
              <Rank
                key={rank}
                clickOnSpace={props.clickOnSpace}
                spaces={spaces(props.spaces, rank)}
                showPieces={props.settings.showPieces}
              />
            )
          )}
        </div>
        <FenForm value={props.fen} handleFenChange={props.handleFenChange} />
      </div>
      <SettingsForm settings={props.settings} clickOnSetting={props.clickOnSetting} />
    </div>
  );
};

export default ChessBoard;
