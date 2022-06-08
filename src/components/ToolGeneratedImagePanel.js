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
    let newDisplayCanvasArr = [...this.props.img.layerImages];
    let testArr = [];

    this.props.img.layerImages.forEach((canvas) => {
      // let ctx = canvas.getContext("2d");
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const hex = this.rgbToHex(r, g, b);
      let newCanvas = document.createElement("canvas");
      let newCtx = newCanvas.getContext("2d");
      newCtx.canvas.width = canvas.width;
      newCtx.canvas.height = canvas.height;
      newCtx.drawImage(canvas, 0, 0, newCtx.canvas.width, newCtx.canvas.height);
      newCtx.globalCompositeOperation = "source-in";
      newCtx.fillStyle = hex;
      newCtx.fillRect(0, 0, newCtx.canvas.width, newCtx.canvas.height);
      testArr.push(newCanvas);
      // ctx.globalCompositeOperation = "source-in";
      // ctx.fillStyle = hex;
      // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
    console.log("inside generate image");
    console.log(this.props.img.displayImage[0][0].getContext("2d"));

    this.props.imgHandler("img", {
      ...this.props.img,
      displayImage: [...this.props.img.displayImage, testArr],
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
