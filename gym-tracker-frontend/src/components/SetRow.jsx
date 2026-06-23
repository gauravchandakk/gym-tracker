import React from 'react';

function SetRow({ setItem, setIndex, previousLabel, onChange, onToggleCompleted }) {
  return (
    <tr className={setItem?.completed ? 'completed-row' : ''}>
      <td>{setIndex + 1}</td>
      <td>{previousLabel}</td>
      <td>
        <input
          className="input"
          type="number"
          value={setItem?.reps ?? ''}
          min="0"
          onChange={(event) => onChange('reps', event.target.value)}
          placeholder="Reps"
        />
      </td>
      <td>
        <input
          className="input"
          type="number"
          value={setItem?.weight ?? ''}
          min="0"
          step="0.5"
          onChange={(event) => onChange('weight', event.target.value)}
          placeholder="Weight"
        />
      </td>
      <td>
        <label className="inline-actions" style={{ margin: 0 }}>
          <input type="checkbox" checked={Boolean(setItem?.completed)} onChange={(event) => onToggleCompleted(event.target.checked)} />
          <span className="inline-note">Done</span>
        </label>
      </td>
    </tr>
  );
}

export default SetRow;
