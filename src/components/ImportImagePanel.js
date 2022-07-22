import React, { useRef } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

export const ImportImagePanel = (props) => {
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const images = props.imageGroups;
  const selectedGroups = props.selectedGroups;

  const addImagesToState = (dataUrl) => {
    const group1 = {
      name: `Group 1`,
      imgs: [dataUrl[0], dataUrl[1], dataUrl[2]],
      open: true,
      imgLayers: [],
    };
    const group2 = {
      name: `Group 2`,
      imgs: [dataUrl[3], dataUrl[4]],
      open: true,
      imgLayers: [],
    };
    const defaultGroup = {
      name: "Unassigned",
      imgs: [],
      open: true,
      imgLayers: [],
    };
    let newImgGroups = [defaultGroup, group1, group2];

    props.handleSetState("SET_IMAGE_GROUPS", newImgGroups);
    const selectedGroups = [-1, 0, 0];
    props.handleSetState("SET_SELECTED_GROUPS", selectedGroups);
    const img1 = new Image();
    const img2 = new Image();
    img1.src = dataUrl[0];
    img2.src = dataUrl[3];
    props.handleSetState("SET_GENEREATED_IMAGES", [[img1, img2]]);
  };

  const handleAddExampleImages = async () => {
    const arr = [
      "images/background1.png",
      "images/background2.png",
      "images/background3.png",
      "images/reactCat3.png",
      "images/reactdog.png",
    ];
    let dataUrlArr = [];
    let blob0 = await fetch(arr[0]).then((r) => r.blob());
    let dataUrl0 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob0);
    });
    let blob1 = await fetch(arr[1]).then((r) => r.blob());
    let dataUrl1 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob1);
    });
    let blob2 = await fetch(arr[2]).then((r) => r.blob());
    let dataUrl2 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob2);
    });
    let blob3 = await fetch(arr[3]).then((r) => r.blob());
    let dataUrl3 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob3);
    });
    let blob4 = await fetch(arr[4]).then((r) => r.blob());
    let dataUrl4 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob4);
    });
    dataUrlArr.push(dataUrl0, dataUrl1, dataUrl2, dataUrl3, dataUrl4);
    addImagesToState(dataUrlArr);
  };
  //add a new group
  const handleAddLayer = () => {
    props.handleSetState("SET_IMAGE_GROUPS", [
      ...images,
      { name: `Group ${images.length}`, imgs: [], open: true, imgLayers: [] },
    ]);
    props.handleSetState("SET_SELECTED_GROUPS", [...selectedGroups, -1]);
  };

  //activates when add image button is clicked. will trigger input.click to open file add
  const handleAddImage = () => {
    inputRef.current.click();
  };

  //activates when file is added and adds to images inside image group. first comes in unassigned
  const handleFileChange = () => {
    if (inputRef.current.files[0] && inputRef.current.files[0].length !== 0) {
      const FR = new FileReader();
      FR.onload = function (e) {
        let layers = [...images];
        layers[0].imgs.push(e.target.result);
        props.handleSetState("SET_IMAGE_GROUPS", layers);
      };
      FR.readAsDataURL(inputRef.current.files[0]);
    }
  };

  //changes which  group the image belongs to
  const handleMenuSelect = (e, layerIdx, imgIdx) => {
    let layers = [...images];
    // let img =
    const img = layers[layerIdx].imgs[imgIdx];
    layers[layerIdx].imgs.splice(imgIdx, 1);
    layers[e.target.value].imgs.push(img);
    props.handleSetState("SET_IMAGE_GROUPS", layers);

    //TODO add the ability to move imgLayers
    manageSelectedGroups(layers);
  };

  //expands image groups
  const handleToggleExpand = (idx) => {
    let layers = [...images];
    layers[idx].open = !layers[idx].open;
    props.handleSetState("SET_IMAGE_GROUPS", layers);
  };

  const manageNewGeneratedImageMain = (arr) => {
    let newGeneratedImages = [...props.generatedImages];
    newGeneratedImages[0] = [];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > -1) {
        const image = new Image();
        image.onload = function () {
          newGeneratedImages[0].push(image);
          props.handleSetState("SET_GENEREATED_IMAGES", newGeneratedImages);
        };
        image.src = props.imageGroups[i].imgs[arr[i]];
      }
    }
  };

  const handleSelectGroup = (groupIdx, imgIdx) => {
    if (groupIdx !== 0) {
      let newGroup = [...selectedGroups];
      newGroup[groupIdx] = imgIdx;
      props.handleSetState("SET_SELECTED_GROUPS", newGroup);
      manageNewGeneratedImageMain(newGroup);
    }
  };

  const manageSelectedGroups = (layers) => {
    let arr = new Array(layers.length);
    for (let i = 0; i < layers.length; i++) {
      if (i === 0 || layers[i].imgs.length === 0) {
        arr[i] = -1;
      } else {
        arr[i] = 0;
      }
    }
    props.handleSetState("SET_SELECTED_GROUPS", arr);
    manageNewGeneratedImageMain(arr);
  };

  return (
    <>
      <Button
        variant="contained"
        className="Import-Default"
        onClick={() => {
          handleAddExampleImages();
        }}
      >
        Import Example Images
      </Button>
      <List
        sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className="import-img-panel"
      >
        <ListItemButton onClick={() => handleAddImage()}>
          <input
            type="file"
            ref={inputRef}
            id="my_file"
            onChange={() => handleFileChange()}
          />
          <ListItemIcon>
            <DriveFolderUploadIcon />
          </ListItemIcon>
          <ListItemText primary="Import Image" />
        </ListItemButton>
        <ListItemButton onClick={() => handleAddLayer()}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Groups" />
        </ListItemButton>
        <Divider />
        <div className="import-image-container">
          {images.map((imageGroup, idx) => {
            return (
              <div key={idx}>
                <ListItemButton
                  onClick={() => {
                    handleToggleExpand(idx);
                  }}
                >
                  <ListItemText primary={imageGroup.name} />
                  <div>{imageGroup.imgs.length}</div>
                  {images[idx].open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={images[idx].open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {images[idx].imgs.map((img, imgIdx) => {
                      return (
                        <ListItemButton
                          key={imgIdx}
                          onClick={() => {
                            handleSelectGroup(idx, imgIdx);
                          }}
                        >
                          <img src={img} alt="" className="imported_image" />
                          <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                          >
                            <InputLabel>Group</InputLabel>
                            <Select
                              value={idx}
                              ref={menuRef}
                              onChange={(e) => {
                                handleMenuSelect(e, idx, imgIdx);
                              }}
                              label="Age"
                            >
                              {images.map((layer, selectIdx) => {
                                return (
                                  <MenuItem value={selectIdx} key={selectIdx}>
                                    {layer.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          })}
        </div>
      </List>
    </>
  );
};
