import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './NavBar.css';
import Logo from '../../Logo.png';

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">
          <Link to="/home" className="brand">
            <img src={Logo} alt="First Generation Investor" className="logo" />
          </Link>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/additionalresources" className="nav-link">Additional Resources</Link>
          </li>
          <li className="nav-item">
            <Link to="/faq" className="nav-link">FAQ</Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default NavBar;