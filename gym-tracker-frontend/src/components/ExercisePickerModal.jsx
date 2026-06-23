import React, { useEffect, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import { getAllExercises, getExercisesByMuscle, searchExercises } from '../services/exerciseService';
import { MUSCLE_GROUPS, normalizeCollection } from '../utils/helpers';

function ExercisePickerModal({ open, onClose, onPick }) {
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadLibrary = async () => {
      setLoading(true);
      setError('');

      try {
        const response = search.trim()
          ? await searchExercises(search.trim())
          : selectedMuscle !== 'All'
            ? await getExercisesByMuscle(selectedMuscle)
            : await getAllExercises();

        setLibrary(normalizeCollection(response?.data));
      } catch (requestError) {
        setError(requestError?.response?.data?.message || requestError.message || 'Unable to load exercise library.');
      } finally {
        setLoading(false);
      }
    };

    loadLibrary();
  }, [open, search, selectedMuscle]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Pick exercise">
      <div className="modal-panel drawer-panel">
        <div className="picker-card" style={{ border: 'none', boxShadow: 'none' }}>
          <div className="picker-header">
            <div>
              <h3>Add Exercise</h3>
              <p className="muted" style={{ margin: '8px 0 0' }}>
                Search the library and choose a movement to add to this workout.
              </p>
            </div>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
          </div>

          <div className="picker-toolbar" style={{ marginBottom: 16 }}>
            <input className="input" type="search" placeholder="Search exercise..." value={search} onChange={(event) => setSearch(event.target.value)} />
            <select className="select" value={selectedMuscle} onChange={(event) => setSelectedMuscle(event.target.value)}>
              {MUSCLE_GROUPS.map((muscle) => (
                <option key={muscle} value={muscle}>{muscle}</option>
              ))}
            </select>
          </div>

          {error ? <div className="error-state">{error}</div> : null}
          {loading ? <div className="loading-state"><div className="spinner" aria-label="Loading exercises" /></div> : null}

          <div className="picker-grid">
            {!loading && library.length === 0 ? <div className="empty-state" style={{ gridColumn: '1 / -1' }}>No exercises match your search.</div> : null}
            {library.map((exercise) => (
              <ExerciseCard key={exercise.id ?? exercise._id ?? exercise.exerciseName} exercise={exercise} onSelect={onPick} actionLabel="Pick" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExercisePickerModal;
