import React from 'react';
import "../styles/HeroSection.css";
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='HomeHeroDiv'>
                <div className='HomeHeroContent'>
                    <div className='heroLeft'>
                        <h1>Win Exciting Cash Prizes<br />By Playing Your Favorite Game.</h1>
                        <p>Join college-level Free Fire tournaments<br />and win exciting cash prizes!</p>
                        <div className='heroCTADiv'>
                            <button onClick={() => navigate("/signup")} className='registerBtn'>REGISTER</button>
                            <button onClick={() => navigate("/login")} className='loginBtn'>LOG IN</button>
                        </div>
                    </div>
                    <div className='heroRight'></div>

                </div>
            </div>
        </div>
    );
}

export default HeroSection;
