import React from 'react';
import '../styles/TournamentDetailsImpInfo.css';
import SectionDivider from './SectionDivider';

const TournamentDetialsImpInfo = () => {
    return (
        <div className='TournamentDetialsImpInfo'>
            <div className="importantInformation">
                <div className='impInfoLeftDiv'>
                    <div className='impInfoDetailsDiv'>
                        <h3 className='impInfoHeadings'><u>DETAILS:</u></h3>
                        <ol className='impInfoDetailsList'>
                            <li className='impInfoText'>Detail</li>
                            <li className='impInfoText'>Detail</li>
                            <li className='impInfoText'>Detail</li>
                            <li className='impInfoText'>Detail</li>
                        </ol>
                    </div>
                    <div className='impInfoRulesDiv'>
                        <h3 className='impInfoHeadings'><u>RULES:</u></h3>
                        <ol className='impInfoDetailsList'>
                            <li className='impInfoText'>Rule</li>
                            <li className='impInfoText'>Rule</li>
                            <li className='impInfoText'>Rule</li>
                            <li className='impInfoText'>Rule</li>
                        </ol>
                    </div>
                </div>
                <div className='impInfoRightDiv'>
                    <div className='impInfoHowToJoinDiv'>
                        <h3 className='impInfoHeadings'><u>HOW TO JOIN:</u></h3>
                        <ol className='impInfoDetailsList'>
                            <li className='impInfoText'>Step</li>
                            <li className='impInfoText'>Step</li>
                            <li className='impInfoText'>Step</li>
                            <li className='impInfoText'>Step</li>
                        </ol>
                    </div>
                    <div className='impInfoHowToClaimPrizeMoneyDiv'>
                        <h3 className='impInfoHeadings'><u>HOW TO CLAIM PRIZE MONEY:</u></h3>
                        <ol className='impInfoDetailsList'>
                            <li className='impInfoText'>Step</li>
                            <li className='impInfoText'>Step</li>
                            <li className='impInfoText'>Step</li>
                            <li className='impInfoText'>Step</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TournamentDetialsImpInfo;
