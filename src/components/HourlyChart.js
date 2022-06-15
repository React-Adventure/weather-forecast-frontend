import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';
import responsiveLineProps from '../utils/responsiveLineProps';

const data = [
  {
    "id": "japan",
    "color": "hsl(116, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 144
      },
      {
        "x": "helicopter",
        "y": 23
      },
      {
        "x": "boat",
        "y": 27
      },
      {
        "x": "train",
        "y": 13
      },
      {
        "x": "subway",
        "y": 230
      },
      {
        "x": "bus",
        "y": 16
      },
      {
        "x": "car",
        "y": 144
      },
      {
        "x": "moto",
        "y": 77
      },
      {
        "x": "bicycle",
        "y": 191
      },
      {
        "x": "horse",
        "y": 268
      },
      {
        "x": "skateboard",
        "y": 186
      },
      {
        "x": "others",
        "y": 222
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(22, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 132
      },
      {
        "x": "helicopter",
        "y": 275
      },
      {
        "x": "boat",
        "y": 166
      },
      {
        "x": "train",
        "y": 21
      },
      {
        "x": "subway",
        "y": 87
      },
      {
        "x": "bus",
        "y": 146
      },
      {
        "x": "car",
        "y": 27
      },
      {
        "x": "moto",
        "y": 43
      },
      {
        "x": "bicycle",
        "y": 82
      },
      {
        "x": "horse",
        "y": 90
      },
      {
        "x": "skateboard",
        "y": 120
      },
      {
        "x": "others",
        "y": 202
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(355, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 90
      },
      {
        "x": "helicopter",
        "y": 8
      },
      {
        "x": "boat",
        "y": 148
      },
      {
        "x": "train",
        "y": 46
      },
      {
        "x": "subway",
        "y": 248
      },
      {
        "x": "bus",
        "y": 222
      },
      {
        "x": "car",
        "y": 47
      },
      {
        "x": "moto",
        "y": 298
      },
      {
        "x": "bicycle",
        "y": 223
      },
      {
        "x": "horse",
        "y": 120
      },
      {
        "x": "skateboard",
        "y": 61
      },
      {
        "x": "others",
        "y": 171
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(54, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 90
      },
      {
        "x": "helicopter",
        "y": 227
      },
      {
        "x": "boat",
        "y": 292
      },
      {
        "x": "train",
        "y": 237
      },
      {
        "x": "subway",
        "y": 29
      },
      {
        "x": "bus",
        "y": 7
      },
      {
        "x": "car",
        "y": 78
      },
      {
        "x": "moto",
        "y": 145
      },
      {
        "x": "bicycle",
        "y": 42
      },
      {
        "x": "horse",
        "y": 228
      },
      {
        "x": "skateboard",
        "y": 46
      },
      {
        "x": "others",
        "y": 165
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(333, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 75
      },
      {
        "x": "helicopter",
        "y": 258
      },
      {
        "x": "boat",
        "y": 222
      },
      {
        "x": "train",
        "y": 109
      },
      {
        "x": "subway",
        "y": 266
      },
      {
        "x": "bus",
        "y": 57
      },
      {
        "x": "car",
        "y": 142
      },
      {
        "x": "moto",
        "y": 300
      },
      {
        "x": "bicycle",
        "y": 16
      },
      {
        "x": "horse",
        "y": 140
      },
      {
        "x": "skateboard",
        "y": 67
      },
      {
        "x": "others",
        "y": 279
      }
    ]
  }
];

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
                src={`https://openweathermap.org/img/wn/${point.data.iconSrc}@2x.png`} 
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
