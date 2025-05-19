import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/ManageTournaments.css'; 

const exampleTournament = {
    _id: 'abc123',
    frequency: 'Weekly',
    name: 'Sunday Showdown',
    tags: ['FPS', 'Solo'],
    details: ['Fast-paced', 'Invite only'],
    gameMode: 'Solo',
    maxPrizePool: 5000,
    maxPlayers: 100,
    prizePerKill: 10,
    entryFee: 50,
    startDate: '2025-06-01',
    startTime: '18:00',
    startDateTime: '2025-06-01T18:00',
    prizes: { first: '₹3000', second: '₹1500', third: '₹500' },
    prizeDetails: ['Cash payout', 'Winner gets trophy'],
    importantInformation: {
        details: ['Be online 15 min early'],
        rules: ['No cheating', 'Respect others'],
        howToJoin: ['Register on dashboard'],
        howToClaimPrizeMoney: ['Contact admin within 24h']
    }
};

const ManageTournaments = () => {
    const [tournaments, setTournaments] = useState([exampleTournament]);
    const [form, setForm] = useState({
        _id: '', frequency: '', name: '', tags: [], details: [], gameMode: '',
        maxPrizePool: '', maxPlayers: '', prizePerKill: '', entryFee: '',
        startDate: '', startTime: '', startDateTime: '',
        prizes: { first: '', second: '', third: '' },
        prizeDetails: [],
        importantInformation: { details: [], rules: [], howToJoin: [], howToClaimPrizeMoney: [] }
    });

    useEffect(() => {
        if (form.startDate && form.startTime) {
            setForm(f => ({
                ...f,
                startDateTime: `${f.startDate}T${f.startTime}`
            }));
        }
    }, [form.startDate, form.startTime]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleNested = (group, key, value) => {
        setForm(f => ({
            ...f,
            [group]: { ...f[group], [key]: value }
        }));
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...form[field]];
        newArray[index] = value;
        setForm(prevForm => ({ ...prevForm, [field]: newArray }));
    };

    const addArrayItem = (field) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: [...prevForm[field], ''],
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

    const handleSubmit = e => {
        e.preventDefault();
        const newEntry = { ...form, _id: uuidv4() };
        if (!newEntry.name || !newEntry.startDate) {
            alert('Name and Start Date are required');
            return;
        }
        setTournaments([...tournaments, newEntry]);
        setForm({
            _id: '', frequency: '', name: '', tags: [], details: [], gameMode: '',
            maxPrizePool: '', maxPlayers: '', prizePerKill: '', entryFee: '',
            startDate: '', startTime: '', startDateTime: '',
            prizes: { first: '', second: '', third: '' },
            prizeDetails: [],
            importantInformation: { details: [], rules: [], howToJoin: [], howToClaimPrizeMoney: [] }
        });
    };

    return (
        <div className="ManageTournaments">
            <div className='ManageTournamentsContent'>
                <section className="ManageTournaments__tableSection">
                    <h2>Existing Tournaments</h2>
                    <table className="ManageTournaments__table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start</th>
                                <th>Entry Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.map(t => (
                                <tr key={t._id}>
                                    <td>{t.name}</td>
                                    <td>{t.startDateTime}</td>
                                    <td>{t.entryFee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <form className="ManageTournaments__form" onSubmit={handleSubmit}>
                    {/* Basic Info */}
                    <fieldset className="ManageTournaments__fieldset">
                        <legend className="ManageTournaments__legend">Basic Info</legend>
                        {['name', 'frequency', 'gameMode'].map(field => (
                            <label key={field} className="ManageTournaments__label">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                <input
                                    className="ManageTournaments__input"
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    required={field === 'name'}
                                />
                            </label>
                        ))}
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
                        <label className="ManageTournaments__label">Start Time
                            <input
                                className="ManageTournaments__input"
                                type="time"
                                name="startTime"
                                value={form.startTime}
                                onChange={handleChange}
                            />
                        </label>
                    </fieldset>

                    {/* Fees & Prizes */}
                    <fieldset className="ManageTournaments__fieldset">
                        <legend className="ManageTournaments__legend">Fees & Prizes</legend>
                        {['entryFee', 'maxPrizePool', 'prizePerKill'].map(field => (
                            <label key={field} className="ManageTournaments__label">
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                                <input
                                    className="ManageTournaments__input"
                                    type="number"
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                />
                            </label>
                        ))}
                        <div className="ManageTournaments__nestedPrizes">
                            <h4>Prizes</h4>
                            {['first', 'second', 'third'].map(pos => (
                                <label key={pos} className="ManageTournaments__label">
                                    {pos.charAt(0).toUpperCase() + pos.slice(1)}
                                    <input
                                        className="ManageTournaments__input"
                                        value={form.prizes[pos]}
                                        onChange={e => handleNested('prizes', pos, e.target.value)}
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

                    <button type="submit" className="ManageTournaments__button--submit">Create Tournament</button>
                </form>
            </div>
        </div>
    );
};

export default ManageTournaments;
