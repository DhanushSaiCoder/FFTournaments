import React from 'react';
import "../styles/TournamentsContent.css"

import { useNavigate } from 'react-router-dom';

// SAMPLE DATA FOR TOURNAMENTS CONTENT
const tournamentsData = [

    {
        _id: "a1b2c3d4e5f6g7h8i9j0",
        name: "ULTIMATE BR SHOWDOWN",
        participants: 100,
        prizePool: "$10000",
        endDate: "2023-12-01",
        startDate: "2023-11-01"
    },
    {
        _id: "z9y8x7w6v5u4t3s2r1q0",
        name: "CHAMPIONSHIP CLASH",
        participants: 75,
        prizePool: "$7500",
        endDate: "2024-01-15",
        startDate: "2023-12-15"
    },
    {
        _id: "p0o9i8u7y6t5r4e3w2q1",
        name: "BATTLE ROYALE LEGENDS",
        participants: 60,
        prizePool: "$6000",
        endDate: "2024-02-01",
        startDate: "2024-01-01"
    },
    {
        _id: "m1n2b3v4c5x6z7a8s9d0",
        name: "SURVIVAL OF THE FITTEST",
        participants: 80,
        prizePool: "$8000",
        endDate: "2024-03-01",
        startDate: "2024-02-01"
    },
    {
        _id: "q1w2e3r4t5y6u7i8o9p0",
        name: "THE FINAL STAND",
        participants: 90,
        prizePool: "$9000",
        endDate: "2024-04-01",
        startDate: "2024-03-01"
    }
];

const TournamentsContent = () => {
    const navigate = useNavigate();
    return (
        <div className='tournamentsContent'>
            {/* table of tournaments data */}
            <table className='tournamentsTable'>
                <thead>
                    <tr>
                        <th>TOURNAMENT NAME</th>
                        <th>PARTICIPANTS</th>
                        <th>PRIZE POOL</th>
                        <th>END DATE</th>
                        <th>START DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render rows by mapping through the sample data */}
                    {tournamentsData.map((tournament) => (
                            <tr onClick={() => { 
                                navigate(`/tournament/${tournament._id}`)  // Navigate to tournament details page
                            }} key={tournament._id}>
                                <td className="tournamentName">{tournament.name}</td>
                                <td>{tournament.participants}</td>
                                <td>{tournament.prizePool}</td>
                                <td>{tournament.endDate}</td>
                                <td>{tournament.startDate}</td>
                            </tr>
                     ))}
                    <tr key="xyz">
                        <td colSpan={5} className="comingSoonRow">
                            <b>MORE TOURNAMENTS COMING SOON</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TournamentsContent;
