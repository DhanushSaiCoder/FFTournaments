import React from 'react';
import "../styles/SignUp.css";

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const SignUp = () => {
    return (
        <div className="SignUpContainer">
            <div className="SignUp">
                <h2 className="signup-title">Sign Up</h2>

                {/* — Social Sign‑Up First — */}
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

                {/* — Traditional Sign‑Up Form — */}
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
                            type="number"
                            id="uid"
                            name="uid"
                            placeholder=" "
                            required
                            className="form-input"
                        />
                        <label htmlFor="uid">FF UID</label>
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
                    <div>

                        <span class="register-footer__text">
                            Already have an account?
                        </span>
                        <a
                            tabindex="0"
                            data-testid="login-here-link"
                            class="register-footer__link"
                        >
                            Login here.
                        </a>
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
