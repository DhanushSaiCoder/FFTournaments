import React from 'react';
import "../styles/Footer.css";
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation()
    const validRoutes = ["/", "/tournament", "/register", "/rankings", "/contactUs", "/profile", "/settings"]
    // if the pathname do not start with the any of thee valid routes do not show header.
    const shouldShowFooter = location.pathname === "/" || validRoutes.some(route =>
        route != "/" && location.pathname.startsWith(route)
    );

    if (!shouldShowFooter) return null;

    return (
        <div className='Footer'>
            <div className='footerNavLinksDiv'>
                <p><a href="/">HOME</a></p>
                <p><a href="/help">HELP</a></p>
                <p><a href="/contactUs">CONTACT US</a></p>
                <p><a className="logOutFooterLink">LOG OUT</a></p>

            </div>

            <div className="footerLastDiv">
                <a href="/termsAndConditions">Terms & Conditions</a> <a>|</a>
                <a href="/message">Message from developers</a>

            </div>
            <p className='copyright'>© FFTournments 2025 | BY AN APT STUDENT</p>

        </div>
    );
}

export default Footer;
