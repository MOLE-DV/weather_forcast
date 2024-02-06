import React, { useEffect, useState } from "react";
import axios from "axios";

let API_KEY = process.env.REACT_APP_TOKEN;
console.log(API_KEY);

function getCity() {
  const cityName = localStorage.getItem('cityName');
  if (cityName === null || cityName === undefined) return null;

  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
}

function useWeatherData() {
  const [data, setData] = useState({});
  const apiUrl = getCity();

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

  return data;
}

export default useWeatherData;