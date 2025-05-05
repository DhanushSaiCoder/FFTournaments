import React from 'react';
import "../styles/PopularTournaments.css";
import SectionDivider from './SectionDivider';
const PopularTournaments = () => {
    return (
        <div>
            <SectionDivider text="POPULAR TOURNAMENTS"/>
            <h2>Popular Tournaments</h2>
            <div className="tournament-list">
                <div className="tournament-item">
                    <h3>Tournament 1</h3>
                    <p>Date: 2023-10-01</p>
                    <p>Prize Pool: $1000</p>
                </div>
                <div className="tournament-item">
                    <h3>Tournament 2</h3>
                    <p>Date: 2023-10-15</p>
                    <p>Prize Pool: $2000</p>
                </div>
                <div className="tournament-item">
                    <h3>Tournament 3</h3>
                    <p>Date: 2023-11-01</p>
                    <p>Prize Pool: $1500</p>
                </div>
            </div>
        </div>
    );
}

export default PopularTournaments;
