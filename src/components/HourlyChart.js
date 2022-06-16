import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';
import responsiveLineProps from '../utils/responsiveLineProps';
import { getIconURL } from '../utils/API';

const HourlyChart = (props) => {
  const { hourlyForecast } = props;
  const [chartDataNivo, setChartDataNivo] = useState([]);

  useEffect(() => {
    if(hourlyForecast.length !== 0) {
      console.log('FORECAST: ', hourlyForecast);
      const a = {
        "id": "temp"
      };
  
      const data = hourlyForecast.slice(0,24).map((elem, ind) => {
        return {
          x: (new Date(elem.dt * 1000))
              .toLocaleTimeString ('en-US', {
                  hour: 'numeric',
                  hour12: true
              }),
          y: elem.temp,
          iconSrc: elem.weather[0].icon,
          iconAlt: elem.weather[0].description
        }
      });
      setChartDataNivo([{...a, data}]);

    }
  }, [hourlyForecast]);

  //----------------------------------------------------
  useEffect(() => {
    console.log('Chart data:', chartDataNivo);
  }, [chartDataNivo])
  //----------------------------------------------------

  return (
    hourlyForecast.length !== 0 && 
    <div className="hourly-chart-wrap">
      {/* <h6>Today</h6> */}
      <ResponsiveLine
        data={chartDataNivo}
        tooltip={ ({ point }) => {
          console.log('sdsdsd:', point);
          return (
            <div className='hourly-chart-tooltip'>
              <img 
                style={{
                  width: '50px',
                  height: '50px',
                }} 
                src={getIconURL(point.data.iconSrc)} 
                alt={point.data.iconAlt}>

              </img>
              <div>{point.data.yFormatted  + '°'}</div>
              <div>{point.data.xFormatted}</div>
            </div>
          )
        }}
        {...responsiveLineProps}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hourlyForecast: state.weatherData.hourlyForecast
  }
}

export default connect(mapStateToProps)(HourlyChart);
