import { combineReducers } from "redux";
import { searchCityReducer } from "./searchCityReducer";
import { currentWeatherReducer } from "./currentWeatherReducer";

export const rootReducer = combineReducers({
  citiesData: searchCityReducer,
  weatherData: currentWeatherReducer
});