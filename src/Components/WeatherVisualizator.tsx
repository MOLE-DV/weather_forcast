import React, { useEffect, useState } from "react";
import Ground from "./weatherComponents/terrain/Ground.tsx";
import Cloudy from "./weatherComponents/weather/Cloudy.tsx"
import Rainy from "./weatherComponents/weather/Rainy.tsx";
import Sunny from "./weatherComponents/weather/Sunny.tsx";

function WeatherVisualizer(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPropData = async () => {
      setData(await props.data);
    };
    getPropData();
  });

  if (!data.current) return null;

  const weather =
    data.current.condition.text === "debug"
      ? localStorage.getItem("debug_weather")
      : data.current.condition.text;

  return (
    <div id="weatherVisualizer">
      <Ground />
      {data && data.current && weather && (
        <React.Fragment>
          {weather === "sunny" && <Sunny degrees={data.current.temp_c} />}
          {(weather === "cloudy" || weather === "Partly cloudy") && (
            <Cloudy degrees={data.current.temp_c} />
          )}
          {weather === "rainy" && <Rainy degrees={data.current.temp_c} />}
          {weather !== "sunny" &&
            weather !== "cloudy" &&
            weather !== "rainy" && <Sunny degrees={data.current.temp_c} />}
        </React.Fragment>
      )}
    </div>
  );
}

export default WeatherVisualizer;
