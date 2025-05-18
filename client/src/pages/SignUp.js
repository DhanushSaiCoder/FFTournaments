import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import Logo from '../images/Logo.png';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import GoogleSignIn from './../components/GoogleSignIn';

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        uid: '',
        email: '',
        password: '',
        confirmPassword: '',

    });
    const [uid, setUid] = useState('')
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

    const handleUIDInpChange = (e) => {
        setUid(e.target.value);
    };

    const handleUIDEntry = async () => {
        console.log("UID: ", uid)
        //send a patch request to the auth route to edit the uid in the db
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/uid`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ uid: uid }),
                }
            );
            const data = await res.json();
            if (!data.success) throw new Error(data.message || 'Update failed');
            navigate('/');
        } catch (err) {
            console.error('UID update error:', err);
            alert("error setting the uid")
            console.error(`Error: ${err.message}`);
        }
    }

    const params = new URLSearchParams(window.location.search);

    // read individual keys
    const getUID = params.get("getUID");     // e.g. ?user=dhanush

    return (
        <div className="SignUpContainer">
            <div className="SignUpCard">
                {!getUID && <div className="brand-header">
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
                </div>}

                {!getUID && <div className="social-login">
                    <div className="social-buttons">
                        <GoogleSignIn onSuccessRedirect="/signup?getUID=true" />
                        {/* <button className="social-btn facebook">
                            <FaFacebookF className="social-icon" />
                            <span>Facebook</span>
                        </button>
                        <button className="social-btn twitter">
                            <FaTwitter className="social-icon" />
                            <span>Twitter</span>
                        </button> */}
                    </div>
                </div>}

                {!getUID && <div className="separator">
                    <span>OR</span>
                </div>}

                {error && !getUID && <div className="form-error">{error}</div>}

                {!getUID && <form className="signup-form" onSubmit={e => e.preventDefault()}>
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
                                    className="signup-form-input"
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
                </form>}

                {getUID && (
                    <div className='getUIDContainer'>

                        <h2>Enter Free Fire UID</h2>
                        <div className="form-group floating getUIDContent" >
                            <input
                                type="number"
                                id="getUIDInp"
                                name="getUIDInp"
                                placeholder="eg. 4372957623"
                                required
                                className="form-input"
                                onChange={handleUIDInpChange}
                            />
                            <button onClick={handleUIDEntry} className='submit-btn getUID-submit'>ENTER</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
