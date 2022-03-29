import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { fetchSearchCities, cleanSearchResults } from '../redux/actions/citySearch';
import _ from 'lodash';

const Home = (props) => {
  const { fetchSearchCities, cities, cleanSearchResults } = props;
  const [citySearch, setCitySearch] = useState('');

  useEffect(() => {
    return () => {
        cleanSearchResults();
        debounceSearch.cancel();
    }
}, []);

  const debounceSearch = useCallback(
    _.debounce(citySearch => {
        if(citySearch) {
          fetchSearchCities(citySearch);
        }
    }, 300), 
  [citySearch]);

  const updateCitySearch = (event) => {
    const { value } = event.target;
    setCitySearch(value);

    debounceSearch(value);
  };

  const searchedCities = (citySearch) => {
    const mathcedCities = cities.filter(city => city.name.toUpperCase().startsWith(citySearch.toUpperCase()))
    .map(city => {
      return <li>
        {city.name}
      </li>
    }) 
    return <ul>
      {mathcedCities}
    </ul>
  };

  return (
    <div className='wrap'>
      <h1>Weather Forecast App</h1>
      
      <div className="search-input-wrap"> 
        <FontAwesomeIcon
          icon={faSearch} 
          size="1x"
        />       
        <input 
          type="text" 
          placeholder="Type anything..." 
          id="search" 
          value={citySearch}
          onChange={updateCitySearch}
        />
        {searchedCities(citySearch)}
        <span 
          className="search-btn"
          // onClick={searchCocktail}
        >
        </span> 
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