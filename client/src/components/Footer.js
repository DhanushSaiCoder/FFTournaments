import React from 'react';
import "../styles/Footer.css";
const Footer = () => {
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
