import React from 'react';
import "../styles/Login.css";
import GoogleSignIn from './../components/GoogleSignIn';
import { useNavigate } from 'react-router-dom';
import Logo from "../images/Logo.png"

const Login = () => {

  const navigate = useNavigate()
  return (
    <div className="LoginContainer">
      <div className="Login">
        <div className="brand-header">
          <img
            onClick={() => navigate('/')}
            src={Logo}
            alt="Logo"
            className="brand-logo"
          />
          <h2 className="login-title">Login To Account</h2>
          <p className="login-subtitle">
            Continue Your Earning Journey.
          </p>
        </div>

        {/* Social Login Section */}
        <div className="social-login">
          <div className="social-buttons">
            <GoogleSignIn />
          </div>
        </div>

        {/* Separator */}
        <div className="separator">
          <span>OR</span>
        </div>

        {/* Traditional Login Form */}
        <form className="login-form">
          <div className="form-group floating">
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              placeholder=" "
              required
              className="form-input"
            />
            <label htmlFor="loginEmail">Email Address</label>
          </div>

          <div className="form-group floating">
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              placeholder=" "
              required
              className="form-input"
            />
            <label htmlFor="loginPassword">Password</label>
          </div>

          <div className="footer-links">
            <span className="register-footer__text">
              Don’t have an account?
            </span>
            <a
              href="/signup"
              className="register-footer__link"
            >
              Sign up here.
            </a>
          </div>

          <button type="submit" className="submit-btn">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;