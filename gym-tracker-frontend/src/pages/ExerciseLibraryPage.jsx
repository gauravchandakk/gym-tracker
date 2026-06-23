import React, { useEffect, useMemo, useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';
import { getAllExercises } from '../services/exerciseService';
import { MUSCLE_GROUPS, getExerciseName, normalizeCollection } from '../utils/helpers';

function ExerciseLibraryPage() {
  const [library, setLibrary] = useState([]);
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getAllExercises();
        setLibrary(normalizeCollection(response?.data));
      } catch (requestError) {
        setError(requestError?.response?.data?.message || requestError.message || 'Unable to load exercise library.');
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  const filteredLibrary = useMemo(
    () => library.filter((exercise) => {
      const name = getExerciseName(exercise).toLowerCase();
      const matchesQuery = !query.trim() || name.includes(query.trim().toLowerCase());
      const matchesMuscle = muscle === 'All' || exercise?.muscleGroup === muscle;
      return matchesQuery && matchesMuscle;
    }),
    [library, query, muscle],
  );

  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="page-header">
          <div>
            <h1 className="page-title" style={{ fontSize: '2rem' }}>Exercise Library</h1>
            <p className="page-subtitle">Browse your movement catalog and filter by muscle group.</p>
          </div>
        </div>
      </section>

      <section className="surface-card">
        <div className="form-grid two">
          <div>
            <label className="field-label" htmlFor="exerciseSearch">Search exercise...</label>
            <input id="exerciseSearch" className="input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="muscleFilter">Muscle group</label>
            <select id="muscleFilter" className="select" value={muscle} onChange={(event) => setMuscle(event.target.value)}>
              {MUSCLE_GROUPS.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-row" style={{ marginTop: 16 }}>
          {MUSCLE_GROUPS.map((group) => (
            <button key={group} type="button" className={`filter-button ${muscle === group ? 'active' : ''}`} onClick={() => setMuscle(group)}>
              {group}
            </button>
          ))}
        </div>
      </section>

      {error ? <div className="error-state">{error}</div> : null}
      {loading ? <div className="loading-state"><div className="spinner" aria-label="Loading exercise library" /></div> : null}

      <div className="exercise-grid picker-grid">
        {!loading && filteredLibrary.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>No exercises found.</div>
        ) : null}
        {filteredLibrary.map((exercise) => (
          <ExerciseCard key={exercise.id ?? exercise._id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}

export default ExerciseLibraryPage;