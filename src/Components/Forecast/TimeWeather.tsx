import React, { ReactElement, useEffect, useState } from "react";
import weatherGraph from "./graphRender.ts";
import switchDay from "./SwitchDay.ts";
import { useContext } from "react";
import { dayContext } from "./dayContext.ts";

function TimeWeather(props) {
  const [weather, setWeather] = useState();
  const dData = useContext(dayContext);

  setWeather(props.data.forecastday);

  if (!weather) return;

  const hourData = weather[dData.dayData.day].hour;

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
      {Object.entries(hourData).map((hour) => {
        return (
          <div
            className="timeWeather hour"
            onClick={() =>
              switchDay(props.data, props.day, Number(hour[0]) as number)
            }
            style={{
              height: `${
                (hour[1].temp_c /
                  props.data.forecastday[props.day].day.maxtemp_c) *
                100
              }%`,
            }}
          >
            <span>{hour[1].temp_c}°C</span>
            <div className="hourDisplay">
              {Number(hour[0]) < 10 ? `0${hour[0]}` : hour[0]}:00
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
