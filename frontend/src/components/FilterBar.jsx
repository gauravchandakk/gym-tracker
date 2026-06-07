import React from 'react';
import { MUSCLE_GROUPS } from '../utils/helpers';

// FilterBar lets the user narrow the exercise list by date or muscle group.
function FilterBar({ filters, onDateChange, onMuscleChange, onClearFilters }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label htmlFor="filterDate" className="form-label">
              Filter by Date
            </label>
            <input
              id="filterDate"
              type="date"
              className="form-control"
              value={filters.date}
              onChange={(event) => onDateChange(event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="filterMuscle" className="form-label">
              Filter by Muscle Group
            </label>
            <select
              id="filterMuscle"
              className="form-select"
              value={filters.muscleGroup}
              onChange={(event) => onMuscleChange(event.target.value)}
            >
              <option value="">All Muscle Groups</option>
              {MUSCLE_GROUPS.map((muscleGroup) => (
                <option key={muscleGroup} value={muscleGroup}>
                  {muscleGroup}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 d-flex justify-content-md-end">
            <button type="button" className="btn btn-outline-secondary" onClick={onClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;