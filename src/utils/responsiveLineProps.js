import React from "react";

const customPoint = (props) => {
  const { currentPoint, pointBorderWidth, pointColor, points, enablePointLabel } = props;
  // console.log('Chart points props: ', props);

  return ( points.map((pnt, ind, arr) => { 
    if(
      ind % 4 === 0 ||
      ind === 0 || 
      ind === (arr.length - 1) ||
      (currentPoint !== null && pnt === currentPoint)
    ) {
      return (
        <g key={`${pnt.x} ${pnt.y}`}>
          <circle
            fill={pointColor}
            r={3}
            strokeWidth={pointBorderWidth + 5}
            stroke={pointColor}
            strokeOpacity={0.35}
            cx={pnt.x}
            cy={pnt.y}
          />
      </g>
      )
    }
  }));
};

const responsiveLineProps = {
  theme: {
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
    },
    tooltip: {
      // container: {
      //   background: "rgba(252, 207, 221, 0.7)",
      //   color: "#6c516b",
      //   fontSize: 12
      // },
      basic: {},
      chip: {},
      table: {},
      tableCell: {},
      tableCellValue: {}
    }
  },
  margin: { top: 50, right: 50, bottom: 50, left: 50 },
  colors: [ '#5B4059' ],
  
  enableGridX: false,
  enableGridY: false,
  enablePointLabel: true,

  xScale: { type: 'point' },
  yScale:{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false
  },
  curve: "linear",
  yFormat: " >-.2d",

  axisTop: null,
  axisRight: null,
  axisLeft: null,
  axisBottom: null/*{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0
  }*/,
  pointSize: 3,
  pointColor: "#5B4059",
  pointBorderWidth: 3,
  pointBorderColor: "#5B4059",

  // labelYOffset: -120,
  // labelXOffset: -100,

  useMesh: true,            //-------------------- mesh for mouse events
  enableCrosshair: false,
  //crosshairType: 'bottom',  //-------------------- type for dash lines

  layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', customPoint, 'slices', 'mesh', 'legends'],
};

export default responsiveLineProps;