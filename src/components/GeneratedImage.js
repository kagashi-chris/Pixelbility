import React, { Component } from "react";

export default class GeneratedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef(null);
  }

  componentDidMount() {
    const imageArr = [...this.props.images];
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    imageArr.forEach((image) => {
      ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    });
  }

  render() {
    return (
      <div className="generated-image">
        <div>
          {this._reactInternals.key === "0"
            ? "Original"
            : this._reactInternals.key}
        </div>
        <canvas
          ref={this.canvasRef}
          width={126}
          height={126}
          key={this._reactInternals.key}
        ></canvas>
      </div>
    );
  }
}
