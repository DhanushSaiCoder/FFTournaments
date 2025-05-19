import React, { useEffect, useState } from 'react';
import '../styles/TournamentDetailsContent.css';
import PricingChart from './PricingChart';
import TournamentTimer from './TournamentTimer';
import { useNavigate } from 'react-router-dom';

const TournamentDetailsContent = ({ id }) => {
    const navigate = useNavigate();
    const [tournamentData, setTournamentData] = useState(null);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/tournaments/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) throw new Error('Failed to FETCH tournaments');

                const result = await response.json();
                console.log('Fetched tournament Data:', result);
                setTournamentData(result);
            } catch (err) {
                console.error('Error fetching tournaments:', err);
                alert(`Error: ${err.message}`);
            }
        };

        if (id) fetchTournaments();
    }, [id]);

    const handleRegister = () => {
        if (tournamentData?._id) {
            navigate(`/register/${tournamentData._id}`);
        }
    };

    if (!tournamentData) {
        return <div className="loading">Loading tournament details...</div>;
    }

    // Provide defaults to avoid undefined
    const {
        frequency = 'N/A',
        name = 'N/A',
        tags = [],
        details = [],
        gameMode = '',
        maxPlayers = 0,
        maxPrizePool = 0,
        prizePerKill = 0,
        entryFee = 0,
        startDateTime,
    } = tournamentData;

    const originalFee = Math.ceil(entryFee * 1.8);
    const timerStart = startDateTime || new Date().toISOString();

    return (
        <div className="tournamentDetailsContentContainer">
            <div className="tournamentDetailsContent">
                {/* TOURNAMENT DETAILS */}
                <div className="tDataAndPricesDiv">
                    <div className="tournamentDetailsInTDC">
                        <div className="nameAndFrequencyDiv">
                            <h3>{frequency}</h3>
                            <h2>{name}</h2>
                        </div>
                        <div className="tagsDiv">
                            {tags.map((tag, i) => (
                                <div className="tag" key={i}>
                                    <p>{tag}</p>
                                </div>
                            ))}
                        </div>

                        <div className="threeDetailsDiv">
                            {details.map((detail, i) => (
                                <div className="detail" key={i}>
                                    <p>• {detail}</p>
                                </div>
                            ))}
                        </div>

                        <div className="detailsBox statsDiv">
                            <div className="stat">
                                <p className="statHeading">GAMES MODE:</p>
                                <p className="statValue">{gameMode.toUpperCase()}</p>
                            </div>
                            <div className="stat">
                                <p className="statHeading">MAX PLAYERS:</p>
                                <p className="statValue">{maxPlayers}</p>
                            </div>
                            <div className="stat">
                                <p className="statHeading">MAX PRIZE POOL:</p>
                                <p className="statValue">₹{maxPrizePool}/-</p>
                            </div>
                            <div className="stat">
                                <p className="statHeading">PRIZE PER KILL:</p>
                                <p className="statValue">₹{prizePerKill}/-</p>
                            </div>
                        </div>

                        <div className="entryFeeAndRegisterNowBtnDiv">
                            <p className="entryFee">
                                Entry Fee:
                                <span className="prevEntryFee">
                                    <s>₹{originalFee}/-</s>
                                </span>
                                <span className="feeValue">₹{entryFee}/-</span>
                            </p>
                            <div className="registerNowBtnDiv">
                                <button onClick={handleRegister} className="registerNowBtn">
                                    Register Now
                                </button>
                                <button className="moreInfoBtn">More Info</button>
                            </div>
                        </div>
                    </div>

                    {/* PRICING CHART */}
                    <div className="tournamentPricesInTDC">
                        <PricingChart tournament={tournamentData} />
                    </div>
                </div>

                {/* TOURNAMENT TIMER */}
                <div className="tournamentTimerDiv">
                    <TournamentTimer startDateTime={timerStart} />
                </div>
            </div>
        </div>
    );
};

export default TournamentDetailsContent;
