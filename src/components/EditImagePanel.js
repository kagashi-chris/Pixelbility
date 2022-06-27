import React, { useRef } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import { LayerCanvas } from "./LayerCanvas";

export const EditImagePanel = (props) => {
  const [open, setOpen] = React.useState(true);
  const canvasRef = useRef(null);
  const layerImagered = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSeparateImage = () => {
    for (let i = 0; i < props.imageGroups.length; i++) {
      for (let j = 0; j < props.imageGroups[i].imgs.length; j++) {
        let pixelColorLocation = {};
        let canvasList = [];
        let constraintlist = [];
        const newImg = new Image();
        newImg.src = props.imageGroups[i].imgs[j];
        const newImgWidth = newImg.width;
        const newImgHeight = newImg.height;
        let canvas = canvasRef.current;
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.canvas.width = newImgWidth;
        ctx.canvas.height = newImgHeight;
        ctx.drawImage(newImg, 0, 0, newImgWidth, newImgHeight);
        for (let x = 0; x < newImgWidth; x++) {
          for (let y = 0; y < newImgHeight; y++) {
            const ctxData = ctx.getImageData(x, y, 1, 1).data;
            if (ctxData[4] !== "0") {
              const k = `${ctxData[0]} ${ctxData[1]} ${ctxData[2]} ${ctxData[3]}`;

              //check if a pixel is transparent
              if (!(k === "0 0 0 0")) {
                if (k in pixelColorLocation) {
                  pixelColorLocation[`${k}`].push([x, y]);
                } else {
                  pixelColorLocation[`${k}`] = [[x, y]];
                }
              }
            }
          }
        }
        //go through each layer and create a new canvas then color in the pixels based on location in array
        for (const layer in pixelColorLocation) {
          let newCanvas = document.createElement("canvas");
          let newCtx = newCanvas.getContext("2d");
          newCtx.imageSmoothingEnabled = false;
          newCtx.canvas.width = newImgWidth;
          newCtx.canvas.height = newImgHeight;
          for (
            let index = 0;
            index < pixelColorLocation[layer].length;
            index++
          ) {
            const rgbArr = layer.split(" ");
            newCtx.fillStyle = `rgb(
              ${rgbArr[0]},
              ${rgbArr[1]},
              ${rgbArr[2]})`;
            const pixelLocation = pixelColorLocation[layer][index];
            //pixelLocation[0] holds x value and [1] holds y value
            newCtx.fillRect(pixelLocation[0], pixelLocation[1], 1, 1);
          }
          canvasList.push(newCanvas);
        }

        //initialize number of constraints base on number of layers
        for (let i = 0; i < canvasList.length; i++) {
          constraintlist.push({ keepOriginColor: false, colorConstraints: [] });
        }

        let imageGroups = [...props.imageGroups];
        imageGroups[i].imgLayers = [
          ...imageGroups[i].imgLayers,
          [...canvasList],
        ];
        props.handleSetState("SET_IMAGE_GROUPS", imageGroups);
      }
    }
  };

  return (
    <div className="edit-image">
      <List
        sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}
        className="edit-img-panel"
      >
        <canvas ref={canvasRef} id="tempCanvas"></canvas>
        <ListItemButton
          onClick={() => {
            handleSeparateImage();
          }}
        >
          <ListItemIcon>
            <ArtTrackIcon />
          </ListItemIcon>
          <ListItemText primary="Separate Image" />
        </ListItemButton>
        <Divider />
        {props.imageGroups.map((group, groupIdx) => {
          return (
            <div key={groupIdx}>
              <ListItemButton
                onClick={() => {
                  handleClick();
                }}
              >
                <ListItemText primary={group.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {group.imgs.map((img, imgIdx) => {
                    return (
                      <div key={imgIdx}>
                        <ListItemButton sx={{ pl: 4 }}>
                          {console.log(group.imgLayers)}
                          <ListItemText primary={`Image ${imgIdx + 1}`} />
                          {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {group.imgLayers[imgIdx]
                              ? group.imgLayers[imgIdx].map((part, partIdx) => {
                                  return (
                                    <ListItemButton
                                      key={partIdx}
                                      sx={{ pl: 8 }}
                                    >
                                      <LayerCanvas
                                        img={group.imgLayers[imgIdx][partIdx]}
                                      />
                                    </ListItemButton>
                                  );
                                })
                              : ""}
                          </List>
                        </Collapse>
                      </div>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </div>
  );
};
