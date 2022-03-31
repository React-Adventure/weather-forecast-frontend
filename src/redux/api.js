const BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const API_KEY = '98c255aee477c1c3287c84b18e9d09c8';
const LIMIT = 30;

export const citySearchURL = (cityName) => {
  const url = `${BASE_URL}${cityName}&limit=${LIMIT}&appid=${API_KEY}`;
  return url;
};