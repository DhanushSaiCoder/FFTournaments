import React from 'react';
import sampleTournamentData from '../sampleData/sampleTournamentData';


const TournamentDetailsContent = () => {
    console.log(sampleTournamentData);
    return (
        <div className="tournamentDetailsContentContainer">
            <div className='tournamentDetailsContent'></div>
        </div>
    );
}

export default TournamentDetailsContent;
