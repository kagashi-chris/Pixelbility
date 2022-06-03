import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="header">
        <img
          className="logo"
          alt="Pixelbility Logo"
          src={require("../assets/img/Logo.png")}
        />
        <nav className="main-nav">
          <Link to="">Home</Link>
          <Link to="/Pixelbility">Pixelbility</Link>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
