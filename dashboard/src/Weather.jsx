import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';

import { LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer } from 'recharts';

import './Weather.css';

const Weather = () => {
const myRef = React.useRef(); 

  const [city, setCity] = useState(() => sessionStorage.getItem('city') || '');
  const [weatherData, setWeatherData] = useState(null);
  const [darkMode, setDarkMode] = useState(() => sessionStorage.getItem('darkMode') === 'true');
  const [forecastData, setForecastData] = useState([]);

  const apiKey = 'bf1bdf78c084e6b87abd283c1b3ca0aa';

  
  useEffect(() => {
    sessionStorage.setItem('city', city);
  }, [city]);

  
  useEffect(() => {
    sessionStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchData = async () => {
    if (!city) return; 
    try {
   
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);

      
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      setForecastData(forecastResponse.data.list); // array of forecast entries
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData([]);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // test commit

    fetchData();
  };

  return (
    <div className={`weather-container ${darkMode ? 'dark' : ''}`}>
      <button className="mode-btn" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData ? (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <img
      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      alt={weatherData.weather[0].description}
    />
    <p>{weatherData.weather[0].main}</p>
  </div>
          <p>🌡 Temperature: {weatherData.main.temp}°C</p>
          <p>☁️ Description: {weatherData.weather[0].description}</p>
          <p>🌡 Feels like: {weatherData.main.feels_like}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🔵 Pressure: {weatherData.main.pressure}</p>
          <p>🌬 Wind Speed: {weatherData.wind.speed} m/s</p>
           
<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
  <div style={{ textAlign: 'center' }}>
    <img src="https://img.icons8.com/color/48/sunrise--v1.png" alt="Sunrise" />
    <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
  </div>
  <div style={{ textAlign: 'center' }}>
    <img src="https://img.icons8.com/color/48/sunset--v1.png" alt="Sunset" />
    <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
  </div>
</div>

          <h3>5-Day Forecast:</h3>
<div className="forecast-container" style={{ display: 'flex', overflowX: 'scroll' }}>
  {Object.entries(
    forecastData.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0]; 
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {})
  ).slice(0, 5).map(([date, entries], index) => {
    const mainEntry = entries[0]; 
    const weather = mainEntry.weather[0];
    return (
      <div key={index} className="forecast-item" style={{ margin: '0 10px', minWidth: '120px', textAlign: 'center' }}>
        <p><strong>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong></p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
        <p>{weather.main}</p>
        <p>{mainEntry.main.temp.toFixed(1)}°C</p>
      </div>
    );
  })}
</div>

        </div>
      ) : (
        <p className="loading">Enter a city to see weather data...</p>
      )}
    </div>
  );
};

export default Weather;
