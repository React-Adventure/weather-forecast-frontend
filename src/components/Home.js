import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import loadable from '@loadable/component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { fetchSearchCities, cleanSearchResults } from '../redux/actions/citySearch';
import { fetchCurrentWeather } from '../redux/actions/currentWeater';
// import Weather from './Weather';
const Weather = loadable(() => import('./Weather'));
const CitiesList = loadable(() => import('./CitiesList'));
const Forecast = loadable(() => import('./Forecast'));
const HourlyChart = loadable(() => import('./HourlyChart'));

// import Forecast from './Forecast';
// import CitiesList from './CitiesList';
import { MEASUREMENT_SYSTEM } from './consts';
import MeasurementSystemContext from './context/MeasurementSystemContext';
import CityContext from './context/CityContext';
import { geolocated } from "react-geolocated";
import { fetchCurrentGeoWeather } from '../redux/actions/currentLocation';
// import HourlyChart from './HourlyChart';

const Home = (props) => {
  console.log('HOME RENDERED');
  const { fetchSearchCities, cities, cleanSearchResults, citiesLoader, citiesAPI, currentLocation, currLocationLoader } = props;
  const { weather, fetchCurrentWeather, weatherLoader, fetchCurrentGeoWeather } = props;

  const [citySearch, setCitySearch] = useState('');
  const [cityTipsActive, setCityTipsActive] = useState(true);

  const [cityAndParams, setCityAndParams] = useState({});
  const [measureTogglerChecked, setMeasureTogglerChecked] = useState(() => {
    const togglerChecked = localStorage.getItem('toggler');

    return (togglerChecked !== undefined && togglerChecked !== null) ? JSON.parse(togglerChecked) : false;
  });
  const [currLocationToggler, setCurrLocationToggler] = useState(true);

  // useEffect(() => {
  //   function handleScrollYChange() {
  //   const lastScrollY = window.scrollY;
  //   console.log(lastScrollY);
  //           if (lastScrollY) {
  //               localStorage.setItem("scrollY", lastScrollY);
  //               window.scrollTo(0, lastScrollY);
  //           }
  //       }
  //       window.addEventListener("scroll", handleScrollYChange, true);
  //       return () => {
  //           window.removeEventListener("scroll", handleScrollYChange);
  //       };
  //   }, []);

  //   const [scrl, setScrt] = useState();


  useEffect(() => {
    localStorage.setItem("toggler", JSON.stringify(measureTogglerChecked));
  }, [measureTogglerChecked]);

  useEffect(() => {
    if(currLocationToggler && props.coords) {
      handleCurrentLocation(props.coords);
    }
  }, [currLocationToggler, props.coords]);

  useEffect(() => {
    return () => {
        cleanSearchResults();
        debounceSearch.cancel();
    }
  }, []);

  useEffect(() => {
    setCityAndParams(currentLocation);
  }, [currentLocation]);

  const handleCurrentLocation = (coords) => {  
    const latitude = coords.latitude;
    const longitude = coords.longitude;
      
      fetchCurrentGeoWeather(latitude, longitude, measureTogglerChecked ? MEASUREMENT_SYSTEM.imperial : MEASUREMENT_SYSTEM.metric);
  };

  const debounceSearch = useCallback(
    _.debounce(citySearch => {
        if(citySearch) {
          fetchSearchCities(citySearch);
        } else {
          cleanSearchResults();
        }
    }), 
  [citySearch]);

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
      if(chosenCity !== cityAndParams) {
        setCityAndParams(chosenCity);
      }

      fetchWeatherWithMetric(chosenCity, measureTogglerChecked);

      setCurrLocationToggler(false);
      setCityTipsActive(false);
    }
  };

  const handleEnterPress = (event) => {
    if(event.key === 'Enter') {
      updateCitySearch(event);
      searchBtnHandler();
    }
  };

  const toggleMeasure = (event) => {
    setMeasureTogglerChecked(!measureTogglerChecked);

    fetchWeatherWithMetric(cityAndParams, event.target.checked);
  };

  const toggCurrentLocation = (event) => {
    event.stopPropagation();
    if(!currLocationToggler) {
      setCurrLocationToggler(true);
    }
  }

  const fetchWeatherWithMetric = (city, measurement) => {
    setCitySearch('');

    if (measurement) {
      fetchCurrentWeather(city, MEASUREMENT_SYSTEM.imperial);
    } else {
      fetchCurrentWeather(city, MEASUREMENT_SYSTEM.metric);
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
      
      <div className="weather-togglers">
        <div className="row switch center weather-measure-toggler">
          <label>
            Metric
            <input type="checkbox" onChange={toggleMeasure} checked={measureTogglerChecked} />
            <span className="lever"></span>
            Imperial
          </label>
        </div>

        <div className="current-location" onClick={toggCurrentLocation} >
            <input type="checkbox" checked={currLocationToggler} onChange={()=>{}} />
            <span>Current location</span>
        </div>
      </div>

      <div className="weather-forecast-wrap">
        {(weatherLoader || currLocationLoader) && 
          <FontAwesomeIcon
            className="fa-pulse spinner-icon weather-forecast-loader"
            icon={faSpinner} 
            size="5x"
          />
        }
        {weather.length !== 0 && 
          <h4 className="today-weather-title">
            {(new Date(weather.dt * 1000))
              .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
            }
          </h4>
        }
        <HourlyChart />
        <MeasurementSystemContext.Provider 
          value={{ measureSystem: measureTogglerChecked ? MEASUREMENT_SYSTEM.imperial : MEASUREMENT_SYSTEM.metric}}
        >
          {weather.length !== 0 && 
            <>
              <CityContext.Provider value={{cityAndParams}}>
                <div className="today-forecast">
                  <Weather /> 
                </div>
              </CityContext.Provider>
              <Forecast /> 
            </>
          }
        </MeasurementSystemContext.Provider>
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
    weatherLoader: state.weatherData.weatherLoader,
    currentLocation: state.locationData.currLocation,
    currLocationLoader: state.locationData.currLocationLoader
  };
};

const mapDispatchToProps = { 
  fetchSearchCities,
  cleanSearchResults,
  fetchCurrentWeather,
  fetchCurrentGeoWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Home));