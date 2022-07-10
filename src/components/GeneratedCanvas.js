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
  }, [props.imgs]);

  const handleOnClick = () => {
    props.handleSetState("SET_SELECTED_GROUP_IDX", props.idx);
  };

  return (
    <div id="generated-image">
      <canvas
        width={80}
        height={80}
        ref={canvasRef}
        onClick={() => handleOnClick()}
      ></canvas>
    </div>
  );
};
