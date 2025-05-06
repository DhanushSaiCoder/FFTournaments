import React from 'react';
import "../styles/TournamentsHeroSection.css";

const TournamentsHeroSection = () => {
    return (
        <div className="tournamentsHeroSection">
            <h1>Tournaments</h1>
            <p>Join our tournaments and compete with players from around the world!</p>
            <button className="btn btn-primary">Join Now</button>
            <div className="tournament-list">
                <h2>Upcoming Tournaments</h2>
                <ul>
                    <li>Tournament 1 - Date: 2023-10-01</li>
                    <li>Tournament 2 - Date: 2023-10-15</li>
                    <li>Tournament 3 - Date: 2023-11-01 </li>
                </ul>
            </div>
        </div>
    );
}

export default TournamentsHeroSection;
