import React from 'react';
import { CARD_TYPE } from './consts';
import ForecastCard from './ForecastCard';
import WeatherCard from './WeatherCard';

const Weather = (props) => {
  const { fetchCurrentWeather, cityAndParams } = props;

  return Object.keys(CARD_TYPE).map((key) => {
      return <WeatherCard key={CARD_TYPE[key]} cardType={CARD_TYPE[key]}></WeatherCard>
  })
};

export default Weather;