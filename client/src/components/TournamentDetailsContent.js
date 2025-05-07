import React from 'react';
import data from '../sampleData/sampleTournamentData';
import '../styles/TournamentDetailsContent.css';

const TournamentDetailsContent = () => {
    console.log(data);
    return (
        <div className="tournamentDetailsContentContainer">
            <div className='tournamentDetailsContent'>

                {/* TOURNAMENT DETAILS IN TDC */}
                <div className='tDataAndPricesDiv'>
                    <div className='tournamentDetailsInTDC'>
                        <div className="nameAndFrequencyDiv">
                            <h3>{data.frequency.toUpperCase()}</h3>
                            <h2>{data.name}</h2>
                        </div>
                        <div className='tagsDiv'>
                            {data.tags.map((tag, index) => (
                                <div className='tag' key={index}>
                                    <p>{tag}</p>
                                </div>
                            ))}
                        </div>
                        <div className='threeDetailsDiv'>
                            {data.details.map((detail, index) => (
                                <div className='detail' key={index}>
                                    <p>• {detail}</p>
                                </div>
                            ))}
                        </div>
                        <div className="entryFeeAndRegisterNowBtnDiv">
                            <p>Entry Fee: ₹{data.entryFee}/-</p>
                            <button className='registerNowBtn'>Register Now</button>
                        </div>
                    </div>
                    <div className='tournamentPricesInTDC'>

                    </div>
                </div>


                {/* TOURNAMENT PRICING DETAILS IN TDC */}
                <div className='tournamentTimerDiv'>

                </div>

            </div>
        </div>
    );
}

export default TournamentDetailsContent;
