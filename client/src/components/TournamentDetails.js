import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/TournamentDetails.css"; // Import your CSS file for styling
import BackButton from './BackButton';
import TournamentDetailsContent from './TournamentDetailsContent';
import TournamentDetialsImpInfo from './TournamentDetialsImpInfo';
import SectionDivider from './SectionDivider';
import data from '../sampleData/sampleTournamentData';


const TournamentDetails = () => {
    const [tournamentData, setTournamentData] = useState({})
    const { id } = useParams()


    
    return (
        <div className="tournamentDetails">
            <BackButton />
            <TournamentDetailsContent id={id}/>
            <SectionDivider text="IMPORTANT INFORMATION" />

            <TournamentDetialsImpInfo id={id} />
        </div>
    );
}

export default TournamentDetails;
