import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import './nav.css';
import { Navbar, Nav } from "react-bootstrap";

const MyNavbar= () => {
  return (
    <Navbar   className="nav-bar">
      <Navbar.Brand href="#"> ☰</Navbar.Brand >
      <Navbar.Collapse id="basic-navbar-nav">
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
                    