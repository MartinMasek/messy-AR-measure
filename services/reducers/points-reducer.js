import {
  SET_FIRST_POINT,
  SET_SECOND_POINT,
  SET_VIEW_FINDER_POINT,
} from '../types';

const initState = {
  firstPoint: undefined,
  secondPoint: undefined,
  viewFinderPoint: undefined,
};

export default function pointsReducer(state = initState, action) {
  switch (action.type) {
    case SET_FIRST_POINT: {
      return {...state, firstPoint: action.payload};
    }
    case SET_SECOND_POINT: {
      return {...state, secondPoint: action.payload};
    }
    case SET_VIEW_FINDER_POINT: {
      return {...state, viewFinderPoint: action.payload};
    }
    default:
      return state;
  }
}
