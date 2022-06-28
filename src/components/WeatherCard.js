import React, { useCallback, useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { CARD_TYPE, MEASUREMENT, MEASUREMENT_SYSTEM } from './consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import MeasurementSystemContext from './context/MeasurementSystemContext';
import CityContext from './context/CityContext';
import { getIconURL } from '../utils/API';
import classNames from 'classnames';

const WeatherCard = (props) => {
  const { weather, cardType, currCard } = props;
  const { measureSystem } = useContext(MeasurementSystemContext);
  const { cityAndParams } = useContext(CityContext);

  let src = '';
  let descr = '';
  if (weather.length !== 0 && cardType === CARD_TYPE.icon) {
    src = getIconURL(weather.weather[0].icon);
    descr = weather.weather[0].description.toUpperCase();
  }

  const cardProps = useCallback((type, data) => {
    const title = { title: cardType };
    switch (type) {
      case CARD_TYPE.temperature: {
        return { ...title,
          opts: [
            <p className="weather-card-opts justify-content-center">
              <span className="weather-card-temperature">
                {Math.round(data?.temp)}&#xb0;
                <span className="weather-card-measure">{measureSystem === MEASUREMENT_SYSTEM.imperial ? MEASUREMENT.imperial.temp : MEASUREMENT.metric.temp}</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Feels like:</span>
              <span>
                {Math.round(data?.feels_like)}&#xb0;
                <span className="weather-card-measure">{measureSystem === MEASUREMENT_SYSTEM.imperial ? MEASUREMENT.imperial.temp : MEASUREMENT.metric.temp}</span>
              </span>
            </p>
          ]
        };
      }
      case CARD_TYPE.wind:
        return { ...title,
          opts: [
            <p className="weather-card-opts justify-content-center">
              <FontAwesomeIcon
                className="wind-direction fa-rotate-by"
                icon={faArrowRightLong} 
                style={{"--fa-rotate-angle": `-${data?.wind_deg}deg`}}
                size="3x"
              />
            </p>,
            <p className="weather-card-opts">
              <span>Speed:</span>
              <span>
                {data?.wind_speed}
                <span className="weather-card-measure">{measureSystem === MEASUREMENT_SYSTEM.imperial ? MEASUREMENT.imperial.windSpeed : MEASUREMENT.metric.windSpeed}</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Gust:</span>
              <span>
                { weather?.wind_gust || '-' }
                <span className="weather-card-measure">{measureSystem === MEASUREMENT_SYSTEM.imperial ? MEASUREMENT.imperial.windGust : MEASUREMENT.metric.windGust}</span>
              </span>
            </p>
          ]
        };
      case CARD_TYPE.extra:
        return { ...title,
          opts: [
            <p className="weather-card-opts">
                <span>Pressure:</span>
                <span>
                  {data?.pressure}
                  <span className="weather-card-measure">hPa</span>
                </span>
            </p>,
            <p className="weather-card-opts">
              <span>Humidity:</span>
              <span>
                {data?.humidity}
                <span className="weather-card-measure">%</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Clouds:</span>
              <span>
                {data?.clouds}
                <span className="weather-card-measure">%</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Precipitation:</span>
              <span>
                {data?.rain?.['3h'] || data?.snow?.['3h'] || '-'}
                <span className="weather-card-measure">mm</span>
              </span>
            </p>
          ]
        };
      default:
        return;
    }
  }, []);
  
  const [cardOptions, setCardOptions] = useState(cardProps(cardType, weather));

  useEffect(() => {
    setCardOptions(cardProps(cardType, weather));
  }, [cardType, weather, cardProps]);
      
  return (
    cardType === CARD_TYPE.icon ? 
      <div className={classNames("row weather-card weather-icon h200-w250", {'not-curr-item': cardType !== currCard  })}>
        <h5 className="f-w-600" style={{margin: 0}}>{cityAndParams.name}</h5>
        <img src={src}></img>
        <span className="f-w-600">{descr}</span>
      </div> 
    :
    <div className={classNames("row", { 'not-curr-item': cardType !== currCard })}>
      <div className="col s12">
        <div className="card weather-card">
            {cardOptions.title !== CARD_TYPE.temperature && 
              <span className="card-title center">{cardOptions.title}</span>
            }
          <div className="card-content">
            {cardOptions.opts.map(info => info)}
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

export default connect(mapStateToProps)(WeatherCard);