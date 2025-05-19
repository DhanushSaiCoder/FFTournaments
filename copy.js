//----------array handlers------------
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
// --------------------------------------------------
// --------------------ttable------------------------
<section className="ManageTournaments__tableSection">
    <h2>Existing Tournaments</h2>
    <table className="ManageTournaments__table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Start</th>
                <th>Entry Fee</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {tournaments.map(t => (
                <tr className='adminTTableRow' key={t._id}>
                    <td>{t.name}</td>
                    <td>{t.startDateTime}</td>
                    <td>{t.entryFee}</td>
                    <td>

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
                            onClick={() => deleteTournament(t._id)}
                        >
                            <DeleteIcon sx={{ color: "red" }} />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</section>
// -----------------------------------------------------------
// ------------------rest of the form-------------------------
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
                        {form._id ? 'Update Tournament' : 'Create Tournament'}
                    </button>