import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import Logo from '../images/Logo.png';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        uid: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const { username, uid, email, password, confirmPassword } = form;

        // 1. Client‑side password match check
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            // 2. Make request
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, uid, email, password }),
                }
            );

            const data = await res.json();
            console.log("data: ", data)
            // 3. Handle errors
            if (!res.ok) {
                // backend now returns { field, msg } on 400
                setError(data.errors[0].msg || data.msg);
                return;
            }

            // 4. Success! store token & redirect
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        }
    };

    const labels = {
        username: 'Username',
        uid: 'FF UID',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
    };

    return (
        <div className="SignUpContainer">
            <div className="SignUpCard">
                <div className="brand-header">
                    <img
                        onClick={() => navigate('/')}
                        src={Logo}
                        alt="Logo"
                        className="brand-logo"
                    />
                    <h2 className="signup-title">Create Your Account</h2>
                    <p className="signup-subtitle">
                        Join the community. It’s quick and easy.
                    </p>
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

                <div className="separator">
                    <span>OR</span>
                </div>

                {error && <div className="form-error">{error}</div>}

                <form className="signup-form" onSubmit={e => e.preventDefault()}>
                    {Object.keys(form).map((field, i) => {
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
                                    value={form[field]}
                                    onChange={handleChange}
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

                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="submit-btn"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
