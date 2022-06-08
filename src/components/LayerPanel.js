import React, { Component } from "react";

export default class LayerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef(null);
  }

  componentDidMount() {
    if (this.props.img) {
      const ctx = this.canvasRef.current.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.props.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }
  componentDidUpdate() {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.props.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  render() {
    return (
      <div className="layerPanel">
        <canvas
          className="layerImage layerPanelElements"
          ref={this.canvasRef}
          width={52}
          height={52}
        ></canvas>
        <input type="color" className="layerPanelElements" />
      </div>
    );
  }
}
