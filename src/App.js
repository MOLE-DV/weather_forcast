import './App.scss';
import Header from './Components/Header';
import DayInfo from './Components/DayInfo';
import ReadWeatherData from './weatherReader/ReadWeatherData';
import React, { useState, useEffect } from 'react';
import WeatherVisualizer from './Components/WeatherVisualizator';
import axios from 'axios';
import Copy from './Components/Copy';




function App() {
  const [data, setData] = useState([]);

  if(data.length == 0){
    const city = localStorage.getItem('cityName');
    if (city) {
      ReadWeatherData({city})
        .then(weatherData => {
          console.log('✅Data Recievied from reader!')
          setData(weatherData);
        })
        .catch(error => {
          console.error('❌Error receiving weather data:', error);
        });
    }
  }

  if(data == 'debug') console.log('⚙️Debug is on!')


  return (
    <div className="App">
      <Header/>
      <DayInfo width="fit-content" data={data} opacity="0"/>
      <WeatherVisualizer data={data == 'debug' ? {'weather' : 'debug'} : data} />
      <div style={{display: "none"}} id='cur_weather'>{data == 'debug' ? 'debug' : data.weather && data.weather[0]?.main}</div>
      <Copy />
    </div>

  );
}

export default App;