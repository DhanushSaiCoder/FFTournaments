// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import * as auth from '../utils/auth.util';

export function useAuth() {
  const [user, setUser] = useState(() => auth.getUser());

  useEffect(() => {
    // Optional: listen for login/logout events,
    // e.g. via a custom event emitter or storage listener
    const handleStorage = () => setUser(auth.getUser());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return {
    isLoggedIn: auth.isLoggedIn(),
    user,
    logout: auth.logout,
  };
}
