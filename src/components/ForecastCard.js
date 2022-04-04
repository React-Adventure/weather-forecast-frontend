import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CARD_TYPE } from './consts';

const ForecastCard = (props) => {
  const { weather, cardType } = props;

  const cardProps = useCallback((type, data) => {
    const title = { title: cardType };
    switch (type) {
      case CARD_TYPE.weather: {
        return { ...title,
          opts: [
            <p className="weather-card-opts">
              <span>Tempetature:</span>
              <span>
                {data?.main?.temp}&#xb0;
                <span className="weather-card-measure">C</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Feels like:</span>
              <span>
                {data?.main?.feels_like}&#xb0;
                <span className="weather-card-measure">C</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Min temperature:</span>
              <span>
                {data?.main?.temp_min}&#xb0;
                <span className="weather-card-measure">C</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Max temperature:</span>
              <span>
                {data?.main?.temp_max}&#xb0;
                <span className="weather-card-measure">C</span>
              </span>
            </p>
          ]
        };
      }
      case CARD_TYPE.wind:
        return { ...title,
          opts: [
            <p className="weather-card-opts">
              <span>Speed:</span>
              <span>
                {data?.wind?.speed}
                <span className="weather-card-measure">meter/sec</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Direction:</span>
              <span>
                {data?.wind?.deg}
                <span className="weather-card-measure">&#xb0;</span>
              </span>
            </p>,
            <p className="weather-card-opts">
              <span>Gust:</span>
              <span>
                {data?.wind?.gust}
                <span className="weather-card-measure">meter/sec</span>
              </span>
            </p>,
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
                {data?.rain?.['3h'] || data?.snow?.['3h'] || '- '}
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
    <div className="row">
      <div className="col s12">
        <div className="card weather-card">
            <span className="card-title center">{cardOptions.title}</span>
          <div className="card-content">
            {cardOptions.opts.map(info => info)}
          </div>
          <div className="switch center weather-measure-toggler">
            <label>
              Metric
              <input type="checkbox" />
              <span className="lever"></span>
              Standart
            </label>
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