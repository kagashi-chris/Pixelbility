import React, { Component } from "react";
import { LogoPanel } from "./LogoPanel";
import { ImportImagePanel } from "./ImportImagePanel";
import { MainCanvas } from "./MainCanvas";
import { EditImagePanel } from "./EditImagePanel";
// import ToolImportImagePanel from "./ToolImportImagePanel";
// import ToolMainViewPanel from "./ToolMainViewPanel";
// import ToolEditLayersPanel from "./ToolEditLayersPanel";
// import ToolGeneratedImagePanel from "./ToolGeneratedImagePanel";

export const Pixelbility = () => {
  //this is an array of groups of images. example:background, foreground, etc
  const [imageGroups, setImageGroups] = React.useState([
    { name: "Unassigned", imgs: [], open: true },
  ]);
  //the indexes of the selected image from left panel goes in here. -1 for unassinged image group
  const [selectedGroups, setSelectedGroups] = React.useState([-1]);
  //useus this state to determine to weather main canvas shows base image or selected generated image
  const [selectedGeneratedImagesIdx, setGeneratedImageIdx] = React.useState(0);
  //images separated out into different layers
  const [imageLayers, setImageLayers] = React.useState([[[]]]);

  const handleSetState = (setName, newState) => {
    switch (setName) {
      case "SET_IMAGE_GROUPS":
        setImageGroups(newState);
        break;
      case "SET_SELECTED_GROUPS":
        setSelectedGroups(newState);
        break;
      case "SET_IMAGE_LAYERS":
        setImageLayers(newState);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <MainCanvas
        selectedGroups={selectedGroups}
        imgGroup={imageGroups}
        generatedIdx={selectedGeneratedImagesIdx}
      />
      <LogoPanel />
      <ImportImagePanel
        imageLayers={imageLayers}
        selectedGroups={selectedGroups}
        imageGroups={imageGroups}
        handleSetState={handleSetState}
      />
      <EditImagePanel
        imageGroups={imageGroups}
        imageLayers={imageLayers}
        handleSetState={handleSetState}
      />
    </div>
  );
};

// export default class Pixelbility extends Component {
//   constructor() {
//     super();
//     this.state = {
//       // img: {
//       //   srcImage: null,
//       //   layerImages: [],
//       //   displayImage: [],
//       //   selectedImgIdx: 0,
//       //   constraints: [],
//       // },
//     };
//     // this.imgHandler = this.imgHandler.bind(this);
//     // this.canvasRef = React.createRef(null);
//   }

//   // imgHandler(targetName, targetData) {
//   //   this.setState({ ...this.state, [targetName]: targetData }, () => {
//   //     if (this.state.img.displayImage[0] !== undefined) {
//   //       console.log("updated state", this.state.img);
//   //     }
//   //   });
//   // }

//   render() {
//     return (
//       <div>
//         <LogoPanel />
//         <ImportImagePanel />
//         <MainCanvas />
//       </div>
//       // <div className="main-app-panel">
//       //   <div className="main-app-panel-1">
//       //     {/* for resizing and editing image */}
//       //     <canvas
//       //       ref={this.canvasRef}
//       //       id="tempCanvas"
//       //       className="hidden"
//       //     ></canvas>
//       //     <ToolImportImagePanel
//       //       img={this.state.img}
//       //       imgHandler={this.imgHandler}
//       //     />
//       //     <ToolMainViewPanel img={this.state.img} />
//       //     <ToolEditLayersPanel
//       //       img={this.state.img}
//       //       imgHandler={this.imgHandler}
//       //       canvas={this.canvasRef}
//       //     />
//       //     <ToolGeneratedImagePanel
//       //       img={this.state.img}
//       //       imgHandler={this.imgHandler}
//       //     />
//       //   </div>
//       // </div>
//     );
//   }
// }

export default Pixelbility;
