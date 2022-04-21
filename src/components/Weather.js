import React from 'react';
import { connect } from 'react-redux';
import { CARD_TYPE } from './consts';
import WeatherCard from './WeatherCard';
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
      <WeatherCard cardType={CARD_TYPE.temperature}></WeatherCard>
      {src ? 
        <div className=" row weather-card weather-icon">
          <h5 className="f-w-600" style={{margin: 0}}>{weather.name}</h5>
          <img src={src}></img>
          <span className="f-w-600">{descr}</span>
        </div> 
      : <></> }
      <WeatherCard cardType={CARD_TYPE.wind}></WeatherCard>
      <WeatherCard cardType={CARD_TYPE.extra}></WeatherCard>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    weather: state.weatherData.weather
  }
}

export default connect(mapStateToProps)(Weather);