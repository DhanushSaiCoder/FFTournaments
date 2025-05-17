import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Help from './pages/Help';
import Rankings from './pages/Rankings';
import Tournaments from './pages/Tournaments';
import NoPage from './pages/NoPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Footer from './components/Footer';
import TournamentDetails from './components/TournamentDetails';
import RegisterPage from './pages/RegisterPage';
import ScrollToTop from './components/ScrollToTop';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div>
      <Header /> {/* Always visible */}
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />
        <Route path="/register/:id" element={<RegisterPage />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer/>
    </div>
  </BrowserRouter>
);
