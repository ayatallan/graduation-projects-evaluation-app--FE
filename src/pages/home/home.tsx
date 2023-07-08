import React from 'react';
import './HomePage.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <p>You can start the evaluate process now :</p>
      <nav>
        <Link className='LinkClass' to="/groups">Groups</Link>
       
        <Link className='LinkClass'  to="/report">Report</Link>
      </nav>
    </div>
  );
};

export default HomePage;
