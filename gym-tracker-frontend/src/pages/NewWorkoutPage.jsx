import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createWorkout, updateWorkout } from '../services/exerciseService';
import { getTodayDate, getEntityId } from '../utils/helpers';

function NewWorkoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const workoutToEdit = location.state?.workout || null;
  const [formData, setFormData] = useState({
    title: 'Push Day',
    date: getTodayDate(),
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (workoutToEdit) {
      setFormData({
        title: workoutToEdit.title || workoutToEdit.name || 'Workout',
        date: String(workoutToEdit.date || getTodayDate()).slice(0, 10),
        notes: workoutToEdit.notes || '',
      });
    }
  }, [workoutToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        title: formData.title,
        workoutDate: formData.date,
        notes: formData.notes,
      };

      const response = workoutToEdit
        ? await updateWorkout(workoutToEdit.id ?? workoutToEdit._id, payload)
        : await createWorkout(payload);

      const nextId = getEntityId(response?.data) ?? workoutToEdit?.id ?? workoutToEdit?._id;
      navigate(nextId ? `/workouts/${nextId}` : '/workouts');
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to save workout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="page-header">
          <div>
            <h1 className="page-title" style={{ fontSize: '2rem' }}>{workoutToEdit ? 'Edit Workout' : 'Log Workout'}</h1>
            <p className="page-subtitle">Create the shell for a workout session, then open it to add exercises and sets.</p>
          </div>
        </div>
      </section>

      <section className="form-card">
        {error ? <div className="error-state">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <div className="form-grid two">
            <div>
              <label className="field-label" htmlFor="title">Title</label>
              <input id="title" name="title" className="input" value={formData.title} onChange={handleChange} placeholder="Push Day" required />
            </div>
            <div>
              <label className="field-label" htmlFor="date">Date</label>
              <input id="date" name="date" type="date" className="input" value={formData.date} onChange={handleChange} required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="field-label" htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                className="textarea"
                rows="5"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Warm-up focus, tempo cues, or recovery notes..."
              />
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: 20 }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : workoutToEdit ? 'Update Workout' : 'Create Workout'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/workouts')}>Cancel</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewWorkoutPage;
