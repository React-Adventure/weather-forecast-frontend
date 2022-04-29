import React from 'react';
import { CARD_TYPE } from './consts';
import WeatherCard from './WeatherCard';

const Weather = () => {
  return <div className="weather-cards-wrap">
    {Object.keys(CARD_TYPE).map((key) => {
        return (
          <WeatherCard 
            key={CARD_TYPE[key]} cardType={CARD_TYPE[key]}
          ></WeatherCard>
        );
    })}
  </div>
};

export default Weather;