import React from "react";
import { useState, useEffect } from "react";

function Futureforecast(props) {
  const iconTable = {
    "partly cloudy": "🌤️",
    cloudy: "⛅",
    sunny: "☀️",
    rainy: "🌧️",
    mist: "🌫️",
    overcast: "☁️",
    "Patchy rain nearby": "☔",
    "Patchy snow nearby": "❄️",
    "Patchy sleet nearby": "🌧️❄️",
  };
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      setData(await props.data.forecast);
    };
    getData();
  });

  if (data === undefined || data.forecastday === undefined) return;
  console.log(data.forecastday);

  function switchDay(dayIndex: number) {
    document.getElementById("title")!.innerText = `
    ${
      new Date(data.forecastday[dayIndex].date).toLocaleString("en-us", {
        weekday: "long",
      }) as string
    }

    `;
  }

  return (
    <div id="futureforecast">
      <div id="top">
        <h1 id="title">
          {new Date(data.forecastday[0].date).toLocaleString("en-us", {
            weekday: "long",
          })}
          {iconTable[data.forecastday[0].day.condition.text.toLowerCase()]}
        </h1>
        <div id="frcst">
          {data &&
            data.forecastday &&
            Object.entries(data.forecastday).map((key, index) => {
              const day = new Date(key[1].date).toLocaleString("en-us", {
                weekday: "long",
              });
              return (
                <div
                  key={index}
                  className="day"
                  onClick={() => switchDay(index)}
                >
                  {key[1].day.maxtemp_c}°C
                  <h4>{day}</h4>
                </div>
              );
            })}
        </div>
      </div>
      <div id="down">
        <div id="left" className="sides">
          <h1 id="cityName">{localStorage.getItem("cityName")}</h1>
        </div>
        <div id="right" className="sides"></div>
      </div>
    </div>
  );
}

export default Futureforecast;
