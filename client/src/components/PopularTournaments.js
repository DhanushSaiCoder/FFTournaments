import React from 'react';
import "../styles/PopularTournaments.css";
import SectionDivider from './SectionDivider';
import App from './../App';
import PricingChart from './PricingChart';

const data = [
    {
        _id: "askdjk2lek3kl4n34j34kj34n234h2kj34lk5456jb",
        name: "APT FF CHAMPIONSHIP",
        frequency: "Weekly",
        details: [
            "Players are divided into multiple rooms ( 20 - 48 players per room).",
            "Winners of each BR room battle 1 v 1 in CS match(s).",
            "The Ultimate winner is crowned the APT FF Champion."
        ],
        prizes: {
            first: "₹1000",
            second: "₹500",
            third: null,
        },
        prizeDetails: ["The more players join, the bigger the prize pool!", "No kill rewards—100% of the prize pool goes to the winners!"],
        prizePerKill: "₹10",
        entryFee: "₹50",
        maxPlayers: 48,
        date: "2023-10-01",
        time: "10:00 AM",
    },
    {
        _id: "askdjk2lek3kl4n34j34kj34n234h2kj34lk5456jb",
        name: "DAILY BR TOURNAMENT",
        frequency: "Daily",
        details: [
            "Players are divided into multiple rooms ( 20 - 48 players per room).",
            "Winners of each BR room battle 1 v 1 in CS match(s).",
            "The Ultimate winner is crowned the APT FF Champion."
        ],
        prizes: {
            first: "₹1000",
            second: "₹500",
            third: "₹250",
        },
        prizePerKill: "₹10",
        prizeDetails: ["The more players join, the bigger the prize pool!", "No kill rewards—100% of the prize pool goes to the winners!"],
        entryFee: "₹50",
        maxPlayers: 48,
        date: "2023-10-01",
        time: "10:00 AM",
    },
    {
        _id: "bnsd8f7sd9f8s7df9s8df7s9df8s7df9s8df7",
        name: "ULTIMATE FF SHOWDOWN",
        frequency: "Monthly",
        details: [
            "Players compete in a series of BR matches (50 players per room).",
            "Top 10 players from each room advance to the final battle.",
            "The last player standing in the final match is crowned the Ultimate FF Champion."
        ],
        prizes: {
            first: "₹5000",
            second: "₹3000",
            third: "₹1000",
        },
        prizePerKill: "₹20",
        prizeDetails: ["Higher kill count increases your earnings!", "Top 3 winners also get exclusive in-game rewards!"],
        entryFee: "₹100",
        maxPlayers: 100,
        date: "2023-11-15",
        time: "5:00 PM",
    }

]

const oddGradient = {
    background: "linear-gradient(90deg, #54ff98, #3ee777)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    
}

const PopularTournaments = () => {
    return (
        <div className='popularTournamentsContainer'>
            <SectionDivider text="POPULAR TOURNAMENTS" />
            {
                data.map((tournament, index) => (
                    <div key={index} style={index % 2 != 0 ? { backgroundColor: "#40ec792d" } : {}} className='popularTournamentsContent'>


                        {/* render only if the index is an odd */}
                        {index % 2 != 0 && (
                            <PricingChart tournament={tournament} />
                        )}

                        {/* actual tournament data */}
                        <div className='tournamentDetailsDiv'>
                            <div className='tHeadingsDiv'>
                                <h3 style={index % 2 != 0 ? oddGradient : {}} className='tFreq'><i>{tournament.frequency.toUpperCase()}</i></h3>
                                <h2 style={index % 2 != 0 ? oddGradient : {}} className='tName'><i>{tournament.name.toUpperCase()}</i></h2>
                            </div>
                            <div className='tDetailsDiv'>
                                <ul>
                                    {tournament.details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                            <button style={index % 2 != 0 ? { backgroundColor: "#224a35", color: "#52fb94" } : {}} className='learnMoreBtn'>Learn More</button>
                        </div>


                        {/* render if the index is an even */}
                        {index % 2 === 0 && (
                            <PricingChart tournament={tournament} />
                        )}

                    </div>
                ))
            }
            <a className='showMoreLink' href="/tournaments">Show More</a>
        </div>
    );
}

export default PopularTournaments;
