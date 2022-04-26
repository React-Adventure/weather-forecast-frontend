import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CARD_TYPE } from './consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

const ForecastCard = (props) => {
  const { weather, cardType } = props;
  
  let src = '';
  let descr = '';
  if (weather.length !== 0 && cardType === CARD_TYPE.icon) {
    src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    descr = weather.weather[0].description.toUpperCase();
  }

  return (
    <div className="row">
      <div className="col s12">
        <div className="card forecast-card">
          <FontAwesomeIcon
            className="wind-direction fa-rotate-by"
            icon={faArrowUpLong} 
            style={{"--fa-rotate-angle": `${weather?.wind?.deg}deg`}}
            size="3x"
          />
          <div className=" row weather-card weather-icon">
        <h5 className="f-w-600" style={{margin: 0}}>{weather.name}</h5>
        <img src={src}></img>
        <span className="f-w-600">{descr}</span>
      </div> 
          <div className="card-title center">
            <p><span>-5</span><span>-4</span></p>
          </div>
          {cardType !== CARD_TYPE.temperature && 
            <span className="card-title center">{cardType}</span>
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    weather: state.weatherData.weather
  }
}

export default connect(mapStateToProps)(ForecastCard);