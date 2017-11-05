import React from 'react';
import Space from './Space';

export default (props) => {
  return (<div className="rank">
    {props.spaces.map((space) => (
      <Space
        key={space.index}
        space={space}
        onClick={() => (props.onSpaceClick(space.index))}
      />
    ))}
  </div>);
};
