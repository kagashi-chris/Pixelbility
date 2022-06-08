import React, { Component } from "react";
import EditLayerPanel from "./EditLayerPanel";

export default class LayerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { showPanel: false };
    this.canvasRef = React.createRef(null);
    this.handleOpenEditPanel = this.handleOpenEditPanel.bind(this);
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

  handleOpenEditPanel() {
    this.setState({ showPanel: !this.state.showPanel });
  }

  render() {
    return (
      <div className="layerPanel">
        <button onClick={this.handleOpenEditPanel}>{`<`}</button>
        {this.state.showPanel === true ? (
          <EditLayerPanel handleOpenEditPanel={this.handleOpenEditPanel} />
        ) : (
          ""
        )}
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
