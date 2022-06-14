import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as V from 'victory';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ResponsiveLine } from '@nivo/line'

const styles = {
  chartsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px',
    width: '800px',
    height: '600px'
  }
};

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
  const [chartData, setChartData] = useState([]);
  const [chartDataNivo, setChartDataNivo] = useState([]);

  useEffect(() => {
    console.log(hourlyForecast);
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
        y: elem.temp + '°',
      }
    });
    setChartDataNivo([{...a, data}]);

    setChartData(hourlyForecast.slice(0,24).map((elem, ind) => {
      // if(ind <= 23)
      return {
        x: (new Date(elem.dt * 1000))
            .toLocaleTimeString ('en-US', {
                hour: 'numeric',
                hour12: true
            }),
        y: elem.temp + '°',
      }
    }))

  }, [hourlyForecast]);
  useEffect(() => {
    console.log('Chart data:', chartDataNivo);
  }, [chartDataNivo])

  return (
    hourlyForecast.length !== 0 && 
    <div className="hourly-chart-wrap" style={styles.chartsWrap}>
      <ResponsiveLine
      theme={{
        fontFamily: 'Quicksand',
        axsis: {
          tickColor: "#D99426",
          ticks: {
            line: {
              stroke: "#5CD926"
            },
            text: {
              fill: "#D92635"
            }
          },
          legend: {
            text: {
              fill: '#2638D9'
            }
          }
        }
      }}
      curve="linear"
      data={chartDataNivo}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      enableGridX={false}
      enableGridY={false}
      enablePointLabel={true}
      colors={[ '#5B4059' ]}
      xScale={{ type: 'point' }}
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
      }}
      // curve="cardinal"
      yFormat=" >-.2d"
      axisTop={null}
      axisRight={null}
      axisLeft={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0
      }}
      // axisLeft={{
      //     orient: 'left',
      //     tickSize: 5,
      //     tickPadding: 5,
      //     tickRotation: 0,
      //     legend: 'Temperature',
      //     legendOffset: -40,
      //     legendPosition: 'middle',
      // }}
      pointSize={3}
      pointColor={"#5B4059"}
      pointBorderWidth={3}
      pointBorderColor={ "#5B4059" }
      pointLabelYOffset={-12}
      useMesh={true}
      // lineWidth={4}
      // legends={[
      //     {
      //         anchor: 'bottom-right',
      //         direction: 'column',
      //         justify: false,
      //         translateX: 100,
      //         translateY: 0,
      //         itemsSpacing: 0,
      //         itemDirection: 'left-to-right',
      //         itemWidth: 80,
      //         itemHeight: 20,
      //         itemOpacity: 0.75,
      //         symbolSize: 8,
      //         symbolShape: 'circle',
      //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
      //         effects: [
      //             {
      //                 on: 'hover',
      //                 style: {
      //                     itemBackground: 'rgba(0, 0, 0, .03)',
      //                     itemOpacity: 1
      //                 }
      //             }
      //         ]
      //     }
      // ]}
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
