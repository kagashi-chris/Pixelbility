import React, { Component } from "react";
import { LogoPanel } from "./LogoPanel";
import { ImportImagePanel } from "./ImportImagePanel";
import { MainCanvas } from "./MainCanvas";
import { EditImagePanel } from "./EditImagePanel";
import { GenerateImagePanel } from "./GenerateImagePanel";
import { Button } from "@mui/material";

export const Pixelbility = () => {
  //this is an array of groups of images. example:background, foreground, etc
  const [imageGroups, setImageGroups] = React.useState([
    { name: "Unassigned", imgs: [], open: true, imgLayers: [] },
  ]);
  //the indexes of the selected image from left panel goes in here. -1 for unassinged image group
  const [selectedGroups, setSelectedGroups] = React.useState([-1]);
  //useus this state to determine to weather main canvas shows base image or selected generated image
  const [selectedGeneratedImagesIdx, setGeneratedImageIdx] = React.useState(0);

  const [generatedImages, setGeneratedImages] = React.useState([]);

  const handleSetState = (setName, newState) => {
    switch (setName) {
      case "SET_IMAGE_GROUPS":
        setImageGroups(newState);
        break;
      case "SET_SELECTED_GROUPS":
        setSelectedGroups(newState);
        break;
      case "SET_GENEREATED_IMAGES":
        setGeneratedImages(newState);
        break;
      case "SET_SELECTED_GROUP_IDX":
        setGeneratedImageIdx(newState);
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
        generatedImages={generatedImages}
      />
      <LogoPanel />
      <Button variant="contained" className="Import-Default">
        Import Example Images
      </Button>
      <ImportImagePanel
        generatedImages={generatedImages}
        selectedGroups={selectedGroups}
        imageGroups={imageGroups}
        handleSetState={handleSetState}
      />
      <EditImagePanel
        imageGroups={imageGroups}
        handleSetState={handleSetState}
      />
      <GenerateImagePanel
        selectedGroups={selectedGroups}
        generatedImages={generatedImages}
        imageGroups={imageGroups}
        handleSetState={handleSetState}
      />
    </div>
  );
};

export default Pixelbility;
