import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const GoogleSignIn = ({ onSuccessRedirect }) => {
  useEffect(() => {
    const initGoogle = () => {
      if (!window.google?.accounts) return;
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: 'popup',
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        { theme: 'outline', size: 'large' }
      );
    };

    // Avoid injecting the script twice
    if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = initGoogle;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    } else {
      initGoogle();
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: response.credential }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      const user = jwtDecode(data.token);
      console.log('Logged in user:', user);

      window.location.href = onSuccessRedirect;
    } catch (err) {
      console.error('Google sign-in error:', err);
      alert(err.message || 'Google sign‑in failed');
    }
  };

  return <div id="google-signin-btn"></div>;
};

export default GoogleSignIn;
