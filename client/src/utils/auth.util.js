// src/utils/auth.js
import {jwtDecode} from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('token');
}

export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function getUser() {
  if (!isLoggedIn()) return null;
  const { user } = jwtDecode(getToken());
  return user;
}

export function logout() {
  localStorage.removeItem('token');
}
