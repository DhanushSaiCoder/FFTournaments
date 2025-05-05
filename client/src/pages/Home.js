import React from 'react';
import "../styles/Home.css";
import HeroSection from '../components/HeroSection';
import PopularTournaments from '../components/PopularTournaments';
const Home = () => {
    return (
        <div className='Home'>
           <HeroSection />
           <PopularTournaments />
        </div>
    );
}

export default Home;
