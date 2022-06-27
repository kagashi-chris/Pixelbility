import React, { useRef, useEffect } from "react";

export const GeneratedCanvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    for (let i = 0; i < props.imgs.length; i++) {
      context.drawImage(
        props.imgs[i],
        0,
        0,
        context.canvas.width,
        context.canvas.height
      );
    }
  }, []);

  return (
    <div>
      {console.log("PROPS", props.imgs)}
      <canvas width={52} height={52} ref={canvasRef}></canvas>
    </div>
  );
};
