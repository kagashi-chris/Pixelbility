import React, { Component } from "react";
import GeneratedImage from "./GeneratedImage";

export default class ToolGeneratedImagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.generateImage = this.generateImage.bind(this);
    this.rgbToHex = this.rgbToHex.bind(this);
    this.componentToHex = this.componentToHex.bind(this);
  }

  generateImage() {
    console.log("generating 1 image");
    console.log(this.props.img);
    let newDisplayCanvasArr = [...this.props.img.layerImages];
    console.log(newDisplayCanvasArr);

    newDisplayCanvasArr.forEach((canvas) => {
      let ctx = canvas.getContext("2d");
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const hex = this.rgbToHex(r, g, b);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
    this.props.imgHandler("img", {
      ...this.props.img,
      displayImage: [...this.props.img.displayImage, newDisplayCanvasArr],
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
            return <GeneratedImage key={idx} images={img} />;
          })}
        </div>
      </div>
    );
  }
}
