import React, { Component } from "react";
import ToolImportImagePanel from "./ToolImportImagePanel";
import ToolMainViewPanel from "./ToolMainViewPanel";
import ToolEditLayersPanel from "./ToolEditLayersPanel";
import ToolGeneratedImagePanel from "./ToolGeneratedImagePanel";

export default class Pixelbility extends Component {
  constructor() {
    super();
    this.state = {
      img: {
        srcImage: null,
        layerImages: [],
        displayImage: [],
        selectedImgIdx: 0,
        constraints: [],
      },
    };
    this.imgHandler = this.imgHandler.bind(this);
    this.canvasRef = React.createRef(null);
  }

  imgHandler(targetName, targetData) {
    this.setState({ ...this.state, [targetName]: targetData }, () => {
      if (this.state.img.displayImage[0] !== undefined) {
        console.log("updated state", this.state.img);
      }
    });
  }

  render() {
    return (
      <div className="main-app-panel">
        <div className="main-app-panel-1">
          {/* for resizing and editing image */}
          <canvas
            ref={this.canvasRef}
            id="tempCanvas"
            className="hidden"
          ></canvas>
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
          <ToolGeneratedImagePanel
            img={this.state.img}
            imgHandler={this.imgHandler}
          />
        </div>
      </div>
    );
  }
}

// export default Pixelbility;
