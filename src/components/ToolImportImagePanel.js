import React, { Component } from "react";

export default class ToolImportImagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFileReader = this.handleFileReader.bind(this);
  }

  handleFileReader(event) {
    console.log(event.target);
    let file = event.target.files[0];
    this.props.imgHandler(URL.createObjectURL(file));
  }

  render() {
    return (
      <div className="toolImportImagePanel">
        <input
          type="file"
          id="image_input"
          accept="image/jpg, image/png"
          onChange={this.handleFileReader}
        />
      </div>
    );
  }
}
