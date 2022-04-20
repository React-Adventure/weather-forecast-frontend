import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { fetchSearchCities, cleanSearchResults } from '../redux/actions/citySearch';
import { fetchCurrentWeather } from '../redux/actions/currentWeater';
import Weather from './Weather';
import CitiesList from './CitiesList';

const Home = (props) => {
  const { fetchSearchCities, cities, cleanSearchResults, citiesLoader, citiesAPI } = props;
  const { weather, fetchCurrentWeather, weatherLoader } = props;

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
    }), 
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
    if(!citySearch || !citySearch.trim()) {
      return;
    }

    const matchedCities = cities.filter(city => city.name.toUpperCase()
      .startsWith(citySearch.trim().toUpperCase()));
    
    return (
      <ul className="search-results-wrap active">
        { matchedCities.length !== 0 ? 
          <CitiesList 
            matchedCities={matchedCities} 
            handleClickedCity={handleClickedCity} 
          /> : 
          <li 
            key={'123'}
            className="search-results-item justify-content-center" 
          >
            {citiesLoader ? 
              <FontAwesomeIcon
                className="fa-pulse spinner-icon"
                icon={faSpinner} 
                size="2x"
              />  : 
              <span>No cities found</span>
            }
          </li>
        }
      </ul>  
    );
  };
 
  const searchBtnHandler = () => {
    const chosenCityName = citySearch;
    const cityName = chosenCityName.split(',')[0].trim();
    
    const chosenCity = cities.find((el => el.name.toUpperCase() === cityName.toUpperCase()));
    
    if(chosenCity) {
      fetchCurrentWeather(chosenCity);
      setCityTipsActive(false);
    }
  };

  const handleEnterPress = (event) => {
    if(event.key === 'Enter') {
      updateCitySearch(event);
      searchBtnHandler();
    }
  }

  return (
    <div className='wrap'>
      <h1>Weather Forecast</h1>
      <div className="weather-wrapper">
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
              placeholder="Enter city name" 
              id="search" 
              autoComplete="off"
              value={citySearch}
              onChange={updateCitySearch}
              onKeyPress={handleEnterPress}
            />
          </div>
            
            {cityTipsActive && searchedCities(citySearch)}
        </div>       
          
          <button className="search-btn" onClick={searchBtnHandler}>Show weather</button>
      </div>
      <div className="weather-cards-wrap">
        {weatherLoader && 
          <FontAwesomeIcon
            className="fa-pulse spinner-icon"
            icon={faSpinner} 
            size="5x"
          />
        }
        {weather.length !== 0 && <Weather></Weather>}
      </div>
      </div>
      
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cities: state.citiesData.cities,
    citiesLoader : state.citiesData.loader,
    citiesAPI : state.citiesData.citiesAPI,
    weather: state.weatherData.weather,
    weatherLoader: state.weatherData.weatherLoader
  };
};

const mapDispatchToProps = { 
  fetchSearchCities,
  cleanSearchResults,
  fetchCurrentWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);