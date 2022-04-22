import { weatherURL } from "../api";
import { 
  FETCH_WEATHER_LOADING, 
  FETCH_WEATHER_SUCCESS, 
  FETCH_WEATHER_FAIL 
} from "../types";

const cityCheck = (city) => {
  const a = !!city;
  const b = Object.keys(city).length === 0;
  const c = Object.getPrototypeOf(city) === Object.prototype;
  return (
    city && 
    Object.keys(city).length !== 0 && 
    Object.getPrototypeOf(city) === Object.prototype
  );
};

export const fetchCurrentWeather = (city, units = 'metric') => {
  const isCity = cityCheck(city);
  
  return async dispatch => {
    try {
      debugger
      if(!isCity) {
        return;
      }

      dispatch({
        type: FETCH_WEATHER_LOADING
      });
      
      const url = weatherURL(city, units);

      const res = await fetch(url);
      const json = await res.json();
      console.log(json);

      dispatch({
        type: FETCH_WEATHER_SUCCESS,
        payload: { weather: json }
      });

    } catch(err) {
      console.log(err.toString());

      dispatch({
        type: FETCH_WEATHER_FAIL
      })
    }
  }
};