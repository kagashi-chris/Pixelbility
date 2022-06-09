import React, { Component } from "react";

export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef(null);
  }

  componentDidMount() {
    let ctx = this.canvasRef.current.getContext("2d");
    ctx.fillStyle = this.props.color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  render() {
    return (
      <canvas
        width={12}
        height={12}
        ref={this.canvasRef}
        className="color-box"
      ></canvas>
    );
  }
}
