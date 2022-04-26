import React from 'react';
import { connect } from 'react-redux';
import ForecastCard from './ForecastCard';

const Forecast = (props) => {
  const { dailyForecast } = props;

  return <div className="forecast-cards-wrap">
    <h4 className="weekly-forecast-title">Weekly Forecast</h4>
    {dailyForecast.slice(0, 7).map((elem) => {
        return <ForecastCard key={elem.dt} forecast={elem}></ForecastCard>
    })}
  </div>
};

const mapStateToProps = (state) => {
  return {
    dailyForecast: state.weatherData.dailyForecast
  }
};
  
export default connect(mapStateToProps)(Forecast);