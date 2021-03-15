import { SET_VIEW_FINDER_POINT } from '../types';
import pointsReducer from './points-reducer';

export default function mainReducer(state = {}, action) {
  __DEV__ && action.type!==SET_VIEW_FINDER_POINT && console.debug('MAIN REDUCER CALLED with action ' + action.type);

  return {
    points: pointsReducer(state.points, action),
  };
}
