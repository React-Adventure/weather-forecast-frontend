import {
  FETCH_SEARCH_CITY_LOADING,
  FETCH_SEARCH_CITY_SUCCESS,
  FETCH_SEARCH_CITY_FAIL,
  CLEAN_SEARCH_RESULTS
} from '../types';
import cities from 'cities.json';
import { citySearchURL } from '../api.js';

export const addSearchParams = (value) => {
  if(!value) {
      return '';
  }

  return value.trim();
}

export const fetchSearchCities = (search) => {
  const city = addSearchParams(search);
  
  return async dispatch => {
    try {
      if(!city) {
        return;
      }

      dispatch({
        type: FETCH_SEARCH_CITY_LOADING
      });

      const json_mocked = cities.sort((curr, next) => (curr.name > next.name) ? 1 : ((next.name > curr.name) ? -1 : 0));
      
      const url = citySearchURL(city);

      const res = await fetch(url);
      const json = await res.json();

      dispatch({
        type: FETCH_SEARCH_CITY_SUCCESS,
        payload: { cities: json_mocked, citiesAPI: json }
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