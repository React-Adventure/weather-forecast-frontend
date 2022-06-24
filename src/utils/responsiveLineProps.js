import React from "react";
import { DotsItem } from '@nivo/core';

const customPoint = (props) => {
  debugger
  const { currentPoint, pointBorderWidth, pointColor, points, pointSize, pointSymbol, pointLabelYOffset } = props;
  console.log('Chart points props: ', props);

  return (points.map((point, ind, arr) => { 
    let dotShadow = null;

    if(
      ind % 4 === 0 ||
      ind === 0 || 
      ind === (arr.length - 1) ||
      (currentPoint !== null && point === currentPoint)
    ) {
      dotShadow = 
        <circle 
          fill={pointColor} 
          r={3} 
          strokeWidth={pointBorderWidth + 5} 
          stroke={pointColor} 
          strokeOpacity={0.35} 
          cx={point.x}
          cy={point.y}
        />;
    }
    
    return (
      <g key={point.id}>
        {dotShadow}
        <DotsItem
          key={point.id}
          x={point.x}
          y={point.y}
          datum={point.data}
          symbol={pointSymbol}
          size={pointSize}
          color={point.color}
          borderWidth={pointBorderWidth}
          borderColor={pointColor}
          label={dotShadow ? point.data.yFormatted : null}
          labelYOffset={pointLabelYOffset}
        />
    </g>
    )
  }));
};

const responsiveLineProps = {
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
  xFormat: "time:%I %p, %d %a",
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

  layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', customPoint, 'slices', 'mesh', 'legends'],
};

export default responsiveLineProps;