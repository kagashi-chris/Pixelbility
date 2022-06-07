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
