import React from 'react';
import {ViroPolyline} from 'react-viro';

// In meters
const FINDER_WIDTH = 0.05;
const POINT_COORDINATE = FINDER_WIDTH / 2;

const FinderView = ({position}) => {
  return (
    <ViroPolyline
      position={position}
      points={[
        [-POINT_COORDINATE, 0, 0],
        [0, 0, -POINT_COORDINATE],
        [POINT_COORDINATE, 0, 0],
        [0, 0, POINT_COORDINATE],
        [-POINT_COORDINATE, 0, 0],
      ]}
      thickness={0.001}
    />
  );
};

export default FinderView;
