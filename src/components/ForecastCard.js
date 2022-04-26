import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CARD_TYPE } from './consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

const ForecastCard = (props) => {
  const { weather, cardType } = props;

  return (
    <div className="row">
      <div className="col s12">
        <div className="card weather-card">
          <FontAwesomeIcon
            className="wind-direction fa-rotate-by"
            icon={faArrowUpLong} 
            style={{"--fa-rotate-angle": `${data?.wind?.deg}deg`}}
            size="3x"
          />
            {cardOptions.title !== CARD_TYPE.temperature && 
              <span className="card-title center">{cardOptions.title}</span>
            }
          <div className="card-content">
            <p><span>-5</span><span>-4</span></p>
          </div>
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