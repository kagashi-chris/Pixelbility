import React, { useEffect, useRef } from "react";

export const MainCanvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(props);
    for (let i = 1; i < props.selectedGroups.length; i++) {
      if (props.selectedGroups[i] >= 0) {
        const img = new Image();
        img.src = props.imgGroup[i].imgs[props.selectedGroups[i]];
        context.imageSmoothingEnabled = false;
        context.drawImage(
          img,
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
      }
    }
  }, [props.selectedGroups]);
  return (
    <div>
      {console.log(props)}
      <canvas id="main_canvas" ref={canvasRef}></canvas>
    </div>
  );
};
