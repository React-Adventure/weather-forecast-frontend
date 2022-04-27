import { currLocationURL } from "../api";
import { 
  FETCH_CURR_LOCATION_SUCCESS,
  FETCH_CURR_LOCATION_FAIL,
  FETCH_CURR_LOCATION_LOADING
} from "../types";
import { fetchCurrentWeather } from "./currentWeater";

export const fetchCurrentGeoWeather = (lat, lon, measurement) => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_CURR_LOCATION_LOADING
      });
      
      const url = currLocationURL(lat, lon);

      const res = await fetch(url);
      const city = await res.json();

      dispatch({
        type: FETCH_CURR_LOCATION_SUCCESS,
        payload: { currLocation: city[0] }
      });
      
      dispatch(fetchCurrentWeather(city[0], measurement));

    } catch(err) {
      console.log(err.toString());

      dispatch({
        type: FETCH_CURR_LOCATION_FAIL
      })
    }
  }
}