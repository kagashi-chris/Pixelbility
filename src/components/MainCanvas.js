import React, { useEffect, useRef } from "react";

export const MainCanvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (props.generatedIdx === 0) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
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
    }
  }, [props.selectedGroups]);

  useEffect(() => {
    const imageArr = props.generatedImages[props.generatedIdx];
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (imageArr !== undefined) {
      for (let i = 0; i < imageArr.length; i++) {
        context.drawImage(
          imageArr[i],
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
      }
    }
  }, [props.generatedIdx]);

  return (
    <div>
      <canvas id="main_canvas" ref={canvasRef}></canvas>
    </div>
  );
};
