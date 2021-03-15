import {SET_FIRST_POINT, SET_SECOND_POINT, SET_VIEW_FINDER_POINT} from '../types';

export const setFirstPoint = (point) => {
  return {
    type: SET_FIRST_POINT,
    payload: point,
  };
};

export const setSecondPoint = (point) => {
  return {
    type: SET_SECOND_POINT,
    payload: point,
  };
};

export const setViewFinderPoint = (point) => {
    return {
      type: SET_VIEW_FINDER_POINT,
      payload: point,
    };
  };
