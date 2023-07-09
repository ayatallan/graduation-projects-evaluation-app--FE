import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import './nav.css';
import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import SideBar from "../admin-dashboard-sidebar/sideBar";
import { Link } from "react-router-dom";

const MyNavbar = (props: any) => {

  return (
    <div>
      <Navbar className="nav-bar">

        <div className="Nav" onClick={props.handleToggleSidebar}>   ☰</div>

        <div className="navigate-btn">
          <Link to="/groups" className="nav-button">Groups</Link>
          <Link to="/report" className="nav-button">Report</Link>
        </div>

    
      </Navbar>
      <div className="Side">
        {props.showSidebar && <SideBar showSidebar={props.showSidebar} setShowSidebar={props.setShowSidebar} handleToggleSidebar={props.handleToggleSidebar} />}

      </div>

    </div>
  );
};


export default MyNavbar;
