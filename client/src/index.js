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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div>
      <Header /> {/* Always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);
