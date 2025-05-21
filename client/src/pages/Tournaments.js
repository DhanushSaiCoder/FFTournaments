import React from 'react';
import "../styles/Tournaments.css";
import TournamentsHeroSection from '../components/TournamentsHeroSection';
import SectionDivider from './../components/SectionDivider';
import TournametsContent from '../components/TournamentsContent';
import { useAuth } from './../hooks/useAuth';

const Tournaments = () => {
    const { isLoggedIn, user, logout } = useAuth()

    return (
        <div className='Tournaments'>
            <TournametsContent />
        </div>
    );
}

export default Tournaments;
