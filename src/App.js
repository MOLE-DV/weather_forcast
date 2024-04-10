import './App.scss';
import Header from './Components/Header';
import DayInfo from './Components/DayInfo';
import React, { useState, useEffect } from 'react';
import WeatherVisualizer from './Components/WeatherVisualizator';
import Copy from './Components/Copy';
import axios from 'axios';



function App() {
  const API_KEY = process.env.REACT_APP_TOKEN;
  const [data, setData] = useState([]);


  useEffect(() => {
    const getData = async () =>{
      const city = localStorage.getItem('cityName');
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

      console.log('⚙️Reading API...');

      switch(city === 'debug_city'){
        case true:
          setData('debug');
          break;
        case false:
          await axios.get(apiUrl)
            .then(res => {
                if(res.data.cod != 200) { console.error(`❌Reading finished with error code ${res.data.cod} : ${res.data.message}`) }
                else{
                  console.log(`✅Succesfuly read API data with status code ${res.status}`);
                }
                setData(res.data);
            })
            .catch((err) => {
              console.error(`❌Couldn't read API: ${err}`)
            })
          break;
        default: 
          console.error(`❌Couldn't get city name`)
          break;
      }
      
    }
    getData();
  },[])

  if(data === 'debug') console.log('⚙️Debug is on!')

  return (
    <div className="App">
      <Header/>
      <DayInfo width="fit-content" data={data} opacity="0"/>
      <WeatherVisualizer data={data === 'debug' ? {'weather' : 'debug'} : data} />
      <div style={{display: "none"}} id='cur_weather'>{data === 'debug' ? 'debug' : data.weather && data.weather[0]?.main}</div>
      <Copy />
    </div>

  );
}

export default App;