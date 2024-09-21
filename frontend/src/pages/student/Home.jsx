import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const StudentHome = () => {
  return (
    <div className="home-container">
      <div className="intro-text">
        <h1>Welcome</h1>
      </div>

      <div className="main-content">
        <div className="left-container">
          <h2>User Profile</h2>
          <p>First Name Last Name</p>
          <p>Email</p>
          <p>School</p>
        </div>

        <div className="right-container">
          <h2>Lessons</h2>
          <ul className="links-list">
            <li><Link to="/link1">Personal Finance</Link></li>
            <li><Link to="/link2">What is a stock?</Link></li>
            <li><Link to="/link3">Volatility and Diversification</Link></li>
            <li><Link to="/link4">What is a bond?</Link></li>
            <li><Link to="/link5">Mutual funds/ETFs</Link></li>
            <li><Link to="/link6">Compound Interest</Link></li>
            <li><Link to="/link7">Personal Finance II</Link></li>
            <li><Link to="/link8">Capstone Project</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;