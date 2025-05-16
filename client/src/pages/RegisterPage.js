import React from 'react';
import "../styles/RegisterPage.css"
import RegistrationStepper from '../components/RegistrationStepper';



const RegisterPage = () => {

  return (
    <div className='RegisterPageContainer'>
      <div className='RegisterPageContent'>
        <h2>REGISTER FOR TOURNAMENT</h2>
        <RegistrationStepper />
      </div>
    </div>
  );
}

export default RegisterPage;
