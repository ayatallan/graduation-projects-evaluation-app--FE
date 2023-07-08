import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import './nav.css';
import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import SideBar from "../admin-dashboard-sidebar/sideBar";

const MyNavbar= (props : any) => {

  return (
    <div>
    <Navbar className="nav-bar">
      <Navbar.Brand  onClick={props.handleToggleSidebar}>
        ☰
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
{/* <span>{props.Musers.Name}</span> */}
      </Navbar.Collapse>
    </Navbar>  
    <div className="Side">
    {props.showSidebar && <SideBar showSidebar={props.showSidebar} setShowSidebar={props.setShowSidebar} handleToggleSidebar={props.handleToggleSidebar}  />}

    </div>

    </div>
  );
};


export default MyNavbar;
                    