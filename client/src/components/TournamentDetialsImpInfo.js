import React ,{useState, useEffect} from 'react';
import '../styles/TournamentDetailsImpInfo.css';

const TournamentDetialsImpInfo = ({ id }) => {
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

    if (!tournamentData) {
        return <div className="loading">Loading tournament details...</div>;
    }

    // const {
    //     frequency = 'N/A',
    //     name = 'N/A',
    //     tags = [],
    //     details = [],
    //     gameMode = '',
    //     maxPlayers = 0,
    //     maxPrizePool = 0,
    //     prizePerKill = 0,
    //     entryFee = 0,
    //     startDateTime,
    // } = tournamentData;
    return (
        <div className='TournamentDetialsImpInfo'>
            <div className="importantInformation">
                <div className='impInfoLeftDiv'>
                    <div className='impInfoDetailsDiv'>
                        <h3 className='impInfoHeadings'><u>DETAILS:</u></h3>
                        <ol className='impInfoDetailsList'>
                            {
                                tournamentData.importantInformation.details.map((detail, index) => (
                                    <li className='impInfoText' key={index}>{detail}</li>
                                ))
                            }
                        </ol>
                    </div>
                    <div className='impInfoRulesDiv'>
                        <h3 className='impInfoHeadings'><u>RULES:</u></h3>
                        <ol className='impInfoDetailsList'>
                            {
                                tournamentData.importantInformation.rules.map((rule, index) => (
                                    <li className='impInfoText' key={index}>{rule}</li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
                <div className='impInfoRightDiv'>
                    <div className='impInfoHowToJoinDiv'>
                        <h3 className='impInfoHeadings'><u>HOW TO JOIN:</u></h3>
                        <ol className='impInfoDetailsList'>
                            {
                                tournamentData.importantInformation.howToJoin.map((rule, index) => (
                                    <li className='impInfoText' key={index}>{rule}</li>
                                ))
                            }
                        </ol>
                    </div>
                    <div className='impInfoHowToClaimPrizeMoneyDiv'>
                        <h3 className='impInfoHeadings'><u>HOW TO CLAIM PRIZE MONEY:</u></h3>
                        <ol className='impInfoDetailsList'>
                            {
                                tournamentData.importantInformation.howToClaimPrizeMoney.map((rule, index) => (
                                    <li className='impInfoText' key={index}>{rule}</li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TournamentDetialsImpInfo;
