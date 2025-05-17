import React from 'react';
import "../styles/NoPage.css"
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
const NoPage = () => {
    return (
        <div className='NoPage'>
            <SentimentDissatisfiedIcon style={{fontSize: "120px"}} className='pageNotFoundIcon'/>

            <h1>404 - Page Not Found</h1>
            <p >Sorry, the page you are looking for does not exist.</p>
            <p>Please check the URL or return to the home page.</p>
            <a href="/">Go to Home</a>
        </div>
    );
}

export default NoPage;
