import React from 'react';
import "../styles/Login.css";

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="LoginContainer">
      <div className="Login">
        <h2 className="login-title">Log In</h2>

        {/* — Social Log‑In First — */}
        <div className="social-login">
          <div className="social-buttons">
            <button className="social-btn google">
              <FcGoogle className="social-icon" />
              <span>Google</span>
            </button>
            <button className="social-btn facebook">
              <FaFacebookF className="social-icon" />
              <span>Facebook</span>
            </button>
            <button className="social-btn twitter">
              <FaTwitter className="social-icon" />
              <span>Twitter</span>
            </button>
          </div>
        </div>

        {/* — Separator — */}
        <div className="separator">
          <span>OR</span>
        </div>

        {/* — Traditional Log‑In Form — */}
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

          <div className="footer-link">
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
