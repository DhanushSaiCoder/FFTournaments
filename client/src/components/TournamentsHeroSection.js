import React from 'react';
import "../styles/TournamentsHeroSection.css";

const TournamentsHeroSection = () => {
    return (
        <div className="tournamentsHeroSection">
            <div className='tsHeroSectionContent'>
                <div className='tsHeroSectionLeft'>
                    <div className='userCostumeImgDiv'>
                        {/* image with background  with css. */}
                    </div>
                    <div className='userUserNameDiv'>
                        <div className='tsHeroUserName'>
                            <p>꧁༒☬𝕵𝖆𝖌𝖚𝖆𝖗☬༒꧂</p>
                        </div>
                        <div className='tsHeroUserId'>
                            <p>UID: 8919552348</p>
                        </div>
                    </div>
                </div>
                <div className='tsHeroSectionRight'>
                    <div className='circlesDiv'>
                        <div className='tsPlayedCircle'>
                            <h3 className='circleLabel'>TOURNAMENTS PLAYED</h3>
                            <h2 className='tsPlayedTxt'>16</h2>
                        </div>
                        <div className='moneySpentCircle'>
                            <h3 className='circleLabel'>MONEY SPENT</h3>
                            <h2 className='moneySpentTxt'>₹212/-</h2>
                        </div>
                        <div className='moneyEarntCircle'>
                            <h3 className='circleLabel'>MONEY EARNED</h3>
                            <h2 className='moneyEarntTxt'>₹1473/-</h2>
                        </div>

                    </div>
                    <div className='statsDiv'></div>
                </div>
            </div>
        </div>
    );
}

export default TournamentsHeroSection;
