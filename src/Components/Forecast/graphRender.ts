import React, { Context } from "react";

function weatherGraph(
  hourData,
  canvasId: string,
  height: number,
  width: number
) {
  let canvas = document.getElementById(canvasId as string) as HTMLCanvasElement;
  if (!canvas) return;
  let context = canvas.getContext("2d");

  context?.beginPath();

  context?.moveTo(0, 0);
  context?.lineTo(0, 250);
}
export default weatherGraph;
