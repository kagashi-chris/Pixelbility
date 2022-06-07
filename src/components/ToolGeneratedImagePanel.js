import React, { Component } from "react";
import GeneratedImage from "./GeneratedImage";

export default class ToolGeneratedImagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="toolGeneratedImagePanel">
        <div id="generate-image-top-bar">
          <button> Generate Images</button>
        </div>
        <div id="generate-image-main-content">
          {this.props.img.displayImage.map((img, idx) => {
            return <GeneratedImage key={idx} images={img} />;
          })}
        </div>
      </div>
    );
  }
}
