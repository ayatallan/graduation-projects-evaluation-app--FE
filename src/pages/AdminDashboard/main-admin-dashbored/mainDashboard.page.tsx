import React from 'react';
import SideBar from '../../../components/common/admin-dashboard-sidebar/sideBar';
import { Outlet } from 'react-router-dom';
import "./mainDashboard.css";

const MainDashboard = (props : any) => {
    return (
        <div className='mainDash'>
           {props.showSidebar ? <SideBar /> : null}
            <Outlet />
        </div>
    );
};

export default MainDashboard;