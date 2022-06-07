import React, { Component } from "react";
import ToolImportImagePanel from "./ToolImportImagePanel";
import ToolMainViewPanel from "./ToolMainViewPanel";
import ToolEditLayersPanel from "./ToolEditLayersPanel";
import ToolGeneratedImagePanel from "./ToolGeneratedImagePanel";

export default class Pixelbility extends Component {
  constructor() {
    super();
    this.state = {
      img: { srcImage: null },
    };
    this.imgHandler = this.imgHandler.bind(this);
    this.canvasRef = React.createRef(null);
  }

  imgHandler(targetName, targetData) {
    this.setState({ ...this.state, [targetName]: targetData }, () => {
      console.log("updated state in main");
    });
  }

  render() {
    return (
      <div className="main-app-panel">
        <div className="main-app-panel-1">
          {/* for resizing and editing image */}
          <canvas ref={this.canvasRef} id="tempCanvas" className=""></canvas>
          <ToolImportImagePanel
            img={this.state.img}
            imgHandler={this.imgHandler}
          />
          <ToolMainViewPanel img={this.state.img} />
          <ToolEditLayersPanel
            img={this.state.img}
            imgHandler={this.imgHandler}
            canvas={this.canvasRef}
          />
          <ToolGeneratedImagePanel />
        </div>
      </div>
    );
  }
}

// export default Pixelbility;
