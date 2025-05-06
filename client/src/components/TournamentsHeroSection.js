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
                <div className='tsHeroSectionRight'></div>
            </div>
        </div>
    );
}

export default TournamentsHeroSection;
