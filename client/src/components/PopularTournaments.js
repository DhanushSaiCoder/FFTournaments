import React from 'react';
import "../styles/PopularTournaments.css";
import SectionDivider from './SectionDivider';

const data = [
    {
        _id: "askdjk2lek3kl4n34j34kj34n234h2kj34lk5456jb",
        name: "APT FF CHAMPIONSHIP",
        frequency: "Weekly",
        details: [
            "• Players are divided into multiple rooms ( 20 - 48 players per room).",
            "• Winners of each BR room battle 1 v 1 in CS match(s).",
            "• The Ultimate winner is crowned the APT FF Champion."
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
            "• Players are divided into multiple rooms ( 20 - 48 players per room).",
            "• Winners of each BR room battle 1 v 1 in CS match(s).",
            "• The Ultimate winner is crowned the APT FF Champion."
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
            <h2>Popular Tournaments</h2>
            <div className="tournament-list">
                <div className="tournament-item">
                    <h3>Tournament 1</h3>
                    <p>Date: 2023-10-01</p>
                    <p>Prize Pool: $1000</p>
                </div>
                <div className="tournament-item">
                    <h3>Tournament 2</h3>
                    <p>Date: 2023-10-15</p>
                    <p>Prize Pool: $2000</p>
                </div>
                <div className="tournament-item">
                    <h3>Tournament 3</h3>
                    <p>Date: 2023-11-01</p>
                    <p>Prize Pool: $1500</p>
                </div>
            </div>
        </div>
    );
}

export default PopularTournaments;
