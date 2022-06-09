import React, { Component } from "react";
import ColorBox from "./ColorBox";

export default class EditLayerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { keepOriginColor: true, colorConstraints: [] };

    this.ref = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdateColorConstraints =
      this.handleUpdateColorConstraints.bind(this);
    this.colorInputRef = React.createRef(null);
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

  handleUpdateColorConstraints(event) {
    let arr = [...this.props.prop.img.constraints];
    switch (event.target.name) {
      case "keepOriginColor":
        const v = event.target.checked;
        arr[this.props.idx].keepOriginColor = v;
        break;
      case "colorConstraints":
        console.log("inside color const");
        const color = this.colorInputRef.current.value;
        arr[this.props.idx].colorConstraints.push(color);
        break;
      default:
        break;
    }

    this.props.prop.imgHandler("img", {
      ...this.props.prop.img,
      constraints: [...arr],
    });
  }

  ///update this state before update main state

  render() {
    return (
      <div className="edit-panel" ref={this.ref}>
        <label className="edit-panel-elements">
          <input
            type="checkbox"
            name="keepOriginColor"
            checked={
              this.props.prop.img.constraints[this.props.idx].keepOriginColor
            }
            onChange={this.handleUpdateColorConstraints}
          ></input>{" "}
          Keep Original Color
        </label>
        <div>
          <input type="color" ref={this.colorInputRef} />
          <button
            name="colorConstraints"
            onClick={this.handleUpdateColorConstraints}
          >
            Add
          </button>
        </div>
        <div className="colors-container">
          {this.props.prop.img.constraints[this.props.idx].colorConstraints.map(
            (img, idx) => {
              return (
                <ColorBox
                  key={idx}
                  color={
                    this.props.prop.img.constraints[this.props.idx]
                      .colorConstraints[idx]
                  }
                />
              );
            }
          )}
        </div>
      </div>
    );
  }
}
