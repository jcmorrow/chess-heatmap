import React from 'react';
import Space from './Space';

export default (props) => {
  return (<div className="rank">
    {props.spaces.map((space) => (
      <Space
        {...space}
        key={space.index}
        onClick={() => (props.clickOnSpace(space.index))}
        showPieces={props.showPieces}
      />
    ))}
  </div>);
};
