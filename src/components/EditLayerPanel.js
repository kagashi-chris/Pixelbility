import React, { Component } from "react";

export default class EditLayerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.ref = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  handleClick(event) {
    if (this.ref && !this.ref.current.contains(event.target)) {
      this.props.handleOpenEditPanel();
    }
  }

  render() {
    return <div className="edit-panel" ref={this.ref}></div>;
  }
}
