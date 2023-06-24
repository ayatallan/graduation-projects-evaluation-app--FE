import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import './nav.css';
import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import SideBar from "../admin-dashboard-sidebar/sideBar";

const MyNavbar= () => {
 
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
    <Navbar className="nav-bar">
      <Navbar.Brand href="#" onClick={handleToggleSidebar}>
        ☰
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        {/* Render the sidebar if showSidebar is true */}
     
      </Navbar.Collapse>
    </Navbar>  
    {showSidebar && <SideBar />}
    </div>
  );
};


export default MyNavbar;
                    