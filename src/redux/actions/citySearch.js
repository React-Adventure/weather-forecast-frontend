import {
  FETCH_SEARCH_CITY_LOADING,
  FETCH_SEARCH_CITY_SUCCESS,
  FETCH_SEARCH_CITY_FAIL,
  CLEAN_SEARCH_RESULTS
} from '../types';
import cities from 'cities.json';

let Cities = [];

for(let i = 0; i < 100; i++) {
  Cities.push(cities[i]);
}

const addSearchParams = (value) => {
  if(!value) {
      return '';
  }

  return value;
}

export const fetchSearchCities = (search) => {
  addSearchParams(search);

  return dispatch => {
    try {
      dispatch({
        type: FETCH_SEARCH_CITY_LOADING
      });

      const json = Cities;

      dispatch({
        type: FETCH_SEARCH_CITY_SUCCESS,
        payload: json
      });

    } catch(err) {
      console.log(err.toString());

      dispatch({
        type: FETCH_SEARCH_CITY_FAIL
      })
    }
  }
};

export const cleanSearchResults = () => {
  return dispatch => {
      dispatch({
          type: CLEAN_SEARCH_RESULTS
      });
  }
};