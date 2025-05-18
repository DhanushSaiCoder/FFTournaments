import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaGear } from "react-icons/fa6";
import validRoutes from './../sampleData/validRoutes';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';

const Header = () => {
  const { isLoggedIn } = useAuth()
  const location = useLocation(); // Get the current location
  const handleLogoClick = () => {
    window.location.href = '/';
  }

  // if the pathname do not start with the any of thee valid routes do not show header.
  const shouldShowHeader = location.pathname === "/" || validRoutes.some(route =>
    route != "/" && location.pathname.startsWith(route)
  );

  if (!shouldShowHeader) return null;

  return (
    <div className="header">
      <div onClick={handleLogoClick} className='logoDiv'></div>

      <div className='navLinksDiv'>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">HOME</Link>
            </li>
            <li className={location.pathname.startsWith('/tournament') || location.pathname.startsWith("/register") ? 'active' : ''}>
              <Link to="/tournaments">TOURNAMENTS</Link>
            </li>
            <li className={location.pathname === '/rankings' ? 'active' : ''}>
              <Link to="/rankings">RANKINGS</Link>
            </li>
            <li className={location.pathname === '/contactUs' ? 'active' : ''}>
              <Link to="/contactUs">CONTACT US</Link>
            </li>
            {/* <li className={location.pathname === '/help' ? 'active' : ''}>
              <Link to="/help">HELP</Link>
            </li> */}
          </ul>
        </nav>
      </div>

      {isLoggedIn && <div className='iconsDiv'>
        <Link to="/profile">
          <CgProfile className='userIcon' size={30} />
        </Link>
        <Link to="/settings">
          <FaGear className='settingsIcon' size={30} />
        </Link>
      </div>}

    </div >
  );
};

export default Header;
