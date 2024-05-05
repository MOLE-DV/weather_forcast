import React from "react";
import Sun from "../terrain/Sun.tsx";
function Sunny(props) {
    return (
      <div id="sunny">
        <Sun rays="10" degrees={props.degrees} />
      </div>
    );
}

export default Sunny;