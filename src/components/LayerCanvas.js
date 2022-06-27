import React, { useRef, useEffect } from "react";

export const LayerCanvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.drawImage(
      props.img,
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
  }, []);

  return (
    <>
      {console.log("inside canvas", props.img)}
      <canvas width={52} height={52} ref={canvasRef}></canvas>
    </>
  );
};
