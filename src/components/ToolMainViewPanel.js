import React, { Component } from "react";

export default class ToolMainViewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef(null);
  }

  componentDidUpdate() {
    if (this.props.img.srcImage !== null) {
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

    // console.log(ctx.getImageData(352, 352, 1, 1));
    // let saveImage = ctx.canvas
    //   .toDataURL("image/png")
    //   .replace("image/png", "image/octet-stream");
    // window.location.href = saveImage;
  }

  render() {
    return (
      <div className="toolMainViewPanel">
        <canvas
          id="main-canvas"
          ref={this.canvasRef}
          width={512}
          height={512}
        />
        {/* <img src={img} /> */}
      </div>
    );
  }
}
