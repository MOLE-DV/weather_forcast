import './App.css';
import Header from './Components/Header';
import DayInfo from './Components/DayInfo';
import useWeatherData from './weatherReader/readWeatherData';
import React, { useState, useEffect } from 'react';

function App() {
  const weatherData = useWeatherData();


  return (
    <div className="App">
      <Header/>
      <DayInfo width="calc(30vh + 30vw)" height="calc(20vh + 20vw)" data={weatherData} opacity="0"/>
    </div>
  );
}

export default App;
