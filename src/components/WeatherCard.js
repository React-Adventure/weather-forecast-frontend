import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CARD_TYPE } from './consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

const WeatherCard = (props) => {
  const { weather, cardType } = props;

  let src = '';
  let descr = '';
  if (weather.length !== 0 && cardType === CARD_TYPE.icon) {
    src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
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
                {Math.round(data?.main?.temp)}&#xb0;
                <span className="weather-card-measure">C</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Feels like:</span>
              <span>
                {Math.round(data?.main?.feels_like)}&#xb0;
                <span className="weather-card-measure">C</span>
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
                icon={faArrowUpLong} 
                style={{"--fa-rotate-angle": `${data?.wind?.deg}deg`}}
                size="3x"
              />
            </p>,
            <p className="weather-card-opts">
              <span>Speed:</span>
              <span>
                {data?.wind?.speed}
                <span className="weather-card-measure">meter/sec</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Gust:</span>
              <span>
                { weather?.wind?.gust || '-' }
                <span className="weather-card-measure">meter/sec</span>
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
                  {data?.main?.pressure}
                  <span className="weather-card-measure">hPa</span>
                </span>
            </p>,
            <p className="weather-card-opts">
              <span>Humidity:</span>
              <span>
                {data?.main?.humidity}
                <span className="weather-card-measure">%</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Clouds:</span>
              <span>
                {data?.clouds?.all}
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
      <div className=" row weather-card weather-icon">
        <h5 className="f-w-600" style={{margin: 0}}>{weather.name}</h5>
        <img src={src}></img>
        <span className="f-w-600">{descr}</span>
      </div> 
    :
    <div className="row">
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