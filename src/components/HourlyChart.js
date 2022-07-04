import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';
import {} from '@nivo/annotations';
import responsiveLineProps from '../utils/responsiveLineProps';
import { getIconURL } from '../utils/API';
import DigitalClock from './DigitalClock';

const HourlyChart = (props) => {
  const { hourlyForecast, weather } = props;
  const [chartDataNivo, setChartDataNivo] = useState([]);
  const [chartSunset, setchartSunset] = useState(new Date(weather.sunset * 1000));
  const [chartSunrise, setchartSunrise] = useState(new Date(weather.sunrise * 1000));

  const getSunTime = () => {
    if(chartSunset.getTime() < (new Date(hourlyForecast[0].dt)).getTime()) {
      setchartSunset(new Date(dailyForecast[1].sunset * 1000));
    }
    
    if(chartSunrise.getTime() > (new Date(hourlyForecast[23].dt)).getTime()) {
      setchartSunrise(new Date(dailyForecast[1].sunset * 1000));
    }
  };

  useEffect(() => {
    if(hourlyForecast.length !== 0) {
      const a = {
        "id": "temp"
      };
  
      const data = hourlyForecast.slice(0,24).map((elem, ind) => {
        return {
          x: (new Date(elem.dt * 1000)),
          y: elem.temp,
          iconSrc: elem.weather[0].icon,
          iconAlt: elem.weather[0].description
        }
      });
      setChartDataNivo([{...a, data}]);

    }
  }, [hourlyForecast]);

  return (
    hourlyForecast.length !== 0 && 
    <div className="hourly-chart-wrap">
      <div className="hourly-chart-title">
        <h6>Today</h6>
        <DigitalClock />
      </div>
      <div className="hourly-chart">
        <ResponsiveLine
          data={chartDataNivo}
          tooltip={ ({ point }) => {
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
          markers={[
            {
              axis: 'x',
              value: new Date(weather.sunset * 1000),
              lineStyle: { 
                stroke: '#FF6347', 
                strokeWidth: 1, 
              },
              legend: `Sunset ${new Date(weather.sunset * 1000).toLocaleTimeString()}`,
              legendOffsetX: -40,
              legendOffsetY: -20,
              textStyle: {
                fill: '#6c516b',
                fontSize: 10,
              }
            },
            {
              axis: 'x',
              value:  new Date(weather.sunrise * 1000),
              lineStyle: { 
                stroke: '#FFD700', 
                strokeWidth: 1, 
                fontFamily: 'Quicksand'
              }, 
              legend: `Sunrise ${new Date(weather.sunrise * 1000).toLocaleTimeString()}`,
              legendPosition: 'top-right',
              legendOffsetX: -40,
              legendOffsetY: -20,
              textStyle: {
                fill: '#6c516b',
                fontSize: 10,
                }
            },
          ]}
          {...responsiveLineProps}
        />
      </div>
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hourlyForecast: state.weatherData.hourlyForecast,
    weather: state.weatherData.weather,
  }
}

export default connect(mapStateToProps)(HourlyChart);
