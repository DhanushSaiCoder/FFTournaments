import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css'; // Optional: Add styles for active links
import logo from '../images/Logo.png'; // Import your logo image
const Header = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="header">
      <div className='logoDiv'></div>

      <div className='navLinksDiv'>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">HOME</Link>
            </li>
            <li className={location.pathname === '/tournaments' ? 'active' : ''}>
              <Link to="/tournaments">TOURNAMENTS</Link>
            </li>
            <li className={location.pathname === '/rankings' ? 'active' : ''}>
              <Link to="/rankings">RANKING</Link>
            </li>
            <li className={location.pathname === '/help' ? 'active' : ''}>
              <Link to="/help">HELP</Link>
            </li>
            <li className={location.pathname === '/contactUs' ? 'active' : ''}>
              <Link to="/contactUs">CONTACT US</Link>
            </li>
          </ul>
        </nav>
      </div>

    </div >
  );
};

export default Header;
