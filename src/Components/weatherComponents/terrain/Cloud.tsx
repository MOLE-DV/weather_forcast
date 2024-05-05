import React from "react";
import Circle from "../../shapes/Circle.tsx";
import Box from "../../shapes/Box.tsx";
import Rain from "./Rain.tsx";

function Cloud(props) {
    let IsRaining = props.raining ? <Rain /> : "";
    return (
      <div className={props.className} id="goLeft">
        <Box />
        <Circle className="cloudCircle one" />
        <Circle className="cloudCircle two" />
        <Circle className="cloudCircle three" />
        {IsRaining}
      </div>
    );
}

export default Cloud;