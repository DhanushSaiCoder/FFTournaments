import React from 'react';
import "../styles/TournamentsHeroSection.css";


const data = {
    id: "42k53k4jlk341l42l3k5",
    costumeUrl: "https://picsum.photos/200/300",
    name: "꧁༒☬𝕵𝖆𝖌𝖚𝖆𝖗☬༒꧂",
    uid: "8919552348",
    tournamentsPlayed: 16,
    moneySpent: 212,
    moneyEarned: 1473,
    tournamentsWon: 12,
    totalKills: 34,
    totalCashWon: 2341,
    totalSpendings: 432,
    avgKillsPerMatch: 3,

}

const TournamentsHeroSection = () => {
    return (
        <div className="tournamentsHeroSection">
            <div className='tsHeroSectionContent'>
                <div className='tsHeroSectionLeft'>
                    <div style={{ background: `url("${data.costumeUrl}")`}} className='userCostumeImgDiv'>
                        {/* image with background  with css. */}
                    </div>
                    <div className='userUserNameDiv'>
                        <div className='tsHeroUserName'>
                            <p>{data.name}</p>
                        </div>
                        <div className='tsHeroUserId'>
                            <p>UID: {data.uid}</p>
                        </div>
                    </div>
                </div>
                <div className='tsHeroSectionRight'>
                    <div className='circlesDiv'>
                        <div className='tsPlayedCircle'>
                            <h3 className='circleLabel'>TOURNAMENTS PLAYED</h3>
                            <h2 className='tsPlayedTxt'>{data.tournamentsPlayed}</h2>
                        </div>
                        <div className='moneySpentCircle'>
                            <h3 className='circleLabel'>MONEY SPENT</h3>
                            <h2 className='moneySpentTxt'>₹{data.moneySpent}/-</h2>
                        </div>
                        <div className='moneyEarntCircle'>
                            <h3 className='circleLabel'>MONEY EARNED</h3>
                            <h2 className='moneyEarntTxt'>₹{data.moneyEarned}/-</h2>
                        </div>

                    </div>
                    <div className='statsDiv'>
                        <div className='stat'>
                            <p className='statHeading'>TOURNAMENTS WON: </p>
                            <p className='statValue'>{data.tournamentsWon}</p>
                        </div>
                        <div className='stat'>
                            <p className='statHeading'>TOTAL KILLS: </p>
                            <p className='statValue'>{data.totalKills}</p>
                        </div>
                        <div className='stat'>
                            <p className='statHeading'>TOTAL CASH WON: </p>
                            <p className='statValue'>₹{data.totalCashWon}/-</p>
                        </div>
                        <div className='stat'>
                            <p className='statHeading'>TOTAL SPENDINGS: </p>
                            <p className='statValue'>₹{data.totalSpendings}/-</p>
                        </div>
                        <div className='stat'>
                            <p className='statHeading'>AVG KILLS PER MATCH: </p>
                            <p className='statValue'>{data.avgKillsPerMatch}</p>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
}

export default TournamentsHeroSection;
