import React from 'react';
import "../styles/Tournaments.css";
import TournamentsHeroSection from '../components/TournamentsHeroSection';
import SectionDivider from './../components/SectionDivider';
import TournametsContent from '../components/TournamentsContent';

const Tournaments = () => {
    return (
        <div className='Tournaments'>
            <TournamentsHeroSection />
            <SectionDivider text="ALL TOURNAMENTS" />
            <TournametsContent />
        </div>
    );
}

export default Tournaments;
