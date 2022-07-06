import {
  FETCH_SEARCH_CITY_LOADING,
  FETCH_SEARCH_CITY_SUCCESS,
  FETCH_SEARCH_CITY_FAIL,
  CLEAN_SEARCH_RESULTS
} from '../types';

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
      
      const cities = await import('cities.json');

      const json_mocked = cities.default.sort((curr, next) => (curr.name > next.name) ? 1 : ((next.name > curr.name) ? -1 : 0));

      dispatch({
        type: FETCH_SEARCH_CITY_SUCCESS,
        payload: { cities: json_mocked }
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