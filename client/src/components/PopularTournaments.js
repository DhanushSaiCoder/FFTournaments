import React from 'react';
import "../styles/PopularTournaments.css";
import SectionDivider from './SectionDivider';

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
    }
]

const PopularTournaments = () => {
    return (
        <div>
            <SectionDivider text="POPULAR TOURNAMENTS" />
            {
                data.map((tournament, index) => (
                    <div className='popularTournamentsContent'>
                        <div className='tournamentDetailsDiv'>
                            <div className='tHeadingsDiv'>
                                <h3 className='tFreq'><i>{tournament.frequency.toUpperCase()}</i></h3>
                                <h2 className='tName'><i>{tournament.name.toUpperCase()}</i></h2>
                            </div>
                            <div className='tDetailsDiv'>
                                <ul>
                                    {tournament.details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                            <button className='learnMoreBtn'>Learn More</button>
                        </div>
                        <div className='pricingDetailsDiv'></div>
                    </div>
                ))
            }

        </div>
    );
}

export default PopularTournaments;
