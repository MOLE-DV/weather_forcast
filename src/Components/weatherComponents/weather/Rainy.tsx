import React from "react";
import Sun from "../terrain/Sun.tsx";
import Cloud from "../terrain/Cloud.tsx";

function Rainy(props) {
    return (
      <div id="rainy">
        <Sun rays="0" degrees={props.degrees} />
        <Cloud className="cloud one" raining={true} />
        <Cloud className="cloud two" raining={true} />
      </div>
    );
}

export default Rainy;