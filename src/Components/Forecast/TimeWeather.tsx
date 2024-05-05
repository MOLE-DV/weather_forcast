import React, { ReactElement, useEffect, useState } from "react";
import switchDay from "./SwitchDay.ts";
import { useContext } from "react";
import { dayContext } from "./dayContext.ts";
import icons from "../../weatherIcons.json";

function TimeWeather(props) {
  const weather = props.data.forecastday;
  const dData = useContext(dayContext);

  useEffect(() => {
    document.querySelectorAll(".timeWeather.hour").forEach((element, index) => {
      element.classList.remove("selected");
      if (index === dData.dayData.hour) element.classList.add("selected");
    });
  });

  if (!weather || !dData) return;

  const hourData = weather[dData.dayData.day].hour;

  if (document.querySelectorAll("#right")![0])
    document
      .querySelectorAll("#right")![0]
      .addEventListener("scroll", (scroll) =>
        scrollManager(document.querySelectorAll("#right")![0], scroll)
      );
  return (
    <div className="timeWeather">
      <div className="scroll left" onClick={() => scrollLeft()}>
        ←
      </div>
      <div className="scroll right" onClick={() => scrollRight()}>
        →
      </div>

      {Object.entries(hourData).map((hourData) => {
        const hdata = hourData[1];
        const hour = Number(hourData[0])
        return (
          <div
            className="timeWeather hour"
            onClick={() =>
              dData.setDayData({
                day: dData.dayData.day,
                hour: hour,
              })
            }
            style={{
              height: `${
                hdata.temp_c > weather[dData.dayData.day].day.maxtemp_c
                  ? 95
                  : (hdata.temp_c / weather[dData.dayData.day].day.maxtemp_c) * 95
              }%`,
              backgroundColor: `${hour <= 4 ? "#304B78" : hour <= 12 ? "#FFBB00" : hour < 17 ? "#008BFE" : hour < 20 ? "#FF8E00" : "#304B78"}`
            }}
          >
            <span>
              {hdata.temp_c}°C
              {icons[hdata.condition.text.toLowerCase().replace(/\s+/g, "")]}
            </span>
            <div className="hourDisplay">
              {hour < 10 ? `0${hour}` : hour}:00
            </div>
          </div>
        );
      })}
    </div>
  );
}

function scrollLeft() {
  const element = document.querySelectorAll("#right")![0];

  element.scroll({
    left: element.scrollLeft - 200,
    behavior: "smooth",
  });
}

function scrollRight() {
  const element = document.querySelectorAll("#right")![0];

  element.scroll({
    left: element.scrollLeft + 200,
    behavior: "smooth",
  });
}

function scrollManager(element, scroll) {
  document.querySelectorAll(".scroll.left")[0].style.visibility =
    element.scrollLeft === 0 ? "hidden" : "visible";

  document.querySelectorAll(".scroll.right")[0].style.visibility =
    element.scrollLeft === element.scrollWidth - element.offsetWidth
      ? "hidden"
      : "visible";
}

export default TimeWeather;
