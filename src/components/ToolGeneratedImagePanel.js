import React, { Component } from "react";
import GeneratedImage from "./GeneratedImage";

export default class ToolGeneratedImagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.generateImage = this.generateImage.bind(this);
    this.rgbToHex = this.rgbToHex.bind(this);
    this.componentToHex = this.componentToHex.bind(this);
    this.handleElementClicked = this.handleElementClicked.bind(this);
  }

  handleElementClicked(idx) {
    this.props.imgHandler("img", { ...this.props.img, selectedImgIdx: idx });
  }

  generateImage() {
    let arr = [];
    let currCanvasIdx = 0;

    this.props.img.layerImages.forEach((canvas) => {
      const constraints = this.props.img.constraints[currCanvasIdx];
      let hex = "";

      if (constraints.keepOriginColor === true) {
        let orginalCanvas = this.props.img.displayImage[0][currCanvasIdx];
        let orignalCtx = orginalCanvas.getContext("2d");
        hex = orignalCtx.fillStyle;
      } else if (constraints.colorConstraints.length > 0) {
        const randNumber = Math.floor(
          Math.random() * constraints.colorConstraints.length
        );
        hex = constraints.colorConstraints[randNumber];
      } else {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        hex = this.rgbToHex(r, g, b);
      }

      let newCanvas = document.createElement("canvas");
      let newCtx = newCanvas.getContext("2d");
      newCtx.canvas.width = canvas.width;
      newCtx.canvas.height = canvas.height;
      newCtx.drawImage(canvas, 0, 0, newCtx.canvas.width, newCtx.canvas.height);
      newCtx.globalCompositeOperation = "source-in";
      newCtx.fillStyle = hex;
      newCtx.fillRect(0, 0, newCtx.canvas.width, newCtx.canvas.height);
      arr.push(newCanvas);
      currCanvasIdx++;
    });

    this.props.imgHandler("img", {
      ...this.props.img,
      displayImage: [...this.props.img.displayImage, arr],
    });
  }

  rgbToHex(r, g, b) {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  render() {
    return (
      <div className="toolGeneratedImagePanel">
        <div id="generate-image-top-bar">
          <button onClick={this.generateImage}> Generate Images</button>
        </div>
        <div id="generate-image-main-content">
          {this.props.img.displayImage.map((img, idx) => {
            return (
              <div onClick={() => this.handleElementClicked(idx)} key={idx}>
                <GeneratedImage key={idx} images={img} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
