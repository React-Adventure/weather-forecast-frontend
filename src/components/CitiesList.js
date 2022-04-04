import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

 
const CitiesList = ({ matchedCities, handleClickedCity }) => {
  debugger
  return (
    <List
      height={300}
      itemCount={matchedCities.length}
      itemSize={75}
      width={'100%'}
    >
      {({index, style}) => {
        return ( 
          <li 
          style={style}
            key={matchedCities[index].country + matchedCities[index].name + matchedCities[index].lat + matchedCities[index].lon}
            className="search-results-item" 
            onClick={handleClickedCity}
          >
              <FontAwesomeIcon
              className="location-dot-icon"
                icon={faLocationDot} 
                size="2x"
              /> 
              <span className="city-name">{matchedCities[index].name + ', ' + matchedCities[index].country}</span>
          </li>
        )
      }}
    </List>
  )
};

export default CitiesList;
