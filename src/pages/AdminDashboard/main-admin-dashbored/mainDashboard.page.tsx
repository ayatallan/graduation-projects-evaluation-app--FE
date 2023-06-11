import React from 'react';
import SideBar from '../../../components/common/admin-dashboard-sidebar/sideBar';
import { Outlet } from 'react-router-dom';
import "./mainDashboard.css";

const MainDashboard = () => {
    return (
        <div className='mainDash'>
            <SideBar />
            <Outlet />
        </div>
    );
};

export default MainDashboard;