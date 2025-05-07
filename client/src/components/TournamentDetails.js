import React from 'react';
import "../styles/TournamentDetails.css"; // Import your CSS file for styling
import BackButton from './BackButton';
import TournamentDetailsContent from './TournamentDetailsContent';
import TournamentDetialsImpInfo from './TournamentDetialsImpInfo';


const TournamentDetails = () => {
    return (
        <div className="tournamentDetails">
            <BackButton />
            <TournamentDetailsContent />
            <TournamentDetialsImpInfo />
        </div>
    );
}

export default TournamentDetails;
