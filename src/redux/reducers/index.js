import { combineReducers } from "redux";
import { searchCityReducer } from "./searchCityReducer";
import { currentWeatherReducer } from "./currentWeatherReducer";
import { currentLocationReducer } from "./currentLocationReducer";

export const rootReducer = combineReducers({
  citiesData: searchCityReducer,
  weatherData: currentWeatherReducer,
  locationData: currentLocationReducer,
});