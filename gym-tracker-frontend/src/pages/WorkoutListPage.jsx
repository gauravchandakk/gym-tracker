import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import { deleteWorkout, getAllWorkouts, getWorkoutByDate } from '../services/exerciseService';
import { formatDate, getTodayDate, normalizeCollection } from '../utils/helpers';

function WorkoutListPage() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadWorkouts = async (date = '') => {
    setLoading(true);
    setError('');

    try {
      const response = date ? await getWorkoutByDate(date) : await getAllWorkouts();
      setWorkouts(normalizeCollection(response?.data));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to load workouts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const handleDelete = async (workout) => {
    const confirmed = window.confirm(`Delete ${workout?.title || 'this workout'}?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteWorkout(workout.id ?? workout._id);
      await loadWorkouts(selectedDate);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to delete workout.');
    }
  };

  const handleDateChange = async (event) => {
    const nextDate = event.target.value;
    setSelectedDate(nextDate);
    await loadWorkouts(nextDate);
  };

  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="page-header">
          <div>
            <h1 className="page-title" style={{ fontSize: '2rem' }}>My Workouts</h1>
            <p className="page-subtitle">Manage every logged session from one dark, focused workspace.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/workout/new')}>Start New Workout</button>
        </div>
      </section>

      <section className="surface-card">
        <div className="form-grid two" style={{ alignItems: 'end' }}>
          <div>
            <label className="field-label" htmlFor="dateFilter">Filter by date</label>
            <input id="dateFilter" type="date" className="input" value={selectedDate} max={getTodayDate()} onChange={handleDateChange} />
          </div>
          <button type="button" className="btn btn-outline" onClick={() => { setSelectedDate(''); loadWorkouts(); }}>Clear filter</button>
        </div>
      </section>

      {error ? <div className="error-state">{error}</div> : null}
      {loading ? <div className="loading-state"><div className="spinner" aria-label="Loading workouts" /></div> : null}

      <div className="workout-grid list">
        {!loading && workouts.length === 0 ? <div className="empty-state" style={{ gridColumn: '1 / -1' }}>No workouts found for {selectedDate ? formatDate(selectedDate) : 'your current filter'}.</div> : null}
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id ?? workout._id}
            workout={workout}
            onOpen={() => navigate(`/workouts/${workout.id ?? workout._id}`)}
            onEdit={(item) => navigate(`/workouts/${item.id ?? item._id}`)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default WorkoutListPage;
