import React from 'react';
import SideBar from '../../../components/common/admin-dashboard-sidebar/sideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./mainDashboard.css";
import StudentsPage from '../students/student.page';


const MainDashboard = () => {
    return (
        <div className='mainDash'>

            <div><SideBar /></div>
            <Routes>
                <Route path="/StudentsPage" element={<StudentsPage />} />
            </Routes>

        </div>
    );
};

export default MainDashboard;