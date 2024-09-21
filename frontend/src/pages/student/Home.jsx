import React from 'react'
import { Link } from 'react-router-dom';

import './Home.css';

const StudentHome = () => {
  return (
    <div className="home-container">
      <div className="intro-text">
        <h1>Welcome to the Home Page</h1>
      </div>

      <div className="main-content">
        <div className="left-container">
          <h4>First Name Last Name</h4>
          <h4>Email</h4>
          <h4>School</h4>
          <h4>Tutors</h4>
        </div>

        <div className="right-container">
          <ul className="links-list">
            <h2>Lessons</h2>
            <li><Link to="/link1">Personal Finance</Link></li>
            <li><Link to="/link2">What is a stock?</Link></li>
            <li><Link to="/link3">Volatility and Diversification</Link></li>
            <li><Link to="/link4">What is a bond?</Link></li>
            <li><Link to="/link5">Mutual Funds/ETFs</Link></li>
            <li><Link to="/link6">Compound Interest/Dollar-cost Averaging</Link></li>
            <li><Link to="/link7">Personal Finance II</Link></li>
            <li><Link to="/link8">Capstone Project</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentHome