import React, { useState, useEffect } from 'react';
import '../styles/ManageTournaments.css';
import { useNavigate } from "react-router-dom";

import SectionDivider from "../components/SectionDivider";
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TextField, Snackbar, Alert, Typography, Box, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchTournaments, deleteTournament } from "../services/tournamentService";


import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const ManageTournaments = () => {
    const navigate = useNavigate()
    // ─── Snackbar state ───────────────────────────────────────
    const [snack, setSnack] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // ─── Form & edit state ────────────────────────────────────
    const initialFormState = {
        frequency: '',
        name: '',
        tags: [''],
        details: [''],
        gameMode: '',
        maxPrizePool: '',
        maxPlayers: '',
        prizePerKill: '',
        entryFee: '',
        startDate: '',
        endDate: '',
        startTime: '',
        startDateTime: '',
        prizes: { first: '', second: '', third: '' },
        prizeDetails: [''],
        importantInformation: {
            details: [''], rules: [''], howToJoin: [''], howToClaimPrizeMoney: ['']
        }
    };
    const [form, setForm] = useState(initialFormState);
    const [editingId, setEditingId] = useState(null);

    // ─── Tournaments list ─────────────────────────────────────
    const [tournaments, setTournaments] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchTournaments();
                setTournaments(data);
            } catch (err) {
                console.error(err);
                setSnack({ open: true, message: err.message, severity: 'error' });
            }
        })();
    }, []);

    // auto‑compute startDateTime
    useEffect(() => {
        if (form.startDate && form.startTime) {
            setForm(f => ({ ...f, startDateTime: `${f.startDate}T${f.startTime}` }));
        }
    }, [form.startDate, form.startTime]);

    // ─── Delete handler ───────────────────────────────────────
    const deleteTournamentWithId = async (_id) => {
        try {
            await deleteTournament(_id);
            setTournaments(prev => prev.filter(t => t._id !== _id));
            setSnack({ open: true, message: 'Tournament deleted', severity: 'success' });
        } catch (err) {
            console.error(err);
            setSnack({ open: true, message: err.message, severity: 'error' });
        }
    };

    // ─── Edit handler ─────────────────────────────────────────
    const editTournament = (t) => {
        setForm({ ...t, tags: t.tags.length ? t.tags : [''], details: t.details.length ? t.details : [''], prizeDetails: t.prizeDetails.length ? t.prizeDetails : [''] });
        setEditingId(t._id);
    };

    // ─── Form helpers ─────────────────────────────────────────
    const handleChange = e => {
        const { name, value, type } = e.target;
        setForm(f => ({ ...f, [name]: type === 'number' ? Number(value) : value }));
    };
    const handleNested = (group, key, value) => {
        setForm(f => ({
            ...f,
            [group]: { ...f[group], [key]: Number(value) }
        }));
    };
    const handleArrayChange = (field, idx, value) => {
        setForm(f => {
            const arr = [...f[field]];
            arr[idx] = value;
            return { ...f, [field]: arr };
        });
    };
    const addArrayItem = field => {
        setForm(f => ({ ...f, [field]: [...f[field], ''] }));
    };
    const removeArrayItem = (field, idx) => {
        setForm(f => ({
            ...f,
            [field]: f[field].filter((_, i) => i !== idx)
        }));
    };
    const handleInfoArrayChange = (section, idx, value) => {
        setForm(f => ({
            ...f,
            importantInformation: {
                ...f.importantInformation,
                [section]: f.importantInformation[section].map((item, i) => i === idx ? value : item)
            }
        }));
    };
    const addInfoArrayItem = section => {
        setForm(f => ({
            ...f,
            importantInformation: {
                ...f.importantInformation,
                [section]: [...f.importantInformation[section], '']
            }
        }));
    };
    const removeInfoArrayItem = (section, idx) => {
        setForm(f => ({
            ...f,
            importantInformation: {
                ...f.importantInformation,
                [section]: f.importantInformation[section].filter((_, i) => i !== idx)
            }
        }));
    };
    const resetForm = () => {
        setForm(initialFormState);
        setEditingId(null);
    };

    // ─── Submit handler ───────────────────────────────────────
    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.name || !form.startDate || !form.endDate || !form.gameMode) {
            setSnack({ open: true, message: 'Missing required fields', severity: 'error' });
            return;
        }
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/tournaments${editingId ? `/${editingId}` : ''}`;
            const method = editingId ? 'PATCH' : 'POST';
            const body = JSON.stringify(editingId
                ? { ...form, _id: editingId }
                : { ...form, isPopular: false }
            );
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body
            });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            if (editingId) {
                setTournaments(prev => prev.map(t => t._id === editingId ? data.tournament || data : t));
                setSnack({ open: true, message: 'Tournament updated', severity: 'success' });
            } else {
                setTournaments(prev => [...prev, data.tournament || data]);
                setSnack({ open: true, message: 'Tournament created', severity: 'success' });
            }
            resetForm();
        } catch (err) {
            console.error(err);
            setSnack({ open: true, message: err.message, severity: 'error' });
        }
    };

    return (
        <Box p={4} sx={{ color: '#fff', width: "65vw" }}>
            <Typography variant="h4" gutterBottom>Manage Tournaments</Typography>

            {/* Existing tournaments */}
            {tournaments.length != 0 && (<Table sx={{ marginBottom: "20px" }}>
                <TableHead sx={{ backgroundColor: '#222' }}>
                    <TableRow>
                        {['Name', 'Mode', 'Start', 'End', 'Pool', 'Fee', 'Actions'].map(h => (
                            <TableCell key={h} sx={{ color: '#fff' }}>{h}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ color: "#d4d4d4" }}>
                    {tournaments.map(t => (
                        <TableRow key={t._id} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
                            <TableCell
                                sx={{
                                    color: "#d4d4d4",
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }
                                }}
                                onClick={() => navigate(`/tournament/${t._id}`)}
                            >
                                {t.name}
                            </TableCell>

                            <TableCell sx={{ color: "#d4d4d4" }}>{t.gameMode}</TableCell>
                            <TableCell sx={{ color: "#d4d4d4" }}>
                                {new Intl.DateTimeFormat('en-IN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(t.startDateTime))}
                            </TableCell>
                            <TableCell sx={{ color: "#d4d4d4" }}>
                                {new Intl.DateTimeFormat('en-IN').format(new Date(t.endDate))}
                            </TableCell>
                            <TableCell sx={{ color: "#d4d4d4" }}>₹{t.maxPrizePool}</TableCell>
                            <TableCell sx={{ color: "#d4d4d4" }}>{t.entryFee}</TableCell>
                            <TableCell sx={{ color: "#d4d4d4" }}>
                                <Button onClick={() => editTournament(t)}><EditIcon /></Button>
                                <Button onClick={() => deleteTournamentWithId(t._id)}><DeleteIcon sx={{ color: 'red' }} /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>)}

            {/* Snackbar */}
            <Snackbar
                open={snack.open}
                autoHideDuration={3000}
                onClose={() => setSnack(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    variant="standard"
                    severity={snack.severity}
                    onClose={() => setSnack(s => ({ ...s, open: false }))}
                    // 1) white background + black text
                    sx={{ backgroundColor: '#fff', '& .MuiAlert-message': { color: '#000' } }}
                    // 2) map each severity to a black icon
                    iconMapping={{
                        success: <CheckCircleIcon sx={{ color: '#000' }} />,
                        error: <ErrorOutlineIcon sx={{ color: '#000' }} />,
                        warning: <WarningAmberIcon sx={{ color: '#000' }} />,
                        info: <InfoOutlinedIcon sx={{ color: '#000' }} />
                    }}
                    // 3) override the close button with a black ×
                    action={
                        <IconButton
                            aria-label="close"
                            size="small"
                            onClick={() => setSnack(s => ({ ...s, open: false }))}
                            sx={{ color: '#000' }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    {snack.message}
                </Alert>
            </Snackbar>




            <SectionDivider text={editingId ? "UPDATE TOURNAMENT" : "NEW TOURNAMENT"} />

            {/* Form */}
            <form className="ManageTournaments__form" onSubmit={handleSubmit}>
                <fieldset className="ManageTournaments__fieldset">
                    <legend className="ManageTournaments__legend">Basic Info</legend>
                    {['name', 'frequency', 'gameMode'].map(field => (
                        <label key={field} className="ManageTournaments__label">
                            {field.charAt(0).toUpperCase() + field.slice(1)}*
                            {field === 'frequency' || field === 'gameMode' ? (
                                <select
                                    className="ManageTournaments__input"
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select {field}</option>
                                    {(field === 'frequency'
                                        ? ['Daily', 'Weekly', 'Monthly', 'One-time']
                                        : ['BR', 'CS', 'DM', 'TDM']
                                    ).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            ) : (
                                <input
                                    className="ManageTournaments__input"
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    required
                                />
                            )}
                        </label>
                    ))}
                </fieldset>

                <fieldset className="ManageTournaments__fieldset">
                    <legend className="ManageTournaments__legend">Schedule</legend>
                    {['startDate', 'endDate', 'startTime'].map(field => (
                        <label key={field} className="ManageTournaments__label">
                            {field.replace(/([A-Z])/g, ' $1').trim()}*
                            <input
                                className="ManageTournaments__input"
                                type={field === 'startTime' ? 'time' : 'date'}
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    ))}
                </fieldset>

                <fieldset className="ManageTournaments__fieldset">
                    <legend className="ManageTournaments__legend">Fees & Prizes</legend>
                    {['entryFee', 'maxPrizePool', 'maxPlayers', 'prizePerKill'].map(field => (
                        <label key={field} className="ManageTournaments__label">
                            {field.replace(/([A-Z])/g, ' $1').trim()}*
                            <input
                                className="ManageTournaments__input"
                                type="number"
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                required
                                min={0}
                            />
                        </label>
                    ))}
                    <div className="ManageTournaments__nestedPrizes">
                        <h4>Prizes*</h4>
                        {['first', 'second', 'third'].map(pos => (
                            <label key={pos} className="ManageTournaments__label">
                                {pos.charAt(0).toUpperCase() + pos.slice(1)}{pos === 'first' ? '*' : ''}
                                <input
                                    className="ManageTournaments__input"
                                    type="number"
                                    value={form.prizes[pos]}
                                    onChange={e => handleNested('prizes', pos, e.target.value)}
                                    required={pos === 'first'}
                                    min={0}
                                />
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* Tags */}
                <fieldset className="ManageTournaments__fieldset">
                    <legend className="ManageTournaments__legend">Tags</legend>
                    <div className="ManageTournaments__array">
                        {form.tags.map((tag, idx) => (
                            <div key={idx} className="ManageTournaments__array-item">
                                <input
                                    className="ManageTournaments__input"
                                    value={tag}
                                    onChange={e => handleArrayChange('tags', idx, e.target.value)}
                                />
                                <button type="button" className="ManageTournaments__button--remove" onClick={() => removeArrayItem('tags', idx)}>&minus;</button>
                            </div>
                        ))}
                        <button type="button" className="ManageTournaments__button--add" onClick={() => addArrayItem('tags')}>Add Tag</button>
                    </div>
                </fieldset>

                {/* Details & Prize Details */}
                {['details', 'prizeDetails'].map(field => (
                    <fieldset key={field} className="ManageTournaments__fieldset">
                        <legend className="ManageTournaments__legend">{field === 'details' ? 'Details' : 'Prize Details'}</legend>
                        <div className="ManageTournaments__array">
                            {form[field].map((item, idx) => (
                                <div key={idx} className="ManageTournaments__array-item">
                                    <input
                                        className="ManageTournaments__input"
                                        value={item}
                                        onChange={e => handleArrayChange(field, idx, e.target.value)}
                                    />
                                    <button type="button" className="ManageTournaments__button--remove" onClick={() => removeArrayItem(field, idx)}>&minus;</button>
                                </div>
                            ))}
                            <button type="button" className="ManageTournaments__button--add" onClick={() => addArrayItem(field)}>Add {field}</button>
                        </div>
                    </fieldset>
                ))}

                {/* Important Information */}
                <fieldset className="ManageTournaments__fieldset">
                    <legend className="ManageTournaments__legend">Important Info</legend>
                    {Object.entries(form.importantInformation).map(([section, arr]) => (
                        <div key={section} className="ManageTournaments__array">
                            <h4>{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
                            {arr.map((item, idx) => (
                                <div key={idx} className="ManageTournaments__array-item">
                                    <input
                                        className="ManageTournaments__input"
                                        value={item}
                                        onChange={e => handleInfoArrayChange(section, idx, e.target.value)}
                                    />
                                    <button type="button" className="ManageTournaments__button--remove" onClick={() => removeInfoArrayItem(section, idx)}>&minus;</button>
                                </div>
                            ))}
                            <button type="button" className="ManageTournaments__button--add" onClick={() => addInfoArrayItem(section)}>Add {section}</button>
                        </div>
                    ))}
                </fieldset>

                <button type="submit" className="ManageTournaments__button--submit">
                    {editingId ? 'Update Tournament' : 'Create Tournament'}
                </button>
            </form>
        </Box>
    );
};

export default ManageTournaments;
