import React from "react";
import { useState, useEffect } from "react";
import TimeWeather from "./TimeWeather.tsx";
import icons from "../../weatherIcons.json";
import "./forecast.scss";
import getForecast from "./getForecast.ts";
import switchDay from "./switchDay.ts";

function Futureforecast(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      setData(await props.data.forecast);
    };
    getData();
  });

  if (data === undefined || data.forecastday === undefined) return;

  return (
    <div id="futureforecast">
      <div id="top">
        <h1 id="title">
          {new Date(data.forecastday[0].date).toLocaleString("en-us", {
            weekday: "long",
          })}
          {
            icons[
              data.forecastday[0].day.condition.text
                .toLowerCase()
                .replace(/\s+/g, "")
            ]
          }
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
                  onClick={() => switchDay(data, index, false)}
                  style={index === 0 ? { color: "black" } : {}}
                >
                  {key[1].day.maxtemp_c}°C
                  <h4>{day}</h4>
                </div>
              );
            })}
          <div className="day selector" />
        </div>
      </div>
      <div id="down">
        <div id="left" className="sides">
          {Object.entries(getForecast(data, 0, false)).map((key, index) => {
            return (
              <div className="bottomforecast">
                <p>
                  {key[1].value}
                  <div className="unit">{key[1].unit}</div>
                </p>
                <span>{key[1].name}</span>
              </div>
            );
          })}
        </div>
        <div id="right" className="sides">
          <TimeWeather data={data} day={0} />
        </div>
      </div>
    </div>
  );
}

export default Futureforecast;
