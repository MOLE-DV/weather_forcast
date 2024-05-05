import React from "react";
function Sun(props) {
  return (
    <div className="sun">
      <h1>{props.degrees}°C</h1>
      {Array.from({ length: props.rays }).map((v, i) => (
        <div
          key={i}
          id="pivot"
          style={{ transform: `rotate(${(360 / props.rays) * i}deg)` }}
        >
          <div className="ray"></div>
        </div>
      ))}
    </div>
  );
}

export default Sun;
