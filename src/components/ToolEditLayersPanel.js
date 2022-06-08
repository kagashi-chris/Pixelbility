import React, { Component } from "react";
import LayerPanel from "./LayerPanel";
import TempImageSplitCanvas from "./TempImageSplitCanvas";

export default class ToolEditLayersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { layerImages: [], seperatedImage: false };
    this.handleImageSeperation = this.handleImageSeperation.bind(this);
  }

  //convert iamge into canvas and then separate it into different canvas layers
  handleImageSeperation() {
    if (
      this.props.img.srcImage !== null &&
      this.state.seperatedImage === false
    ) {
      let pixelColorLocation = {};
      let canvasList = [];
      //convert image to canvas for image proccessing
      const newImg = this.props.img.srcImage;
      const newImgWidth = newImg.width;
      const newImgHeight = newImg.height;
      let canvas = this.props.canvas.current;
      let ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.canvas.width = newImgWidth;
      ctx.canvas.height = newImgHeight;
      ctx.drawImage(newImg, 0, 0, newImgWidth, newImgHeight);

      //look through each pixel and put it in an object base on it's RGB value
      //the x y position of the pixel will go into the value as [x,y]
      //example {"15 255 25":[[x1,y1],[x2,y2]]}
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
        for (let index = 0; index < pixelColorLocation[layer].length; index++) {
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
      this.props.imgHandler("img", {
        ...this.props.img,
        displayImage: [...this.props.img.displayImage, canvasList],
        layerImages: [...this.props.img.layerImages, ...canvasList],
      });
    }
  }

  //need to update this to read from props passed in instead of in this state
  render() {
    const idx = parseInt(this.props.img.selectedImgIdx);
    const displayImages = this.props.img.displayImage[idx];

    return (
      <div className="toolEditLayersPanel">
        <button id="seperate-image" onClick={this.handleImageSeperation}>
          Seperate Image
        </button>
        <div id="layer-container">
          {displayImages === undefined
            ? ""
            : displayImages.map((img, idx) => {
                return <LayerPanel key={idx} img={img} />;
              })}
        </div>
        <div id="layer-container-footer"></div>
      </div>
    );
  }
}
