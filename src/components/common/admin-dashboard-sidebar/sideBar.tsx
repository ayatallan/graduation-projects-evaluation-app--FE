import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css'; // Import the CSS file for styling

const SideBar: React.FC = () => {
  return (
    <nav className="sidebar">
      <Link to="/AdminDashboard/StudentsPage">Students Page</Link>
      <Link to="/AdminDashboard/InstructorsPage">Instructors Page</Link>
      <Link to="/AdminDashboard/GroupsAdminPage">Groups Page</Link>
      <Link to="/AdminDashboard/MajorsAdminPage">Majors Admin Page</Link>
      <Link to="/AdminDashboard/RubricsAdminPage"> Rubrics Admin Page</Link>
    </nav>
  );
};

export default SideBar;