import {
  FETCH_WEATHER_FAIL,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_LOADING
} from '../types';

const initialState = {
  weather: [],
  weatherLoader: false,
  dailyForecast: []
}

export const currentWeatherReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_WEATHER_LOADING:
      return {
        ...state,
        weatherLoader: true,
        weather: [],
        dailyForecast: []
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weatherLoader: false,
        weather: action.payload.weather || [],
        dailyForecast: action.payload.dailyForecast || []
      };
    case FETCH_WEATHER_FAIL:
      return {
        ...state,
        weatherLoader: false,
        weather: [],
        dailyForecast: []
      };
    default: 
      return state;
  }
};