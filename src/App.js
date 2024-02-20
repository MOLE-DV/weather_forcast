import './App.css';
import Header from './Components/Header';
import DayInfo from './Components/DayInfo';
import useWeatherData from './weatherReader/readWeatherData';
import React, { useState, useEffect } from 'react';
import WeatherVisualizer from './Components/WeatherVisualizator';

function App() {
  const weatherData = useWeatherData();

  return (
    <div className="App">
      <Header/>
      <DayInfo width="fit-content" data={weatherData == 'debug' ? {"name" : "Test City"} : weatherData} opacity="0"/>
      <WeatherVisualizer data={weatherData == 'debug' ? {'weather' : 'debug'} : weatherData} />
      <div style={{display: "none"}} id='cur_weather'>{weatherData == 'debug' ? 'debug' : weatherData.weather && weatherData.weather[0]?.main}</div>
    </div>
  );
}

export default App;
