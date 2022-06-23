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
  // enablePointLabel: true,
  theme: {
    fontFamily: 'Quicksand',
    fontSize: 10,
    axsis: {
      tickColor: "#6c516b",
      ticks: {
        line: {
          stroke: "#6c516b"
        },
        text: {
          fill: "#6c516b"
        }
      }
    },
  },
  margin: { top: 50, right: 20, bottom: 50, left: 20 },
  colors: [ '#5B4059' ],
  
  enableGridX: false,
  enableGridY: false,

  xScale: {   
    type: "time",
    format: "%I:%M:%S %p",
    precision: "hour", 
  },
  xFormat: "time:%I %p %d %a",
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
  axisBottom: {
      orient: 'bottom',
      format: '%I %p',
      tickPadding: 5,
  },
  pointSize: 3,
  pointColor: "#5B4059",
  pointBorderWidth: 3,
  pointBorderColor: "#5B4059",

  pointLabelYOffset: -12,

  useMesh: true,            //-------------------- mesh for mouse events
  enableCrosshair: false,
  //crosshairType: 'bottom',  //-------------------- type for dash lines
  enableSlices: false,

  layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', customPoint, 'slices', 'mesh', 'legends'],
};

export default responsiveLineProps;