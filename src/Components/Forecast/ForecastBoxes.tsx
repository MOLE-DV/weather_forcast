import React from "react";
import getForecast from "./getForecast.ts";
import { dayContext } from "./dayContext.ts";
import { useContext } from "react";

function ForecastBoxes(props) {
  const dData = useContext(dayContext);

  if (!dData) return;

  return (
    <div id="forecastBoxes">
      {Object.entries(
        getForecast(props.data, dData.dayData.day, dData.dayData.hour)
      ).map((key, index) => {
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
  );
}

export default ForecastBoxes;
