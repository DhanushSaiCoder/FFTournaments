import React from 'react';
import data from '../sampleData/sampleTournamentData';
import '../styles/TournamentDetailsContent.css';
import PricingChart from './PricingChart';

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
                        <div className="detailsBox statsDiv">
                            <div className='stat'>
                                <p className='statHeading'>GAMES MODE: </p>
                                <p className='statValue'>{data.gameMode.toUpperCase()}</p>
                            </div>
                            <div className='stat'>
                                <p className='statHeading'>MAX PLAYERS: </p>
                                <p className='statValue'>{data.maxPlayers}</p>
                            </div>
                            <div className='stat'>
                                <p className='statHeading'>MAX PRIZE POOL: </p>
                                <p className='statValue'>₹{data.maxPrizePool}/-</p>
                            </div>
                            <div className='stat'>
                                <p className='statHeading'>PRIZE PER KILL: </p>
                                <p className='statValue'>₹{data.prizePerKill}/-</p>
                            </div>
                        </div>

                        <div className="entryFeeAndRegisterNowBtnDiv">
                            <p className='entryFee'>Entry Fee:
                                <span className='en tryFee prevEntryFee'>
                                    <s>₹{Math.ceil((80 / 100 * data.entryFee) + data.entryFee)}/-</s>
                                </span>
                                <span className='entryFee feeValue'>₹{data.entryFee}/-</span>
                            </p>
                            <div className="registerNowBtnDiv">

                                <button className='registerNowBtn'>Register Now</button>
                                <button className='moreInfoBtn'>More Info</button>
                            </div>
                        </div>
                    </div>


                    {/* TOURNAMENT PRICING DETAILS IN TDC */}
                    <div className='tournamentPricesInTDC'>
                            <PricingChart tournament={data} />
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
