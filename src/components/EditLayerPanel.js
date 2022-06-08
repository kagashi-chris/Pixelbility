import React, { Component } from "react";

export default class EditLayerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.ref = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdateConstraints = this.handleUpdateConstraints.bind(this);
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

  handleUpdateConstraints(event) {
    event.preventDefault();
    console.log("submit", event.target[0].value);
  }

  render() {
    console.log(this.props);
    return (
      <div className="edit-panel" ref={this.ref}>
        <label className="edit-panel-elements">
          <input type="checkbox"></input> Keep Original Color
        </label>
        <form
          onSubmit={this.handleUpdateConstraints}
          className="edit-panel-elements"
        >
          <label>Add Color Constraints</label>
          <input type="color" />
          <button>Add</button>
        </form>
        <div className="colors-container"></div>
      </div>
    );
  }
}
