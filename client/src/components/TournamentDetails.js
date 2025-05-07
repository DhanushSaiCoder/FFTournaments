import React from 'react';
import "../styles/TournamentDetails.css"; // Import your CSS file for styling
import BackButton from './BackButton';
import TournamentDetailsContent from './TournamentDetailsContent';
import TournamentDetialsImpInfo from './TournamentDetialsImpInfo';
import SectionDivider from './SectionDivider';
import data from '../sampleData/sampleTournamentData';


const TournamentDetails = () => {
    return (
        <div className="tournamentDetails">
            <BackButton />
            <TournamentDetailsContent data={data} />
            <SectionDivider text="IMPORTANT INFORMATION"/>

            <TournamentDetialsImpInfo data={data} />
        </div>
    );
}

export default TournamentDetails;
