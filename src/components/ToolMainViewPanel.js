import React, { Component, useRef } from "react";

export default class ToolMainViewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef(null);
  }

  componentDidUpdate() {
    console.log("inside component did update");
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.props.img, 0, 0, 600, 600);
  }

  render() {
    return (
      <div className="toolMainViewPanel">
        <canvas
          id="main-canvas"
          ref={this.canvasRef}
          width={600}
          height={600}
        />
        {/* <img src={img} /> */}
      </div>
    );
  }
}
