import React from 'react';
import "../styles/TournamentsContent.css"
const TournamentsContent = () => {
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
                    {/* Sample data */}
                    {Array.from({ length: 10 }, (_, index) => (
                        <tr key={index}>
                            <td className="tournamentName">TOURNAMENT {index + 1}</td>
                            <td>{Math.floor(Math.random() * 100) + 1}</td>
                            <td>${(Math.random() * 10000).toFixed(2)}</td>
                            <td>{new Date().toLocaleDateString()}</td>
                            <td>{new Date().toLocaleDateString()}</td>

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
