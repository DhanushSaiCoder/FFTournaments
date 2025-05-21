import React from 'react';
import "../styles/PopularTournaments.css"

const PricingChart = ({tournament}) => {
    return (
        <div className='pricingDetailsDiv'>
            <div className='threeBarsDiv'>
                <div className='secondBar'>
                    <h4 className='secondTag'>#2</h4>
                    <h2 className='secondPrize'>₹{tournament.prizes.second}/-</h2>
                </div>
                <div className='firstBar'>
                    <h4 className='firstTag'>#1</h4>
                    <h2 className='firstPrize'>₹{tournament.prizes.first}/-</h2>
                    <h3 className='champion'>CHAMPION</h3>
                </div>
                <div className='thirdBar'>
                    <h4 className='thirdTag'>#3</h4>
                    <h2 className='thirdPrize'>{tournament.prizes.third ? `₹${tournament.prizes.third}/-`: "N/A"}</h2>

                </div>
            </div>
            <div className='prizeDetailsTextDiv'>
                {
                    tournament.prizeDetails.map((detail, index) => (
                        <p key={index} className='prizeDetailsText'> {detail}</p>
                    ))
                }
            </div>
        </div>
    );
}

export default PricingChart;
