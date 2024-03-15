import './App.css';
import Header from './Components/Header';
import DayInfo from './Components/DayInfo';
import useWeatherData from './weatherReader/readWeatherData';
import React, { useState, useEffect } from 'react';
import WeatherVisualizer from './Components/WeatherVisualizator';
import axios from 'axios';
import Copy from './Components/Copy';
import Copyright from './Components/Copyright';

function App() {
  const [data, setData] = useState({});
  const apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('cityName')}&appid=${process.env.REACT_APP_TOKEN}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    if (apiUrl) {
      fetchData();
    }
  }, [apiUrl]);

  return (
    <div className="App">
      <Header/>
      <DayInfo width="fit-content" data={data == 'debug' ? {"name" : "Test City"} : data} opacity="0"/>
      <WeatherVisualizer data={data == 'debug' ? {'weather' : 'debug'} : data} />
      <div style={{display: "none"}} id='cur_weather'>{data == 'debug' ? 'debug' : data.weather && data.weather[0]?.main}</div>
      <Copy />
    </div>

  );
}

export default App;
