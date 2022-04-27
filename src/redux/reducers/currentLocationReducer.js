import {
  FETCH_CURR_LOCATION_LOADING,
  FETCH_CURR_LOCATION_FAIL,
  FETCH_CURR_LOCATION_SUCCESS
} from '../types';

const initialState = {
  currLocation: {}
}

export const currentLocationReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CURR_LOCATION_LOADING:
      return {
        ...state,
        currLocation: {}
      };
    case FETCH_CURR_LOCATION_SUCCESS:
      return {
        ...state,
        currLocation: action.payload.currLocation || {},
      };
    case FETCH_CURR_LOCATION_FAIL:
      return {
        ...state,
        currLocation: {}
      };
    default: 
      return state;
  }
};