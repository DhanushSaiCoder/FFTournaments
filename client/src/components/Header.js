import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaGear } from "react-icons/fa6";
import validRoutes from './../sampleData/validRoutes';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';
import { getToken } from './../utils/auth.util';
import useNavSound from '../hooks/useNavSound';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const playClick = useNavSound();

  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) navigate("/signup");
  }, [isLoggedIn, navigate]);

  const isAdmin = user?.role === "admin";

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const shouldShowHeader = location.pathname === "/" || validRoutes.some(route =>
    route !== "/" && location.pathname.startsWith(route)
  );

  if (!shouldShowHeader) return null;

  return (
    <div className="header">
      <div onClick={handleLogoClick} className='logoDiv'></div>

      <div className='navLinksDiv'>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link onClick={playClick} to="/">HOME</Link>
            </li>
            <li className={location.pathname.startsWith('/tournament') || location.pathname.startsWith("/register") ? 'active' : ''}>
              <Link onClick={playClick}  to="/tournaments">TOURNAMENTS</Link>
            </li>
            <li className={location.pathname === '/rankings' ? 'active' : ''}>
              <Link onClick={playClick}  to="/rankings">RANKINGS</Link>
            </li>
            <li className={location.pathname === '/contactUs' ? 'active' : ''}>
              <Link  onClick={playClick} to="/contactUs">CONTACT US</Link>
            </li>
            {isAdmin && (
              <li className={location.pathname.startsWith('/admin') ? 'active' : ''}>
                <Link onClick={playClick}  to="/admin/manageTournaments">ADMIN PANEL</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {isLoggedIn && (
        <div className='iconsDiv'>
          <Link onClick={playClick}  to="/profile">
            <CgProfile className='userIcon' size={30} />
          </Link>
          <Link onClick={playClick}  to="/settings">
            <FaGear className='settingsIcon' size={30} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
