const API_KEY = '98c255aee477c1c3287c84b18e9d09c8';

//************* CITY SEARCH ******************
const CITIES_BASE_URL = 'https://api.openweathermap.org/geo/1.0';
const CITY_SEARCH ='/direct?q=';
const LIMIT = 30;

//************* WEATHER SEARCH ******************
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER ='/weather?';
const CURRENT_AND_FORECAST ='/onecall?';


export const citySearchURL = (cityName) => {
  const url = `${CITIES_BASE_URL}${CITY_SEARCH}${cityName}&limit=${LIMIT}&appid=${API_KEY}`;
  return url;
};

export const weatherURL = (city, units) => {
  const url = `${WEATHER_BASE_URL}${WEATHER}lat=${city.lat}&lon=${city.lng}&appid=${API_KEY}&units=${units}`;
  return url;
};

export const currentAndForecastURL = (city, units = 'metric') => {
  const url = `${WEATHER_BASE_URL}${CURRENT_AND_FORECAST}lat=${city.lat}&lon=${city.lng}&exclude={minutely,hourly,alerts}&appid=${API_KEY}&units=${units}`;

  return url;
};