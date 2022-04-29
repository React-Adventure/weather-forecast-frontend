import { currentAndForecastURL } from "../api";
import { 
  FETCH_WEATHER_LOADING, 
  FETCH_WEATHER_SUCCESS, 
  FETCH_WEATHER_FAIL,
  CLEAN_WEATHER_RESULTS
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
      if(!isCity) {
        return;
      }

      dispatch({
        type: FETCH_WEATHER_LOADING
      });
      
      const url = currentAndForecastURL(city, units);

      const res = await fetch(url);
      const json = await res.json();

      dispatch({
        type: FETCH_WEATHER_SUCCESS,
        payload: { 
          weather: json.current, 
          dailyForecast: json.daily,
          hourlyForecast: json.hourly
        }
      });

    } catch(err) {
      console.log(err.toString());

      dispatch({
        type: FETCH_WEATHER_FAIL
      })
    }
  }
};

export const cleanWeatherResults = () => {
  return dispatch => {
      dispatch({
          type: CLEAN_WEATHER_RESULTS
      });
  }
};