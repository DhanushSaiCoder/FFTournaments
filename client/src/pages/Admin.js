// src/components/Admin.jsx
import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import "../styles/Admin.css";
import ManageTournaments from './../components/ManageTournaments';
import ManagePlayers from './../components/managePlayers';
import ManagePopTournaments from '../components/ManagePopTournaments';



const Admin = () => {
  return (
    <div className="AdminPanelContainer">
      <aside className="AdminSidebar">
        <nav>
          <NavLink
            to="/admin/manageTournaments"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Manage Tournaments
          </NavLink>

          <NavLink
            to="/admin/managePopularTournaments"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Manage Pop Tournaments
          </NavLink>

          <NavLink
            to="/admin/managePlayers"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Manage Players
          </NavLink>
        </nav>
      </aside>
      <main className="AdminMain">
        <Routes>
          <Route path="manageTournaments" element={<ManageTournaments />} />
          <Route path="managePlayers" element={<ManagePlayers />} />
          <Route path="managePopularTournaments" element={<ManagePopTournaments />} />

        </Routes>
      </main>
    </div>
  );
};

export default Admin;
