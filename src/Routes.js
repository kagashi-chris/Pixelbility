import React from "react";
import Home from "./components/Home";
import Pixelbility from "./components/Pixelbility";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  const home = Home();
  const pixelbility = Pixelbility();

  return (
    <div>
      <Routes>
        <Route path="/" element={home} />
        <Route path="/pixelbility" element={pixelbility} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
