import { combineReducers } from "redux";
import { searchCityReducer } from "./searchCityReducer";

export const rootReducer = combineReducers({
  citiesData: searchCityReducer,
});