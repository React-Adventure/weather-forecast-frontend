import React, { useState, useEffect, useContext } from 'react';
import { MEASUREMENT_SYSTEM, MEASUREMENT } from './consts';
import MeasurementSystemContext from './context/MeasurementSystemContext';

const ForecastCard = (props) => {
  const { forecast } = props;

  const { measureSystem } = useContext(MeasurementSystemContext); 

  const [iconSrc, setIconSrc] = useState('');
  const [iconAlt, setIconAlt] = useState('');

  useEffect(() => {
    if(forecast) {
      setIconSrc(`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`);
      setIconAlt(forecast.weather[0].description);
    }
  }, [forecast]);

  // const descr = forecast.weather[0].description.toUpperCase();

  return (
    <div className="row">
      <div className="col s12">
        <div className="card forecast-card">
          <img src={iconSrc} alt={iconAlt}></img>
          <h5 className="f-w-600" style={{margin: 0}}>
          {Math.round(forecast?.temp?.min)} / {Math.round(forecast?.temp?.max)} &#xb0;
                <span className="forecast-card-measure">
                  {measureSystem === MEASUREMENT_SYSTEM.imperial ? MEASUREMENT.imperial.temp : MEASUREMENT.metric.temp}
                </span>
                </h5>
          <h6 className="f-w-600">{(new Date(forecast?.dt * 1000)).toLocaleDateString('en-US', {weekday: 'long'})}</h6>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;