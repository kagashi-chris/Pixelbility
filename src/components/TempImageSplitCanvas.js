import React, { Component } from "react";

export default class TempImageSplitCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef(null);
  }

  componentDidMount() {
    if (this.props.img.srcImage) {
      const ctx = this.canvasRef.current.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        this.props.img.srcImage,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
      for (let w = 0; w < ctx.canvas.width; w++) {
        for (let h = 0; h < ctx.canvas.height; h++) {
          console.log(ctx.getImageData(w, h, 1, 1).data.slice(0, 4));
        }
      }
    }
  }

  render() {
    return (
      <canvas
        className="hidden"
        ref={this.canvasRef}
        id="tempCanvas"
        width={this.props.img.srcImage.width}
        height={this.props.img.srcImage.height}
      ></canvas>
    );
  }
}
