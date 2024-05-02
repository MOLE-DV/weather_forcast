import React from "react";
import getForecast from "./getForecast.ts";

function ForecastBoxes(props) {
  return (
    <div id="forecastBoxes">
      {Object.entries(getForecast(props.data, props.day, props.hour)).map(
        (key, index) => {
          return (
            <div className="bottomforecast">
              <p>
                {key[1].value}
                <div className="unit">{key[1].unit}</div>
              </p>
              <span>{key[1].name}</span>
            </div>
          );
        }
      )}
    </div>
  );
}

export default ForecastBoxes;
