import React from "react";
import { ReactDOM } from "react";
import getForecast from "./getForecast.ts";
import icons from "../../weatherIcons.json";
import TimeWeather from "./TimeWeather.tsx";
import { useContext } from "react";
import { dayContext } from "./dayContext.ts";

function switchDay(data, dayIndex: number, hour) {
  //check if the data loaded
  if (!data || (!dayIndex && dayIndex != 0) || hour === undefined) return;

  //change position of white box visualizing selected day
  document.querySelectorAll(
    ".day.selector"
  )[0].style.left = `calc((calc(30vh + 30vw) / 3) * ${dayIndex})`;

  //set color of selected day to black and reset the other days
  document.querySelectorAll(".day").forEach((element, index) => {
    element.style.color = index === dayIndex ? "black" : "";
  });

  // document.getElementById("title")!.innerText = `${
  //   new Date(data.forecastday[dayIndex].date).toLocaleString("en-us", {
  //     weekday: "long",
  //   }) as string
  // }${
  //   icons[
  //     data.forecastday[dayIndex].day.condition.text
  //       .toLowerCase()
  //       .replace(/\s+/g, "")
  //   ]
  // }
  //   `;

  // document.getElementById("left")!.innerHTML = "";

  // //render boxes with weather conditions
  // Object.entries(getForecast(data, dayIndex, hour as number | boolean)).map(
  //   (key, index) => {
  //     let weatherElement = document.createElement("div");
  //     weatherElement.classList.add(`bottomforecast`, key[0] as string);
  //     let infoElement = document.createElement("p");
  //     infoElement.innerText = key[1].value as string;

  //     let unitElement = document.createElement("div");
  //     unitElement.classList.add("unit");
  //     unitElement.innerText = key[1].unit as string;
  //     infoElement.appendChild(unitElement);

  //     let nameElement = document.createElement("span");
  //     nameElement.innerText = key[1].name as string;

  //     weatherElement.appendChild(infoElement);
  //     weatherElement.appendChild(nameElement);
  //     document.getElementById("left")!.appendChild(weatherElement);
  //   }
  // );
}

export default switchDay;
