import React, { Component } from "react";

export default class ToolEditLayersPanel extends Component {
  render() {
    return (
      <div className="toolEditLayersPanel">
        <button id="seperate-image">Seperate Image</button>
        <div id="layer-container"></div>
        <div id="layer-container-footer"></div>
      </div>
    );
  }
}
