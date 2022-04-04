import React from 'react';
import { connect } from 'react-redux';
import { CARD_TYPE } from './consts';
import ForecastCard from './ForecastCard';
const Weather = (props) => {
  const { weather } = props;

  let src = '';
  let descr = '';
  if (weather.length !== 0) {
    src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    descr = weather.weather[0].description.toUpperCase();
  }

  return (
    <>
      <ForecastCard cardType={CARD_TYPE.weather}></ForecastCard>
      {src ? 
        <div className=" row weather-card weather-icon">
          <h5 className="f-w-600" style={{margin: 0}}>{weather.name}</h5>
          <img src={src}></img>
          <span className="f-w-600">{descr}</span>
        </div> 
      : <></> }
      <ForecastCard cardType={CARD_TYPE.wind}></ForecastCard>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    weather: state.weatherData.weather
  }
}

export default connect(mapStateToProps)(Weather);