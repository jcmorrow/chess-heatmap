import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Svg from './Svg';

const heatMapStyle = (possibleMoves) => ({
  backgroundColor: 'rgba(255, 0, 0, ' + possibleMoves * .1 + ')',
});

const classes = (props) => (
  classnames('space', props.color,  { selected: props.selected })
);

const piece = (props) => {
  if (props.showPieces) {
    return <img alt={props.piece} src={Svg.pieces[props.piece]} />;
  };
};

const Space = (props) => (
  <div className={classes(props)} key={props.index} onClick={props.onClick} >
    <div className="heatmap" style={heatMapStyle(props.possibleMoves)} />
    {piece(props)}
  </div>
);

Space.propTypes = {
  piece: PropTypes.string,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  possibleMoves: PropTypes.number.isRequired,
};

export default Space;
