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

export const ImportImagePanel = (props) => {
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const images = props.imageGroups;
  const selectedGroups = props.selectedGroups;

  //add a new group
  const handleAddLayer = () => {
    props.handleSetState("SET_IMAGE_GROUPS", [
      ...images,
      { name: `Group ${images.length}`, imgs: [], open: true },
    ]);
    props.handleSetState("SET_SELECTED_GROUPS", [...selectedGroups, -1]);
    props.handleSetState("SET_IMAGE_LAYERS", [...props.imageLayers, [[[]]]]);
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

    manageSelectedGroups(layers);
  };

  //expands image groups
  const handleToggleExpand = (idx) => {
    let layers = [...images];
    layers[idx].open = !layers[idx].open;
    props.handleSetState("SET_IMAGE_GROUPS", layers);
  };

  const handleSelectGroup = (groupIdx, imgIdx) => {
    if (groupIdx !== 0) {
      let newGroup = [...selectedGroups];
      newGroup[groupIdx] = imgIdx;
      props.handleSetState("SET_SELECTED_GROUPS", newGroup);
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
  };

  return (
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
    </List>
  );
};
