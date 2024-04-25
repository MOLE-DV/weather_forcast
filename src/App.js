import "./App.scss";
import Header from "./Components/Header";
import DayInfo from "./Components/DayInfo";
import React, { useState, useEffect } from "react";
import WeatherVisualizer from "./Components/WeatherVisualizator";
import Copy from "./Components/Copy";
import Futureforecast from "./Components/FutureForecast.tsx";

function App() {
  const API_KEY = process.env.REACT_APP_TOKEN;
  const [data, setData] = useState([]);

  const language = localStorage.getItem("language");
  if (!language) localStorage.setItem("language", "EN");

  useEffect(() => {
    const getData = async () => {
      const city = localStorage.getItem("cityName");
      const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${localStorage.getItem(
        "cityName"
      )}&days=3&aqi=yes&alerts=no`;

      console.log("⚙️Reading API...");

      switch (city === "debug_city") {
        case true:
          setData({
            location: {
              name: "debug_city",
            },
            current: {
              last_updated_epoch: 1712826900,
              last_updated: "2024-04-11 11:15",
              temp_c: 0,
              temp_f: 0,
              is_day: 0,
              condition: {
                text: "debug",
              },
            },
          });
          break;
        case false:
          await fetch(apiUrl)
            .then((response) => response.json())
            .then((resData) => {
              if (resData.error && resData.error.code) {
                console.error(`❌Couldn't read API: ${resData.error.message}`);
                setData([]);
              } else {
                localStorage.setItem("cityName", resData.location.name);
                console.log(`✅Succesfuly read API data`);
                setData(resData);
              }
            })
            .catch((err) => {
              console.error(`❌Couldn't read API: ${err}`);
            });
          break;
        default:
          console.error(`❌Couldn't get city name`);
          break;
      }
    };
    getData();
  }, []);

  if (
    data &&
    data.current &&
    data.current.condition &&
    data.current.condition.text === "debug"
  ) {
    console.log("🛠️Debug mode is on!");
  }

  return (
    <div className="App">
      <Header />
      <DayInfo width="fit-content" data={data} opacity="0" />
      <WeatherVisualizer data={data} />
      <Futureforecast data={data} />
      <Copy />
    </div>
  );
}

export default App;
