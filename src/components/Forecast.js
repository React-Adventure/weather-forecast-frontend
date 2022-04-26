import React from 'react';
import { CARD_TYPE } from './consts';
import ForecastCard from './ForecastCard';

const Forecast = () => {
  return <div className="forecast-cards-wrap">
    <h4 className="weekly-forecast-title">Weekly Forecast</h4>
    {Object.keys(CARD_TYPE).map((key) => {
        return <ForecastCard key={CARD_TYPE[key]} cardType={CARD_TYPE[key]}></ForecastCard>
    })}
    <ForecastCard />
  </div>
};

export default Forecast;