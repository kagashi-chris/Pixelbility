import React, { Component } from "react";
import ToolImportImagePanel from "./ToolImportImagePanel";
import ToolMainViewPanel from "./ToolMainViewPanel";
import ToolEditLayersPanel from "./ToolEditLayersPanel";
import ToolGeneratedImagePanel from "./ToolGeneratedImagePanel";

export default class Pixelbility extends Component {
  constructor() {
    super();
    this.state = {
      img: null,
    };
    this.imgHandler = this.imgHandler.bind(this);
  }

  imgHandler(imgFile) {
    this.setState({ ...this.state, img: imgFile });
  }

  render() {
    return (
      <div className="main-app-panel">
        <div className="main-app-panel-1">
          <ToolImportImagePanel
            img={this.state.img}
            imgHandler={this.imgHandler}
          />
          <ToolMainViewPanel img={this.state.img} />
          <ToolEditLayersPanel img={this.state.img} />
          <ToolGeneratedImagePanel />
        </div>
      </div>
    );
  }
}

// export default Pixelbility;
