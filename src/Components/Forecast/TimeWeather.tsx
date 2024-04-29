import React, { useEffect, useState } from "react";
import switchDay from "./switchDay.ts";
function TimeWeather(props) {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const getData = async () => {
      setWeather(await props.data.forecastday);
    };
    getData();
  });

  if (!weather) return;

  const hourData = weather[props.day].hour;

  return (
    <div className="timeWeather">
      {Object.entries(hourData).map((hour) => {
        return (
          <div
            className="timeWeather hour"
            onClick={() =>
              switchDay(props.data, props.day, Number(hour[0]) as number)
            }
          >
            {Number(hour[0]) < 10 ? `0${hour[0]}` : hour[0]}:00
            <span>
              {hour[1].temp_c}°C, {hour[1].cloud}%, {hour[1].condition.text},{" "}
              {hour[1].humidity}%, {hour[1].wind_kph}KM/H, {hour[1].uv} UV
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default TimeWeather;
