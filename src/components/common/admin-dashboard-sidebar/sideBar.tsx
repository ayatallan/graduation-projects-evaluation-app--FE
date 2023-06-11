import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css'; // Import the CSS file for styling

const SideBar: React.FC = () => {
  return (
    <nav className="sidebar">
      <Link to="/AdminDashboard/StudentsPage">Students Page</Link>
      

    </nav>
  );
};

export default SideBar;