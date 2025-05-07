import React from 'react';
import "../styles/TournamentDetails.css"; // Import your CSS file for styling
import BackButton from './BackButton';
import TournamentDetailsContent from './TournamentDetailsContent';
import TournamentDetialsImpInfo from './TournamentDetialsImpInfo';
import SectionDivider from './SectionDivider';


const TournamentDetails = () => {
    return (
        <div className="tournamentDetails">
            <BackButton />
            <TournamentDetailsContent />
            <SectionDivider text="IMPORTANT INFORMATION"/>

            <TournamentDetialsImpInfo />
        </div>
    );
}

export default TournamentDetails;
