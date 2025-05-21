export async function fetchTournaments() {
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
        return result
    } catch (err) {
        console.error(`Error fetching tournaments:`, err);
        alert(`Error: ${err.message}`);
    }
}

export async function deleteTournament(id) {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/tournaments/` + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) throw new Error(`Failed to DELETE tournaments`);

        const result = await response.json();
        return result
    } catch (err) {
        console.error(`Error deleting tournament:`, err);
        alert(`Error: ${err.message}`);
    }
}