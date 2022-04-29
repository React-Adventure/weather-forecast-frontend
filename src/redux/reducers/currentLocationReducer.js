import {
  FETCH_CURR_LOCATION_LOADING,
  FETCH_CURR_LOCATION_FAIL,
  FETCH_CURR_LOCATION_SUCCESS
} from '../types';

const initialState = {
  currLocation: {},
  currLocationLoader: false,
}

export const currentLocationReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CURR_LOCATION_LOADING:
      return {
        ...state,
        currLocation: {},
        currLocationLoader: true,
      };
    case FETCH_CURR_LOCATION_SUCCESS:
      return {
        ...state,
        currLocation: action.payload.currLocation || {},
        currLocationLoader: false,
      };
    case FETCH_CURR_LOCATION_FAIL:
      return {
        ...state,
        currLocation: {},
        currLocationLoader: false,
      };
    default: 
      return state;
  }
};