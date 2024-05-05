import React from "react";

function Rain(props) {
    return (
      <div className="weather rain">
        <div
          className="drop"
          style={{ animation: "goDown 1s linear infinite" }}
        ></div>
        <div
          className="drop"
          style={{ animation: "goDown .8s linear infinite", marginLeft: "20%" }}
        ></div>
        <div
          className="drop"
          style={{ animation: "goDown .82s linear infinite", marginLeft: "72%" }}
        ></div>
        <div
          className="drop"
          style={{ animation: "goDown .78s linear infinite", marginLeft: "98%" }}
        ></div>
      </div>
    );
}

export default Rain;