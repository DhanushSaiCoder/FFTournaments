import React from 'react';
import "../styles/Home.css";
import HeroSection from '../components/HeroSection';
import PopularTournaments from '../components/PopularTournaments';
import { useAuth } from './../hooks/useAuth';
import TournamentsHeroSection from '../components/TournamentsHeroSection';
const Home = () => {
    const { isLoggedIn, user, logout } = useAuth();

    console.log(user)
    return (
        <div className='Home'>
            { !isLoggedIn ? <HeroSection /> : <TournamentsHeroSection/>}
            <PopularTournaments />
        </div>
    );
}

export default Home;
