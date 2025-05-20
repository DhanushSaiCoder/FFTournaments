import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Checkbox, Snackbar, Alert, Typography, Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from './../hooks/useAuth';
import "../styles/ManagePopTournaments.css"
import Login from './../pages/Login';

const ManagePopularTournaments = () => {
    const { isAdmin } = useAuth()
    const [tournaments, setTournaments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

    // Fetch all tournaments on mount
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tournaments`);
                if (!res.ok) throw new Error('Failed to fetch tournaments');
                const data = await res.json();
                setTournaments(data);
            } catch (err) {
                console.error(err);
                setSnack({ open: true, message: err.message, severity: 'error' });
            }
        };
        fetchTournaments();
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle toggle of isPopular checkbox
    const handleTogglePopular = async (tournamentId) => {
        // Optimistic UI update
        setTournaments((prev) =>
            prev.map((t) =>
                t._id === tournamentId ? { ...t, isPopular: !t.isPopular } : t
            )
        );

        const toggled = tournaments.find((t) => t._id === tournamentId)?.isPopular;
        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/tournaments/${tournamentId}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isPopular: !toggled }),
                }
            );
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to update');
            }
            setSnack({ open: true, message: 'Updated successfully', severity: 'success' });
        } catch (err) {
            console.error(err);
            console.log(err);
            // Revert on error
            setTournaments((prev) =>
                prev.map((t) =>
                    t._id === tournamentId ? { ...t, isPopular: toggled } : t
                )
            );
            setSnack({ open: true, message: err.message, severity: 'error' });
        }
    };

    // Filter tournaments by name
    const filtered = tournaments.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="ManagePopTournamentsContainer">
            <div className='ManagePopTournamentsContent'>

                <Box p={4} >
                    <Typography variant="h4" gutterBottom>
                        Manage Popular Tournaments
                    </Typography>
                    <TextField
                        label="Search by name"
                        variant="filled"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{
                            style: {
                                color: '#fff',
                                backgroundColor: '#1e1e1e',
                                borderRadius: 4,
                            },
                        }}
                        sx={{
                            '& .MuiFilledInput-root': {
                                backgroundColor: '#1e1e1e',
                            },
                            '& .MuiFilledInput-root:hover': {
                                backgroundColor: '#2a2a2a',
                            },
                            '& .MuiFilledInput-root.Mui-focused': {
                                backgroundColor: '#333',
                            },
                        }}
                    />


                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                },
                            }}>
                                <TableCell sx={{ color: '#fff', backgroundColor: '#121212' }}>Name</TableCell>
                                <TableCell sx={{ color: '#fff', backgroundColor: '#121212' }} align="center">Popular</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filtered.map((t) => (
                                <TableRow sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                }} key={t._id}>
                                    <TableCell sx={{ color: '#fff', backgroundColor: '#121212' }}>
                                        <Link to={`/tournament/${t._id}`} style={{ textDecoration: 'none' }}>
                                            {t.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell sx={{ color: '#fff', backgroundColor: '#121212' }} align="center">
                                        <Checkbox
                                            checked={!!t.isPopular}
                                            onChange={() => handleTogglePopular(t._id)}
                                            inputProps={{ 'aria-label': 'toggle popular' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Snackbar
                        open={snack.open}
                        autoHideDuration={3000}
                        onClose={() => setSnack((s) => ({ ...s, open: false }))}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={() => setSnack((s) => ({ ...s, open: false }))}
                            severity={snack.severity}
                            sx={{ width: '100%', backgroundColor: "#d4d4d4", color: "black" }}
                        >
                            {snack.message}
                        </Alert>
                    </Snackbar>
                </Box>
            </div>
        </div>


    );
};

export default ManagePopularTournaments;