import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/logo2.png";
import navProfile from "../../assets/nav-profile.svg";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="navlogo" />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
