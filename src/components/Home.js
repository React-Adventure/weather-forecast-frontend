import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { fetchSearchCities, cleanSearchResults } from '../redux/actions/citySearch';
import _ from 'lodash';

const Home = (props) => {
  const { fetchSearchCities, cities, cleanSearchResults } = props;
  const [citySearch, setCitySearch] = useState('');
  const [cityTipsActive, setCityTipsActive] = useState(true);

  useEffect(() => {
    return () => {
        cleanSearchResults();
        debounceSearch.cancel();
    }
  }, []);

  const debounceSearch = useCallback(
    _.debounce(citySearch => {
        if(citySearch && cityTipsActive) {
          fetchSearchCities(citySearch);
        } else {
          cleanSearchResults();
        }
    }, 0), 
  [citySearch, cityTipsActive]);

  const updateCitySearch = (event) => {
    setCityTipsActive(true);
    const { value } = event.target;
    setCitySearch(value);

    debounceSearch(value);
  };

  const handleClickedCity = (event) => {
    const cityNameElement = event.currentTarget.getElementsByClassName('city-name')[0];
    setCitySearch(cityNameElement.innerText);
    
    event.currentTarget.parentNode.classList.remove('active');
    setCityTipsActive(false);
  }

  const searchedCities = (citySearch) => {
    const mathcedCities = cities.filter(city => city.name.toUpperCase().startsWith(citySearch.toUpperCase()))
    .map(city => {
      return (
        <li 
        key={city.country + city.name}
          className="search-results-item" 
          onClick={handleClickedCity}
        >
          <FontAwesomeIcon
          className="location-dot-icon"
            icon={faLocationDot} 
            size="2x"
          /> 
          <span className="city-name">{city.name}</span>
        </li>
      );
    });
    
    return mathcedCities ? <ul className="search-results-wrap active">
      {mathcedCities}
    </ul>  : <></>
  };
 
  const searchBtnHandler = () => {
    console.log('Btn clicked!');
  };

  return (
    <div className='wrap'>
      <h1>Weather Forecast App</h1>
      <div className="search-wrap"> 
        <div className="search-line-wrap">
          <div className="search-input-wrap"> 
            <FontAwesomeIcon
            className="search-icon"
              icon={faSearch} 
              size="lg"
            />       
            <input 
              type="text" 
              placeholder="Type anything..." 
              id="search" 
              autoComplete="off"
              value={citySearch}
              onChange={updateCitySearch}
            />
          </div>
            
            {cityTipsActive && searchedCities(citySearch)}
        </div>       
          
            <button className="search-btn" onClick={searchBtnHandler}>Search</button>
        </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cities: state.citiesData.cities,
  };
};

const mapDispatchToProps = { 
  fetchSearchCities,
  cleanSearchResults
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);