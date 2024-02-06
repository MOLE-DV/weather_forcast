import React, { useEffect, useState } from "react";
import axios from "axios";

function getCity() {
  const cityName = localStorage.getItem('cityName');
  if (cityName === null || cityName === undefined) return null;

  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4898670b87645c0e7d6f9c0739bbf020`;
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