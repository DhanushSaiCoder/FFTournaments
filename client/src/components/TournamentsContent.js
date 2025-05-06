import React from 'react';
import "../styles/TournamentsContent.css"


// SAMPLE DATA FOR TOURNAMENTS CONTENT
const tournamentsData = [
    {
        _id: "78sdf5s7adf8sfa98sd7f",
        name: "TOURNAMENT 1",
        participants: 50,
        prizePool: "$5000",
        endDate: "2023-10-01",
        startDate: "2023-09-01"
    },
    {
        _id: "s8f8s7fs9d8f7sd8f9asd",
        name: "TOURNAMENT 2",
        participants: 30,
        prizePool: "$3000",
        endDate: "2023-11-01",
        startDate: "2023-10-01"
    },
    // Add more sample data as needed
];

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
