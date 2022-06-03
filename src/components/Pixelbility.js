import React from "react";
import ToolImportImagePanel from "./ToolImportImagePanel";
import ToolMainViewPanel from "./ToolMainViewPanel";
import ToolEditLayersPanel from "./ToolEditLayersPanel";
import ToolGeneratedImagePanel from "./ToolGeneratedImagePanel";

const Pixelbility = () => {
  return (
    <div className="main-app-panel">
      <div className="main-app-panel-1">
        <ToolImportImagePanel />
        <ToolMainViewPanel />
        <ToolEditLayersPanel />
      </div>
      <div className="main-app-panel-2">
        <ToolGeneratedImagePanel />
      </div>
    </div>
  );
};

export default Pixelbility;
