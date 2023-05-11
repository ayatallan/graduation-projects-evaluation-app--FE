import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import './nav.css';
import { Navbar, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
const MyNavbar = () => {
  const location = useLocation();
  let isVisible = true;
  if (location.pathname == '/' || location.pathname == '/SignIn') {
    isVisible = false;
  }
  return (
    isVisible? <Navbar className="nav-bar">
      <Navbar.Brand href="#"> ☰</Navbar.Brand >
      <Navbar.Collapse id="basic-navbar-nav">
      </Navbar.Collapse>
    </Navbar>:<div></div>
  );
};

export default MyNavbar;
                    