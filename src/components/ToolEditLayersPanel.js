import React, { Component } from "react";
import LayerPanel from "./LayerPanel";

export default class ToolEditLayersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleImageSeperation = this.handleImageSeperation.bind(this);
  }

  handleImageSeperation() {
    console.log("button pressed");
  }

  render() {
    return (
      <div className="toolEditLayersPanel">
        <button id="seperate-image" onClick={this.handleImageSeperation}>
          Seperate Image
        </button>
        <div id="layer-container"></div>
        <div id="layer-container-footer"></div>
      </div>
    );
  }
}
