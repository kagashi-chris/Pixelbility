import React, { useRef, useEffect } from "react";

export const ProgressBar = (props) => {
  const importRef = useRef();
  const groupRef = useRef();
  const separateRef = useRef();
  const generateRef = useRef();

  useEffect(() => {
    let hasImage = false;
    let hasGroup = false;
    let hasSeparated = false;
    let hasGenerated = false;

    if (props.generatedImages.length > 1) {
      hasImage = true;
      hasGroup = true;
      hasSeparated = true;
      hasGenerated = true;
    } else if (
      props.imageGroups.length > 1 &&
      props.imageGroups[1].imgLayers.length > 0
    ) {
      hasImage = true;
      hasGroup = true;
      hasSeparated = true;
    }
    for (let i = 0; i < props.imageGroups.length; i++) {
      if (i != 0 && props.imageGroups[i].imgs.length > 0) {
        hasImage = true;
        hasGroup = true;
      } else if (props.imageGroups[i].imgs.length > 0) {
        hasImage = true;
      }
    }
    if (hasImage) importRef.current.className = "active";
    if (hasGroup) groupRef.current.className = "active";
    if (hasSeparated) separateRef.current.className = "active";
    if (hasGenerated) generateRef.current.className = "active";
  }, [props.generatedImages, props.imageGroups]);

  return (
    <div className="progress-container">
      <ul className="progressbar">
        <li ref={importRef}>Import</li>
        <li ref={groupRef}>Group</li>
        <li ref={separateRef}>Separate</li>
        <li ref={generateRef}>Generate</li>
      </ul>
    </div>
  );
};
