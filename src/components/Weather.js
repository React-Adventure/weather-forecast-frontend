import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentWeather } from '../redux/actions/currentWeater';
import { CARD_TYPE } from './consts';
import ForecastCard from './ForecastCard';
import WeatherCard from './WeatherCard';
const Weather = (props) => {
  const { fetchCurrentWeather, cityAndParams } = props;

  const toggleMeasure = (event) => {
    console.log('CLICK:', event.target.checked);

    if (event.target.checked) {
      fetchCurrentWeather(cityAndParams,'imperial');
    } else {
      fetchCurrentWeather(cityAndParams);
    }
  }

  return (
    <>
      <div className="row switch center weather-measure-toggler">
        <label>
          Metric
          <input type="checkbox" onClick={toggleMeasure} />
          <span className="lever"></span>
          Imperial
        </label>
      </div>
      <WeatherCard key={CARD_TYPE.icon} cardType={CARD_TYPE.icon}></WeatherCard>
      <WeatherCard key={CARD_TYPE.temperature} cardType={CARD_TYPE.temperature}></WeatherCard>
      <WeatherCard key={CARD_TYPE.wind} cardType={CARD_TYPE.wind}></WeatherCard>
      <WeatherCard key={CARD_TYPE.extra} cardType={CARD_TYPE.extra}></WeatherCard>
    </>
  );
};


const mapDispatchToProps = { 
  fetchCurrentWeather
};

export default connect(null, mapDispatchToProps)(Weather);