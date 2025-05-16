import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import "../styles/BackButton.css"; // Import your CSS file for styling
const BackButton = () => {
    const navigate = useNavigate();
    return (
        <div className='backButtonContainer'>
            <div onClick={() => {
                navigate(-1); // Go back to the previous page
            }} className='backButton'>
                <ArrowBackIcon fontSize='large'/> Back
            </div>
        </div>
    );
}

export default BackButton;
