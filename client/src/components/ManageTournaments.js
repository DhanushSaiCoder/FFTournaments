import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/ManageTournaments.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SectionDivider from "../components/SectionDivider"
const ManageTournaments = () => {
    const initialFormState = {
        frequency: '',
        name: '',
        tags: [],
        details: [],
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
        prizeDetails: [],
        importantInformation: {
            details: [],
            rules: [],
            howToJoin: [],
            howToClaimPrizeMoney: []
        }
    };

    const [tournaments, setTournaments] = useState([
        {
            id: uuidv4(),
            frequency: 'Weekly',
            name: 'Sunday Showdown',
            tags: ['FPS', 'Solo'],
            details: ['Fast-paced', 'Invite only'],
            gameMode: 'BR',
            maxPrizePool: 5000,
            maxPlayers: 100,
            prizePerKill: 10,
            entryFee: 50,
            startDate: '2025-06-01',
            endDate: '2025-06-02',
            startTime: '18:00',
            startDateTime: '2025-06-01T18:00',
            prizes: { first: 3000, second: 1500, third: 500 },
            prizeDetails: ['Cash payout', 'Winner gets trophy'],
            importantInformation: {
                details: ['Be online 15 min early'],
                rules: ['No cheating', 'Respect others'],
                howToJoin: ['Register on dashboard'],
                howToClaimPrizeMoney: ['Contact admin within 24h']
            }
        }
    ]);
    const [form, setForm] = useState(initialFormState);
    const [editingId, setEditingId] = useState(null);

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
                setTournaments(result);
            } catch (err) {
                console.error(`Error fetching tournaments:`, err);
                alert(`Error: ${err.message}`);
            }
        };

        fetchTournaments();
    }, []);

    useEffect(() => {
        if (form.startDate && form.startTime) {
            setForm(f => ({
                ...f,
                startDateTime: `${f.startDate}T${f.startTime}`
            }));
        }
    }, [form.startDate, form.startTime]);

    const resetForm = () => {
        setForm(initialFormState);
        setEditingId(null);
    };

    const deleteTournament = id => {
        setTournaments(prev => prev.filter(t => t.id !== id));
        if (editingId === id) {
            resetForm();
        }
    };

    const editTournament = t => {
        setForm({ ...t });
        setEditingId(t.id);
    };

    const handleChange = e => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setForm(f => ({ ...f, [name]: parsedValue }));
    };

    const handleNested = (group, key, value) => {
        const parsedValue = group === 'prizes' ? Number(value) : value;
        setForm(f => ({
            ...f,
            [group]: { ...f[group], [key]: parsedValue }
        }));
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...form[field]];
        newArray[index] = value;
        setForm(prevForm => ({ ...prevForm, [field]: newArray }));
    };

    const addArrayItem = field => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: [...prevForm[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        setForm(prevForm => {
            const updatedArray = [...prevForm[field]];
            updatedArray.splice(index, 1);
            return { ...prevForm, [field]: updatedArray };
        });
    };

    // ImportantInformation handlers
    const handleInfoArrayChange = (section, idx, value) => {
        const arr = [...form.importantInformation[section]];
        arr[idx] = value;
        setForm(f => ({
            ...f,
            importantInformation: {
                ...f.importantInformation,
                [section]: arr
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

    const handleSubmit = async e => {
        e.preventDefault();

        // Convert string numbers to actual numbers
        const formData = {
            ...form,
            maxPrizePool: Number(form.maxPrizePool),
            maxPlayers: Number(form.maxPlayers),
            prizePerKill: Number(form.prizePerKill),
            entryFee: Number(form.entryFee),
            prizes: {
                first: Number(form.prizes.first),
                second: Number(form.prizes.second),
                third: Number(form.prizes.third)
            }
        };

        if (!form.name || !form.startDate || !form.endDate || !form.gameMode) {
            alert('Required fields are missing');
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/tournaments`,
                {
                    method: editingId ? 'PUT' : 'POST', // Use PUT for updates
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) throw new Error(`Failed to ${editingId ? 'update' : 'create'} tournament`);

            const result = await response.json();
            if (editingId) {
                setTournaments(prev =>
                    prev.map(t => (t.id === editingId ? { ...result, id: editingId } : t))
                );
                alert('Tournament updated successfully!');
            } else {
                setTournaments(t => [...t, { ...result, id: uuidv4() }]); // Assign a new client-side ID
                alert('Tournament created successfully!');
            }
            resetForm();
        } catch (err) {
            console.error(`Error ${editingId ? 'updating' : 'creating'} tournament:`, err);
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="ManageTournaments">
            <div className="ManageTournamentsContent">
                {/* Existing Tournaments Table */}
                <section className="ManageTournaments__tableSection">
                    <h2>Existing Tournaments</h2>
                    <table className="ManageTournaments__table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Game Mode</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Max Prize Pool</th>
                                <th>Entry Fee</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.map(t => (
                                <tr className='adminTTableRow' key={t.id}>
                                    <td>{t.name}</td>
                                    <td>{t.gameMode}</td>
                                    <td>
                                        {new Intl.DateTimeFormat('en-IN', {
                                            dateStyle: 'short',
                                            timeStyle: 'short',
                                        }).format(new Date(t.startDateTime))}
                                    </td>

                                    <td>{new Intl.DateTimeFormat('en-IN').format(new Date(t.endDate))}</td>

                                    <td>₹{t.maxPrizePool}/-</td>
                                    <td>{t.entryFee}</td>
                                    <td>
                                        <div className='actionsDiv'>

                                            <button
                                                type="button"
                                                className="ManageTournaments__button--edit"
                                                onClick={() => editTournament(t)}
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                type="button"
                                                className="ManageTournaments__button ManageTournaments__button--danger"
                                                onClick={() => deleteTournament(t.id)}
                                            >
                                                <DeleteIcon sx={{ color: "red" }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <SectionDivider text={editingId ? "UPDATE TOURNAMENT" : "NEW TOURNAMENT"} />
                <form className="ManageTournaments__form" onSubmit={handleSubmit}>
                    {/* Basic Info */}
                    <fieldset className="ManageTournaments__fieldset">
                        <legend className="ManageTournaments__legend">Basic Info</legend>
                        <label className="ManageTournaments__label">
                            Name*
                            <input
                                className="ManageTournaments__input"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="ManageTournaments__label">
                            Frequency*
                            <select
                                className="ManageTournaments__input"
                                name="frequency"
                                value={form.frequency}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Frequency</option>
                                {['Daily', 'Weekly', 'Monthly', 'One-time'].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                        <label className="ManageTournaments__label">
                            Game Mode*
                            <select
                                className="ManageTournaments__input"
                                name="gameMode"
                                value={form.gameMode}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Game Mode</option>
                                {['BR', 'CS', 'DM', 'TDM'].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                    </fieldset>

                    {/* Schedule */}
                    <fieldset className="ManageTournaments__fieldset">
                        <legend className="ManageTournaments__legend">Schedule</legend>
                        <label className="ManageTournaments__label">Start Date*
                            <input
                                className="ManageTournaments__input"
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="ManageTournaments__label">End Date*
                            <input
                                className="ManageTournaments__input"
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="ManageTournaments__label">Start Time*
                            <input
                                className="ManageTournaments__input"
                                type="time"
                                name="startTime"
                                value={form.startTime}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </fieldset>

                    {/* Fees & Prizes */}
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
                                    {pos.charAt(0).toUpperCase() + pos.slice(1)}
                                    {pos === 'first' && '*'}
                                    <input
                                        type="number"
                                        className="ManageTournaments__input"
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
                                    <button
                                        type="button"
                                        className="ManageTournaments__button--remove"
                                        onClick={() => removeArrayItem('tags', idx)}
                                    >
                                        &minus;
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="ManageTournaments__button--add"
                                onClick={() => addArrayItem('tags')}
                            >
                                Add Tag
                            </button>
                        </div>
                    </fieldset>

                    {/* Details & Prize Details */}
                    {['details', 'prizeDetails'].map(field => (
                        <fieldset key={field} className="ManageTournaments__fieldset">
                            <legend className="ManageTournaments__legend">
                                {field === 'details' ? 'Details' : 'Prize Details'}
                            </legend>
                            <div className="ManageTournaments__array">
                                {form[field].map((item, idx) => (
                                    <div key={idx} className="ManageTournaments__array-item">
                                        <input
                                            className="ManageTournaments__input"
                                            value={item}
                                            onChange={e => handleArrayChange(field, idx, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="ManageTournaments__button--remove"
                                            onClick={() => removeArrayItem(field, idx)}
                                        >
                                            &minus;
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="ManageTournaments__button--add"
                                    onClick={() => addArrayItem(field)}
                                >
                                    Add {field}
                                </button>
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
                                        <button
                                            type="button"
                                            className="ManageTournaments__button--remove"
                                            onClick={() => removeInfoArrayItem(section, idx)}
                                        >
                                            &minus;
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="ManageTournaments__button--add"
                                    onClick={() => addInfoArrayItem(section)}
                                >
                                    Add {section}
                                </button>
                            </div>
                        ))}
                    </fieldset>

                    <button type="submit" className="ManageTournaments__button--submit">
                        {editingId ? 'Update Tournament' : 'Create Tournament'}
                    </button>
                </form>
            </div>
        </div >
    );
};

export default ManageTournaments;