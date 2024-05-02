import React from "react";
import { useState, useEffect } from "react";
import TimeWeather from "./TimeWeather.tsx";
import icons from "../../weatherIcons.json";
import "./forecast.scss";
// import switchDay from "./SwitchDay.ts";
import { dayContext } from "./dayContext.ts";
import { useContext } from "react";
import ForecastBoxes from "./ForecastBoxes.tsx";
import DaySelector from "./DaySelector.tsx";

function Futureforecast(props) {
  const [data, setData] = useState({});
  const [dayData, setDayData] = useState({ day: 0, hour: 0 });

  useEffect(() => {
    const getData = async () => {
      setData(await props.data.forecast);
    };
    getData();
  });

  if (data === undefined || data.forecastday === undefined) return;

  return (
    <dayContext.Provider value={{ dayData, setDayData }}>
      <div id="futureforecast">
        <div id="top">
          <h1 id="title">
            {new Date(
              data.forecastday[Number(dayData.day)].date
            ).toLocaleString("en-us", {
              weekday: "long",
            })}
            {
              icons[
                data.forecastday[Number(dayData.day)].day.condition.text
                  .toLowerCase()
                  .replace(/\s+/g, "")
              ]
            }
          </h1>
          <div id="frcst">
            <DaySelector data={data}></DaySelector>
          </div>
        </div>
        <div id="down">
          <div id="left" className="sides">
            <ForecastBoxes
              data={data}
              day={Number(dayData.day)}
              hour={Number(dayData.hour)}
            />
          </div>
          <div id="right" className="sides">
            {/* <TimeWeather data={data} /> */}
          </div>
        </div>
      </div>
    </dayContext.Provider>
  );
}

export default Futureforecast;
