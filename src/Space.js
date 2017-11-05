import React from 'react';
import Svg from './Svg';

function heatMapStyle(space) {
  return {
    backgroundColor: 'rgba(255, 0, 0, ' + space.possibleMoves * .1 + ')',
  };
}


export default (props) => (
  <div
    className={'space ' + props.space.color}
    key={props.space.index}
    onClick={props.onClick}
  >
    <div className="heatmap" style={heatMapStyle(props.space)} />
    <img alt={props.space.piece} src={Svg.pieces[props.space.piece]} />
  </div>
);
