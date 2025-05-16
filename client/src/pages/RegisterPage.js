import React, { useState } from 'react';
import "../styles/RegisterPage.css"
import RegistrationStepper from '../components/RegistrationStepper';
import InfoIcon from '@mui/icons-material/Info';


const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [upi, setUpi] = useState('');
  const allFilled = fullName && mobile && upi;
  return (
    <div className='RegisterPageContainer'>
      <div className='RegisterPageContent'>
        <h2 className='registerHeading'>REGISTER FOR TOURNAMENT</h2>
        <RegistrationStepper />

        <div className="reg-form-container">
          <h3 className="reg-form-title">Enter Your Details</h3>
          <form className="reg-form">
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                className="form-input"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <span className="info-icon" title="We need your number to send you payment confirmations."><InfoIcon/></span>
            </div>

            <div className="form-group">
              <input
                type="number"
                className="form-input"
                placeholder="UPI ID"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
              />
              <span className="info-icon" title="We use UPI to process your entry fee quickly."><InfoIcon/></span>
            </div>

            <div className="fee-row">
              <span className="fee-label">Entry Fee</span>
              <span className="fee-amount">₹25/-</span>
            </div>

            <button
              type="button"
              className="submit-btn"
              disabled={!allFilled}
            >
              CONTINUE TO PAYMENT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
