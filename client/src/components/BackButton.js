import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/BackButton.css"; // Import your CSS file for styling
const BackButton = () => {
    const navigate = useNavigate();
    return (
        <div className='backButtonContainer'>
            <div onClick={() => {
                navigate(-1); // Go back to the previous page
            }} className='backButton'>
                &lt; Back
            </div>
        </div>
    );
}

export default BackButton;
