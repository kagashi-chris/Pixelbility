import React from "react";
import Home from "./components/Home";
import Pixelbility from "./components/Pixelbility";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pixelbility" element={<Pixelbility />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
