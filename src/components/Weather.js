import React, { useEffect, useState } from 'react';
import { CARD_TYPE } from './consts';
import WeatherCard from './WeatherCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { Carousel } from 'react-responsive-carousel';

import { Carousel } from 'react-materialize';
import M from "materialize-css";

const Weather = () => {
  const [currCard, setCurrCard] = useState(true);
//   document.addEventListener('DOMContentLoaded', function() {
//     // Initialising mterialise-css functions
//     var elemsCarousel = document.querySelectorAll('.carousel');
//     M.Carousel.init(elemsCarousel);

//     M.Carousel.getInstance(elemsCarousel).set(2);

//     window.setInterval(function () {
//         M.Carousel.getInstance(elemsCarousel).next()
//     }, 2000)
// });

  return <div className="weather-cards-wrap">
    <div className="cards-carousel">
      <div className="carousel-arrow carousel-arrow-left">
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
      <div className="carousel-arrow carousel-arrow-right">
        <FontAwesomeIcon 
          className="fa-solid" 
          icon={faAngleRight} 
          size={"lg"}
        />
      </div>
    </div>
  </div>
};

export default Weather;