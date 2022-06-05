import React, { Component } from "react";

export default class ToolEditLayersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleImageSeperation = this.handleImageSeperation.bind(this);
  }

  handleImageSeperation() {
    const img = new Image();
    img.onload = function () {
      console.log(this.width + "x" + this.height);
    };
    img.src = this.props.img;
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
