import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { GeneratedCanvas } from "./GeneratedCanvas";

export const GenerateImagePanel = (props) => {
  const imageGroup = props.imageGroups;

  const handleGenerate = () => {
    let renderArr = [];
    for (let i = 1; i < props.imageGroups.length; i++) {
      const randNumber = Math.floor(
        Math.random() * props.imageGroups[i].imgLayers.length
      );
      const canvasList = props.imageGroups[i].imgLayers[randNumber];
      console.log("Canvas list ", canvasList);
      for (let j = 0; j < canvasList.length; j++) {
        const canvas = canvasList[j];
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const hex = rgbToHex(r, g, b);
        let newCanvas = document.createElement("canvas");
        let newCtx = newCanvas.getContext("2d");
        newCtx.canvas.width = canvas.width;
        newCtx.canvas.height = canvas.height;
        newCtx.drawImage(
          canvas,
          0,
          0,
          newCtx.canvas.width,
          newCtx.canvas.height
        );
        newCtx.globalCompositeOperation = "source-in";
        newCtx.fillStyle = hex;
        newCtx.fillRect(0, 0, newCtx.canvas.width, newCtx.canvas.height);
        renderArr.push(newCanvas);
      }
      let imgs = [...props.generatedImages, renderArr];
      props.handleSetState("SET_GENEREATED_IMAGES", imgs);
    }
  };

  const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  return (
    <div className="generate_image_panel">
      <List>
        <Button
          variant="contained"
          id="generate_btn"
          onClick={() => handleGenerate()}
        >
          Generate Images
        </Button>
        <div className="generate-image-main-content">
          {props.generatedImages.map((gImages, idx) => {
            return <GeneratedCanvas imgs={gImages} key={idx} />;
          })}
        </div>
      </List>
    </div>
  );
};
