import React from 'react';
import "../styles/PopularTournaments.css"

const PricingChart = ({tournament}) => {
    return (
        <div className='pricingDetailsDiv'>
            <div className='threeBarsDiv'>
                <div className='secondBar'>
                    <h4 className='secondTag'>#2</h4>
                    <h2 className='secondPrize'>₹399/-</h2>
                </div>
                <div className='firstBar'>
                    <h4 className='firstTag'>#1</h4>
                    <h2 className='firstPrize'>₹555/-</h2>
                    <h3 className='champion'>CHAMPION</h3>
                </div>
                <div className='thirdBar'>
                    <h4 className='thirdTag'>#3</h4>
                    <h2 className='thirdPrize'>₹199/-</h2>

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
