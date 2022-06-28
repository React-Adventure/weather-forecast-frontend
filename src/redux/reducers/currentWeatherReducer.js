import {
  FETCH_WEATHER_FAIL,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_LOADING,
  CLEAN_WEATHER_RESULTS
} from '../types';

const initialState = {
  weather: [],
  weatherLoader: true,
  dailyForecast: [],
  hourlyForecast: []
}

export const currentWeatherReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_WEATHER_LOADING:
      return {
        ...state,
        weatherLoader: true,
        weather: [],
        dailyForecast: [],
        hourlyForecast: []
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weatherLoader: false,
        weather: action.payload.weather || [],
        dailyForecast: action.payload.dailyForecast || [],
        hourlyForecast: action.payload.hourlyForecast || []
      };
    case FETCH_WEATHER_FAIL:
      return {
        ...state,
        weatherLoader: false,
        weather: [],
        dailyForecast: [],
        hourlyForecast: []
      };
    case CLEAN_WEATHER_RESULTS: 
      return {
        ...state,
        weather: [],
        dailyForecast: [],
        hourlyForecast: []
      }
    default: 
      return state;
  }
};