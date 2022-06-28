import React, { useState, useRef } from 'react';
import { CARD_TYPE } from './consts';
import WeatherCard from './WeatherCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ARROW_DIRECTION = {
  L: 'left',
  R: 'right',
  N: 'none'
};

const Weather = () => {
  const [currCard, setCurrCard] = useState(CARD_TYPE.icon);
  const arrow = useRef(ARROW_DIRECTION.N);
  console.log(arrow);

  const arrowsClick = () => {
    const cardsArr = Object.keys(CARD_TYPE);
    const currItemIndex = cardsArr.findIndex(item => CARD_TYPE[item] === currCard);

    switch(arrow.current) {
      case 'left': {
        cardsArr[currItemIndex - 1] !== undefined ? setCurrCard(CARD_TYPE[cardsArr[currItemIndex - 1]]) : setCurrCard(CARD_TYPE[cardsArr[cardsArr.length - 1]]);

        break;
      }
      case 'right': {
        cardsArr[currItemIndex + 1] !== undefined ? setCurrCard(CARD_TYPE[cardsArr[currItemIndex + 1]]) : setCurrCard(CARD_TYPE[cardsArr[0]]);

        break;
      }
      default: break;
    }
  };

  return <div className="weather-cards-wrap">
    <div className="cards-carousel">
      <div className="carousel-arrow carousel-arrow-left" onClick={() => {
        arrow.current = ARROW_DIRECTION.L;
        arrowsClick();
      }}>
        <FontAwesomeIcon 
          className="fa-solid" 
          icon={faAngleLeft} 
          size={"lg"}
        />
      </div>
      {Object.keys(CARD_TYPE).map((key) => {
          return (
            <WeatherCard 
              key={CARD_TYPE[key]} cardType={CARD_TYPE[key]} currCard={currCard}
            ></WeatherCard>
          );
        })
      }
      <div className="carousel-arrow carousel-arrow-right" onClick={() => {
        arrow.current = ARROW_DIRECTION.R;
        arrowsClick();
      }}>
        <FontAwesomeIcon 
          className="fa-solid" 
          icon={faAngleRight} 
          size={"lg"}
        />
      </div>
      <div className="carousel-dots">
        {Object.keys(CARD_TYPE).map(() => {
          return (
            <p className="dot"></p>
          )
        })}
      </div>
    </div>
  </div>
};

export default Weather;