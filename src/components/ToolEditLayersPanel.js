import React, { Component } from "react";
import LayerPanel from "./LayerPanel";

export default class ToolEditLayersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { layerImages: [], seperatedImage: false };
    this.handleImageSeperation = this.handleImageSeperation.bind(this);
  }

  componentDidUpdate() {
    if (this.props.img.srcImage !== null) {
    }
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
        <div id="layer-container">
          <LayerPanel img={this.props.img} />
        </div>
        <div id="layer-container-footer"></div>
      </div>
    );
  }
}
