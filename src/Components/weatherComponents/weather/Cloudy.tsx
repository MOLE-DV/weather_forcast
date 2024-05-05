import React from "react";
import Sun from "../terrain/Sun.tsx";
import Cloud from "../terrain/Cloud.tsx";

function Cloudy(props) {
    return (
      <div id="cloudy">
        <Sun rays="0" degrees={props.degrees} />
        <Cloud className="cloud one" raining={false} />
        <Cloud className="cloud two" raining={false} />
      </div>
    );
}

export default Cloudy;
