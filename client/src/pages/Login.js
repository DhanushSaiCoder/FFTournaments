import React, { useState } from 'react';
import "../styles/Login.css";
import GoogleSignIn from './../components/GoogleSignIn';
import { useNavigate } from 'react-router-dom';
import Logo from "../images/Logo.png"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const role = email == process.env.REACT_APP_ADMIN_EMAIL ? "admin" : "user"
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      // Store token and redirect
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

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
            <GoogleSignIn onSuccessRedirect="/" />
          </div>
        </div>

        {/* Separator */}
        <div className="separator">
          <span>OR</span>
        </div>

        {/* Traditional Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group floating">
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              placeholder=" "
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="loginPassword">Password</label>
          </div>

          {error && <div className="error-message">{error}</div>}

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