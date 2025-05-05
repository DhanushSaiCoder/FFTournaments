import React from 'react';
import "../styles/HeroSection.css";
const HeroSection = () => {
    return (
        <div>
            <div className='HomeHeroDiv'>
                <div className='HomeHeroContent'>
                    <div className='heroLeft'>
                        <h1>Win Exciting Cash Prizes<br />By Playing Your Favorite Game.</h1>
                        <p>Join college-level Free Fire tournaments<br />and win exciting cash prizes!</p>
                        <div className='heroCTADiv'>
                            <button className='registerBtn'>REGISTER</button>
                            <button className='loginBtn'>LOG IN</button>
                        </div>
                    </div>
                    <div className='heroRight'></div>

                </div>
            </div>
        </div>
    );
}

export default HeroSection;
