import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TOKEN;

const ReadWeatherData = async ({ city }) => {
  console.log(`⚙️Reading weather data for ${city}...`);

  if (city == "debug_city") return "debug";

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await axios.get(apiUrl);
    console.log("✅Reading Sucesful!");
    return response.data;
  } catch (err) {
    console.error(`❌Error fetching data from API: ${err}`);
    return "not_found";
  }
};

export default ReadWeatherData;
