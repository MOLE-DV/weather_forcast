import React from "react";

function Box(props) {
  return (
    <div
      className="box"
      style={{
        height: props.height,
        width: props.width,
        backgroundColor: props.color,
        left: props.x,
        top: props.y,
        zIndex: props.renderQueue,
      }}
    ></div>
  );
}

export default Box;
