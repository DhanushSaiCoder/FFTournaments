import React from 'react';

const Rankings = () => {
    return (
        <div>
            <h1>Rankings</h1>
            <p>Here you can find the rankings of all players.</p>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example data, replace with actual data from your API */}
                    <tr>
                        <td>1</td>
                        <td>Player 1</td>
                        <td>1000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Player 2</td>
                        <td>900</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
}

export default Rankings;
