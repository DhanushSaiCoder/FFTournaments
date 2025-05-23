import React, { useState, useEffect } from 'react';
import '../styles/TournamentsContent.css';
import { useNavigate } from 'react-router-dom';
import { fetchTournaments } from '../services/tournamentService';

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


    //fetch Tournaments
    useEffect(() => {
        const loadTournaments = async () => {
            try {
                const data = await fetchTournaments();
                setTournamentsData(data);
            } catch (err) {
                console.error('Failed to load tournaments:', err);
            }
        };
        loadTournaments();
    }, []);

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
                                    <td>₹{t.maxPrizePool}/-</td>
                                    <td>{new Intl.DateTimeFormat('en-IN').format(new Date(t.endDate))}</td>
                                </>
                            )}
                            {activeTab === 'upcoming' && (
                                <>
                                    <td>{t.maxPlayers}</td>
                                    <td>₹{t.maxPrizePool}/-</td>
                                    <td>
                                        {new Intl.DateTimeFormat('en-IN', {
                                            dateStyle: 'short',
                                            timeStyle: 'short',
                                        }).format(new Date(t.startDateTime))}
                                    </td>
                                </>
                            )}
                            {activeTab === 'completed' && (
                                <>
                                    <td>{t.participants}</td>
                                    <td>₹{t.maxPrizePool}/-</td>
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
