import React, { Component } from "react";

export default class ToolMainViewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let img = "";
    this.props.img === ""
      ? (img = require("../assets/img/uploadImage.jpg"))
      : (img = this.props.img);

    return (
      <div className="toolMainViewPanel">
        <img src={img} />
      </div>
    );
  }
}
