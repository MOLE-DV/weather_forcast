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
      <DayInfo width="fit-content" data={weatherData} opacity="0"/>
      <WeatherVisualizer />
    </div>
  );
}

export default App;
