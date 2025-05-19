import React, { useState, useEffect } from 'react';
import '../styles/TournamentsContent.css';
import { useNavigate } from 'react-router-dom';

// SAMPLE DATA FOR TOURNAMENTS CONTENT
// const tournamentsData = [
//     {
//         _id: 'a1b2c3d4e5f6g7h8i9j0',
//         name: 'ULTIMATE BR SHOWDOWN',
//         participants: 100,
//         prizePool: '$10000',
//         endDate: '2023-12-01',
//         startDate: '2023-11-01',
//     },
//     {
//         _id: 'z9y8x7w6v5u4t3s2r1q0',
//         name: 'CHAMPIONSHIP CLASH',
//         participants: 75,
//         prizePool: '$7500',
//         endDate: '2024-01-15',
//         startDate: '2023-12-15',
//     },
//     {
//         _id: 'p0o9i8u7y6t5r4e3w2q1',
//         name: 'BATTLE ROYALE LEGENDS',
//         participants: 60,
//         prizePool: '$6000',
//         endDate: '2024-02-01',
//         startDate: '2024-01-01',
//     },
//     {
//         _id: 'm1n2b3v4c5x6z7a8s9d0',
//         name: 'SURVIVAL OF THE FITTEST',
//         participants: 80,
//         prizePool: '$8000',
//         endDate: '2024-03-01',
//         startDate: '2024-02-01',
//     },
//     {
//         _id: 'q1w2e3r4t5y6u7i8o9p0',
//         name: 'THE FINAL STAND',
//         participants: 90,
//         prizePool: '$9000',
//         endDate: '2024-04-01',
//         startDate: '2024-03-01',
//     },
// ];

const TABS = ['upcoming', 'ongoing', 'completed'];

export default function TournamentsContent() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [tournamentsData, setTournamentsData] = useState([])

    // categorize by date
    const now = new Date();
    const categorized = {
        ongoing: tournamentsData.filter(
            t => new Date(t.startDate) <= now && now <= new Date(t.endDate)
        ),
        upcoming: tournamentsData.filter(
            t => new Date(t.startDate) > now
        ),
        completed: tournamentsData.filter(
            t => new Date(t.endDate) < now
        ),
    };

    const data = categorized[activeTab];

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/tournaments`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) throw new Error(`Failed to FETCH tournaments`);

                const result = await response.json();
                console.log("data: ", result)
                setTournamentsData(result);
            } catch (err) {
                console.error(`Error fetching tournaments:`, err);
                alert(`Error: ${err.message}`);
            }
        };

        fetchTournaments();
    }, [])

    return (
        <div className="tournamentsContent">
            {/* Tab Buttons */}
            <div className="tabsOuterDiv">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tabButton ${activeTab === tab ? 'activeTab' : ''}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
                <span className="indicator" />
            </div>


            {/* Dynamic Table */}
            <table className="tournamentsTable">
                <thead>
                    <tr>
                        <th>TOURNAMENT NAME</th>
                        {activeTab === 'ongoing' && <><th>PARTICIPANTS</th><th>PRIZE POOL</th><th>END DATE</th></>}
                        {activeTab === 'upcoming' && <><th>PARTICIPANTS</th><th>PRIZE POOL</th><th>START DATE</th></>}
                        {activeTab === 'completed' && <><th>PARTICIPANTS</th><th>PRIZE POOL</th><th>START DATE</th><th>END DATE</th></>}
                    </tr>
                </thead>
                <tbody>
                    {data.map(t => (
                        <tr key={t._id} onClick={() => navigate(`/tournament/${t._id}`)}>
                            <td className="tournamentName">{t.name}</td>
                            {activeTab === 'ongoing' && (
                                <>
                                    <td>{t.maxPlayers}</td>
                                    <td>{t.maxPrizePool}</td>
                                    <td>{t.endDate}</td>
                                </>
                            )}
                            {activeTab === 'upcoming' && (
                                <>
                                    <td>{t.maxPlayers}</td>
                                    <td>{t.maxPrizePool}</td>
                                    <td>{t.startDate}</td>
                                </>
                            )}
                            {activeTab === 'completed' && (
                                <>
                                    <td>{t.participants}</td>
                                    <td>{t.maxPrizePool}</td>
                                    <td>{t.startDate}</td>
                                    <td>{t.endDate}</td>
                                </>
                            )}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={activeTab === 'completed' ? 5 : 4} className="comingSoonRow">
                                <b>No {activeTab} tournaments</b>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
