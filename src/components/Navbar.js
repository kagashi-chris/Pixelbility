import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to="">Home</Link>
        <Link to="/Pixelbility">Pixelbility</Link>
      </nav>
    </div>
  );
};

export default Navbar;
