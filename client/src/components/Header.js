import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css'; // Optional: Add styles for active links

const Header = () => {
  const location = useLocation(); // Get the current location

  return (
    <header>
      <nav>
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/tournaments' ? 'active' : ''}>
            <Link to="/tournaments">Tournaments</Link>
          </li>
          <li className={location.pathname === '/rankings' ? 'active' : ''}>
            <Link to="/rankings">Rankings</Link>
          </li>
          <li className={location.pathname === '/help' ? 'active' : ''}>
            <Link to="/help">Help</Link>
          </li>
          <li className={location.pathname === '/contactUs' ? 'active' : ''}>
            <Link to="/contactUs">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
