import React from 'react';

function StatCard({ label, value, hint, icon }) {
  return (
    <article className="stat-card">
      <div className="card-meta">
        <span className="badge-muted">{icon}</span>
      </div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
      {hint ? <div className="helper-text">{hint}</div> : null}
    </article>
  );
}

export default StatCard;
