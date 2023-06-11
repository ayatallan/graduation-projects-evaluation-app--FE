import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import './sidebar.css'; // Import the CSS file for styling
import StudentsPage from '../../../pages/AdminDashboard/students/student.page';

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <Link to="/AdminDashboard/StudentsPage">Students Page</Link>
      

    </div>
  );
};

export default SideBar;