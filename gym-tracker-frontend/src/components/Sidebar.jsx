import React from 'react';
import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/workout/new', label: 'Log Workout', icon: '🏋️' },
  { to: '/workouts', label: 'Workouts', icon: '📋' },
  { to: '/exercises', label: 'Exercises', icon: '💪' },
];

function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">G</div>
        <div>
          <h1>Gym Tracker</h1>
          <p>Strength, volume, streaks</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span aria-hidden="true">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">Keep the pace. Track every rep, every set, every win.</div>
    </aside>
  );
}

export default Sidebar;
