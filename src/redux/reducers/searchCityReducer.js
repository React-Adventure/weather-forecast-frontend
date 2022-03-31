import {
  FETCH_SEARCH_CITY_LOADING,
  FETCH_SEARCH_CITY_SUCCESS,
  FETCH_SEARCH_CITY_FAIL,
  CLEAN_SEARCH_RESULTS
} from '../types';

const initialState = {
  cities: [],
  loader: false
}

export const searchCityReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_SEARCH_CITY_LOADING:
      return {
        ...state,
        loader: true,
        cities: []
      };
    case FETCH_SEARCH_CITY_SUCCESS:
      return {
        ...state,
        loader: false,
        cities: action.payload.cities || []
      };
    case FETCH_SEARCH_CITY_FAIL:
      return {
        ...state,
        loader: false,
        cities: []
      };
    case CLEAN_SEARCH_RESULTS:
      return {
        ...state,
        cities: []
      };
    default: 
      return state;
  }
};