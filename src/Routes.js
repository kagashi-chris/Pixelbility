import React from "react";
import Pixelbility from "./components/Pixelbility";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Pixelbility />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
