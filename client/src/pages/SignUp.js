import React from 'react';
import '../styles/SignUp.css';
import Logo from '../images/Logo.png';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const SignUp = () => {
    return (
        <div className="SignUpContainer">
            <div className="SignUpCard">
                <div className="brand-header">
                    <img onClick={() => window.location.href = "/"} src={Logo} alt="Logo" className="brand-logo" />
                    <h2 className="signup-title">Create Your Account</h2>
                    <p className="signup-subtitle">Join the community. It’s quick and easy.</p>
                </div>

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

                <div className="separator"><span>OR</span></div>

                <form className="signup-form">
                    {['username', 'uid', 'email', 'password', 'confirmPassword'].map((field, i) => {
                        const labels = {
                            username: 'Username',
                            uid: 'FF UID',
                            email: 'Email Address',
                            password: 'Password',
                            confirmPassword: 'Confirm Password'
                        };

                        const type = field.includes('password')
                            ? 'password'
                            : field === 'email'
                            ? 'email'
                            : field === 'uid'
                            ? 'number'
                            : 'text';

                        return (
                            <div className="form-group floating" key={i}>
                                <input
                                    type={type}
                                    id={field}
                                    name={field}
                                    placeholder=" "
                                    required
                                    className="form-input"
                                />
                                <label htmlFor={field}>{labels[field]}</label>
                            </div>
                        );
                    })}

                    <div className="footer-links">
                        <span className="register-footer__text">
                            Already have an account?
                        </span>
                        <a
                            tabIndex="0"
                            className="register-footer__link"
                            href="/login"
                        >
                            Login here.
                        </a>
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
