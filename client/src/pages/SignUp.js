import React from 'react';
import "../styles/SignUp.css";

const SignUp = () => {
  return (
    <div className="SignUpContainer">
      <div className="SignUp">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form">

          <div className="form-group floating">
            <input
              type="text"
              id="username"
              name="username"
              placeholder=" "
              required
              className="form-input"
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="form-group floating">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              required
              className="form-input"
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="form-group floating">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              required
              className="form-input"
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-group floating">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=" "
              required
              className="form-input"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>

          <button type="submit" className="submit-btn">
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
