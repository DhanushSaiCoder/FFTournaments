import React from 'react';
import '../styles/TournamentDetailsImpInfo.css';

const TournamentDetialsImpInfo = ({ data }) => {
    return (
        <div className='TournamentDetialsImpInfo'>
            <div className="importantInformation">
                <div className='impInfoLeftDiv'>
                    <div className='impInfoDetailsDiv'>
                        <h3 className='impInfoHeadings'><u>DETAILS:</u></h3>
                        <ol className='impInfoDetailsList'>
                            {
                                data.importantInformation.details.map((detail, index) => (
                                    <li className='impInfoText' key={index}>{detail}</li>
                                ))
                            }
                        </ol>
                    </div>
                    <div className='impInfoRulesDiv'>
                        <h3 className='impInfoHeadings'><u>RULES:</u></h3>
                        <ol className='impInfoDetailsList'>
                           {
                                data.importantInformation.rules.map((rule, index) => (
                                    <li className='impInfoText' key={index}>{rule}</li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
                <div className='impInfoRightDiv'>
                    <div className='impInfoHowToJoinDiv'>
                        <h3 className='impInfoHeadings'><u>HOW TO JOIN:</u></h3>
                        <ol className='impInfoDetailsList'>
                        {
                                data.importantInformation.howToJoin.map((rule, index) => (
                                    <li className='impInfoText' key={index}>{rule}</li>
                                ))
                            }
                        </ol>
                    </div>
                    <div className='impInfoHowToClaimPrizeMoneyDiv'>
                        <h3 className='impInfoHeadings'><u>HOW TO CLAIM PRIZE MONEY:</u></h3>
                        <ol className='impInfoDetailsList'>
                        {
                                data.importantInformation.howToClaimPrizeMoney.map((rule, index) => (
                                    <li className='impInfoText' key={index}>{rule}</li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TournamentDetialsImpInfo;
