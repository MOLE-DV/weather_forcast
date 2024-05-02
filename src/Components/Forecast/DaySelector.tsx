import React from "react";
import { useState, useEffect } from "react";
import { dayContext } from "./dayContext.ts";
import { useContext } from "react";
import "./forecast.scss";

function DaySelector(props) {
  const dData = useContext(dayContext);
  const daySelector = document.querySelectorAll(".day.selector")[0];
  const days = document.querySelectorAll(".day");

  if (!props.data || props.data.length === 0 || !dData) return;

  if (daySelector)
    daySelector.style.left = `calc((calc(30vh + 30vw) / 3) * ${dData.dayData.day})`;

  // //set color of selected day to black and reset the other days
  if (days)
    days.forEach((element, index) => {
      element.style.color = index === dData.dayData.day ? "black" : "";
    });

  return (
    <div id="DaySelector">
      {props.data &&
        props.data.forecastday &&
        Object.entries(props.data.forecastday).map((key, index) => {
          const day = new Date(key[1].date).toLocaleString("en-us", {
            weekday: "long",
          });
          return (
            <div
              key={index}
              className="day"
              onClick={() => dData.setDayData({ day: index, hour: false })}
              style={
                index === Number(dData.dayData.day) ? { color: "black" } : {}
              }
            >
              {key[1].day.maxtemp_c}°C
              <h4>{day}</h4>
            </div>
          );
        })}
      <div className="day selector" />
    </div>
  );
}

export default DaySelector;