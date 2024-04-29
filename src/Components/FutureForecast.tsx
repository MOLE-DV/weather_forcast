import React from "react";
import { useState, useEffect } from "react";
import { ReactNode } from "react";
import icons from "../weatherIcons.json";

function Futureforecast(props) {
  let viewData: {};
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      setData(await props.data.forecast);
    };
    getData();
  });

  if (data === undefined || data.forecastday === undefined) return;
  console.log(data.forecastday);

  function getForecast(day) {
    return {
      temp: {
        name: "Max Temp.",
        value: data.forecastday[day].day.maxtemp_c,
        unit: "°C",
      },
      mintemp: {
        name: "Min Temp.",
        value: data.forecastday[day].day.mintemp_c,
        unit: "°C",
      },
      weather: {
        name: "Weather",
        value: data.forecastday[day].day.condition.text,
        unit: "",
      },
      humidity: {
        name: "Humidity",
        value: data.forecastday[day].day.avghumidity,
        unit: "%",
      },
      wind: {
        name: "Wind",
        value: data.forecastday[day].day.maxwind_kph,
        unit: "km/h",
      },
      uv: {
        name: "UV",
        value: data.forecastday[day].day.uv,
        unit: "",
      },
      rain: {
        name: "Rain",
        value: data.forecastday[day].day.daily_chance_of_rain,
        unit: "%",
      },
      snow: {
        name: "Snow",
        value: data.forecastday[day].day.daily_chance_of_snow,
        unit: "%",
      },
      layer: {
        name: "Snow Layer",
        value: data.forecastday[day].day.totalsnow_cm,
        unit: "cm",
      },
    };
  }

  viewData = getForecast(0);

  function switchDay(dayIndex: number) {
    document.querySelectorAll(
      ".day.selector"
    )[0].style.left = `calc((calc(30vh + 30vw) / 3) * ${dayIndex})`;

    document.querySelectorAll(".day").forEach((element, index) => {
      element.style.color = index === dayIndex ? "black" : "";
    });

    viewData = getForecast(dayIndex);
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

    Object.entries(viewData).map((key, index) => {
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
    });
  }

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
                  onClick={() => switchDay(index)}
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
          {Object.entries(viewData).map((key, index) => {
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
        <div id="right" className="sides"></div>
      </div>
    </div>
  );
}

export default Futureforecast;
