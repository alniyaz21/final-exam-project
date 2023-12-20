import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import images
import clearImage from './img/clear.png';
import cloudsImage from './img/clouds.png';
import rainImage from './img/rain.png';
import drizzleImage from './img/drizzle.png';
import thunderstormImage from './img/thunderstorm.png';
import snowImage from './img/snow.png';
import mistImage from './img/mist.png';
import fogImage from './img/fog.png';
import windImage from './img/wind.png';
import sunset from './img/sunset.png';
import sunrise from './img/sunrise.png';
import searchImage from './img/weather-forecast.png';

function Search() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [tomorrowWeather, setTomorrowWeather] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);

  const API_KEY = '81650675fbb58214026d780e6227a44b';

  useEffect(() => {
    const fetchData = async () => {
      if (city.length < 3) {
        return;
      }
      try {
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        const temperatureCelsius = currentWeatherResponse.data.main.temp - 273.15;
        currentWeatherResponse.data.main.temp = temperatureCelsius.toFixed(2);
        setCurrentWeather(currentWeatherResponse.data);

        // Get tomorrow's weather using the 5-day forecast API
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        const tomorrowIndex = forecastResponse.data.list.findIndex(entry => {
          const entryDate = new Date(entry.dt * 1000);
          const tomorrowDate = new Date();
          tomorrowDate.setDate(tomorrowDate.getDate() + 1);
          return (
            entryDate.getDate() === tomorrowDate.getDate() &&
            entryDate.getMonth() === tomorrowDate.getMonth() &&
            entryDate.getFullYear() === tomorrowDate.getFullYear()
          );
        });

        if (tomorrowIndex !== -1) {
          const tomorrowWeatherData = forecastResponse.data.list[tomorrowIndex];
          const temperatureCelsiusTomorrow = tomorrowWeatherData.main.temp - 273.15;
          tomorrowWeatherData.main.temp = temperatureCelsiusTomorrow.toFixed(2);
          setTomorrowWeather(tomorrowWeatherData);
        }
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };

    fetchData();
  }, [city]);

  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const handleAddToFavorites = () => {
    if (currentWeather && !favoriteCities.includes(currentWeather.name)) {
      const newFavoriteCities = [...favoriteCities, currentWeather.name];
      setFavoriteCities(newFavoriteCities);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavoriteCities));
      setAddedToFavorites(true); // Set addedToFavorites to true
      notify();
    }
  };

  const notify = () => {
    toast.success('The city was added to the favorites!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const weatherImages = {
    'Clear': clearImage,
    'Clouds': cloudsImage,
    'Rain': rainImage,
    'Drizzle': drizzleImage,
    'Thunderstorm': thunderstormImage,
    'Snow': snowImage,
    'Mist': mistImage,
    'Fog': fogImage,
    'Wind': windImage,
    // Add more descriptions and corresponding image imports as needed
  };

  return (
    <div className="App">
      <div className='main-top'>
        <h1>Weather App</h1>
        <img className='search-icon' src={searchImage} alt='search' />
      </div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {currentWeather && (
        <div className='border-div'>
          <h2>{currentWeather.name}, {currentWeather.sys.country}</h2>
          <p>{currentWeather.weather[0].description}</p>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
          <img
            src={weatherImages[currentWeather.weather[0].main]}
            alt={currentWeather.weather[0].main}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
          <div className='sunTime'>
            <div className='border-div'>
              <img className='sunrise-image' src={sunrise} alt='sunrise' />
              <p>Sunrise: {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            </div>

            <div className='border-div'>
              <img className='sunset-image' src={sunset} alt='sunset' />
              <p>Sunset: {new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
          {!addedToFavorites && (
            <button className='main-buttons' onClick={handleAddToFavorites}>
              Add to Favorites
            </button>
          )}
        </div>
      )}

      {tomorrowWeather && (
        <div className='border-div'>
          <h2>Tomorrow's Weather</h2>
          <p>{tomorrowWeather.weather[0].description}</p>
          <p>Temperature: {tomorrowWeather.main.temp}°C</p>
          <img
            src={weatherImages[tomorrowWeather.weather[0].main]}
            alt={tomorrowWeather.weather[0].main}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </div>
      )}
      <div className='buttons-parent'>
        <button className='main-buttons' onClick={() => setCurrentWeather(null)}>Clear Weather</button>
        <button className='main-buttons' onClick={() => setTomorrowWeather(null)}>Clear Tomorrow's Weather</button>
      </div>
    </div>
  );
}

export default Search;
