import React from 'react';

const sampleTournamentData = {
    _id: "askdjk2lek3kl4n34j34kj34n234h2kj34lk5456jb",
    frequency: "Weekly",
    name: "APT FF CHAMPIONSHIP",
    tags: ["Weekly Once", "Kill Rewards + Winning Prize"],
    details: [
        "Players are divided into multiple rooms ( 20 - 48 players per room).",
        "Winners of each BR room battle 1 v 1 CS match(s).",
        "The Ultimate winner is crowned the APT FF Champion."
    ],
    gameMode: "BR",
    maxPrizePool: 1000,
    maxPlayers: 48,
    prizePerKill: 15,
    entryFee: 25,
    startDate: "2023-10-01",
    startTime: "10:00 AM",
    startDateTime: "2023-10-01T10:00:00",
    prizes: {
        first: "500",
        second: "300",
        third: null,
    },
    prizeDetails: [
        "The more players join, the bigger the prize pool!",
        "No kill rewards—100% of the prize pool goes to the winners!"
    ],
    importantInformation: {
        details: [
            "Important information about the tournament",
            "More important information about the tournament",
            "Even more important information about the tournament"
        ],
        rules: [
            "Rule 1",
            "Rule 2",
            "Rule 3"
        ],
        howToJoin: [
            "How to join the tournament",
            "More information on how to join",
            "Even more information on how to join"
        ],
        howToClaimPrizeMoney: [
            "How to claim the prize money",
            "More information on how to claim the prize money",
            "Even more information on how to claim the prize money"
        ]
    }
}

const TournamentDetailsContent = () => {
    return (
        <div>
            <h1>Tournament Details</h1>
            <div className="tournamentDetailsContent">
                <h2>{sampleTournamentData.name}</h2>
                <p>Frequency: {sampleTournamentData.frequency}</p>
                <p>Game Mode: {sampleTournamentData.gameMode}</p>
                <p>Max Players: {sampleTournamentData.maxPlayers}</p>
                <p>Entry Fee: ₹{sampleTournamentData.entryFee}</p>
                <p>Prize Per Kill: ₹{sampleTournamentData.prizePerKill}</p>
                <p>Start Date: {sampleTournamentData.startDate}</p>
                <p>Start Time: {sampleTournamentData.startTime}</p>
                <h3>Details</h3>
                <ul>
                    {sampleTournamentData.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
                <h3>Prizes</h3>
                <ul>
                    {Object.entries(sampleTournamentData.prizes).map(([key, value]) => (
                        value && <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: ₹{value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TournamentDetailsContent;
