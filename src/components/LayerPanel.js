import React, { Component } from "react";

export default class LayerPanel extends Component {
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
      <div className="layerPanel">
        <canvas
          className="layerImage layerPanelElements"
          ref={this.canvasRef}
          width={48}
          height={48}
        ></canvas>
        <div className="layerPanelElements">SOME TEXT</div>
      </div>
    );
  }
}
