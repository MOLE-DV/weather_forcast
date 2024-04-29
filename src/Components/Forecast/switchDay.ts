import React from "react";
import getForecast from "./getForecast.ts";
import icons from "../../weatherIcons.json";
import TimeWeather from "./TimeWeather.tsx";

function switchDay(data, dayIndex: number, hour) {
  if (!data || (!dayIndex && dayIndex != 0) || hour === undefined) return;

  console.log(data, dayIndex, hour);
  document.querySelectorAll(
    ".day.selector"
  )[0].style.left = `calc((calc(30vh + 30vw) / 3) * ${dayIndex})`;

  document.querySelectorAll(".day").forEach((element, index) => {
    element.style.color = index === dayIndex ? "black" : "";
  });

  document.getElementById("title")!.innerText = `${
    new Date(data.forecastday[dayIndex].date).toLocaleString("en-us", {
      weekday: "long",
    }) as string
  }${
    icons[
      data.forecastday[dayIndex].day.condition.text
        .toLowerCase()
        .replace(/\s+/g, "")
    ]
  }
    `;

  let view: React.JSX.Element[] = [];

  document.getElementById("left")!.innerHTML = "";

  Object.entries(getForecast(data, dayIndex, hour as number | boolean)).map(
    (key, index) => {
      let weatherElement = document.createElement("div");
      weatherElement.classList.add(`bottomforecast`, key[0] as string);
      let infoElement = document.createElement("p");
      infoElement.innerText = key[1].value as string;

      let unitElement = document.createElement("div");
      unitElement.classList.add("unit");
      unitElement.innerText = key[1].unit as string;
      infoElement.appendChild(unitElement);

      let nameElement = document.createElement("span");
      nameElement.innerText = key[1].name as string;

      weatherElement.appendChild(infoElement);
      weatherElement.appendChild(nameElement);
      document.getElementById("left")!.appendChild(weatherElement);
    }
  );
}

export default switchDay;
