import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ExerciseList from '../components/ExerciseList';
import useExercises from '../hooks/useExercises';

// HomePage combines the filters and the exercise table for the main tracker view.
function HomePage() {
  const navigate = useNavigate();
  const { exercises, loading, error, fetchAll, fetchByDate, fetchByMuscle, deleteExercise } = useExercises();
  const [filters, setFilters] = useState({ date: '', muscleGroup: '' });
  const [exerciseToDelete, setExerciseToDelete] = useState(null);

  const handleSaveNavigation = () => {
    navigate('/add');
  };

  useEffect(() => {
    const loadExercises = async () => {
      try {
        await fetchAll();
      } catch (requestError) {
        // The hook already stores the error message for display.
      }
    };

    loadExercises();
  }, [fetchAll]);

  const handleDateChange = async (date) => {
    setFilters({ date, muscleGroup: '' });
    if (date) {
      try {
        await fetchByDate(date);
      } catch (requestError) {
        // The hook already stores the error message for display.
      }
    } else {
      try {
        await fetchAll();
      } catch (requestError) {
        // The hook already stores the error message for display.
      }
    }
  };

  const handleMuscleChange = async (muscleGroup) => {
    setFilters({ date: '', muscleGroup });
    if (muscleGroup) {
      try {
        await fetchByMuscle(muscleGroup);
      } catch (requestError) {
        // The hook already stores the error message for display.
      }
    } else {
      try {
        await fetchAll();
      } catch (requestError) {
        // The hook already stores the error message for display.
      }
    }
  };

  const handleClearFilters = async () => {
    setFilters({ date: '', muscleGroup: '' });
    try {
      await fetchAll();
    } catch (requestError) {
      // The hook already stores the error message for display.
    }
  };

  const handleEdit = (exercise) => {
    navigate(`/edit/${exercise.id}`, { state: { exercise } });
  };

  const handleDeleteRequest = (exercise) => {
    setExerciseToDelete(exercise);
  };

  const handleDeleteConfirm = async () => {
    if (!exerciseToDelete) {
      return;
    }

    try {
      await deleteExercise(exerciseToDelete.id);
    } catch (requestError) {
      // The hook already stores the error message for display.
    }
    setExerciseToDelete(null);
  };

  return (
    <div>
      <div className="card shadow-sm mb-4 border-primary">
        <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h1 className="display-6 fw-bold mb-2">Gym Daily Exercise Tracker</h1>
            <p className="text-muted mb-0">Keep track of workouts by muscle group, reps, sets, and notes.</p>
          </div>
          <div className="text-md-end">
            <button type="button" className="btn btn-primary btn-lg" onClick={handleSaveNavigation}>
              Save Exercise
            </button>
            <div className="small text-muted mt-2">Opens the form and saves the selected day to your database.</div>
          </div>
        </div>
      </div>
      <FilterBar
        filters={filters}
        onDateChange={handleDateChange}
        onMuscleChange={handleMuscleChange}
        onClearFilters={handleClearFilters}
      />
      <ExerciseList exercises={exercises} loading={loading} error={error} onEdit={handleEdit} onDelete={handleDeleteRequest} />
      <div
        className={`modal fade ${exerciseToDelete ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ backgroundColor: exerciseToDelete ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5 mb-0">Confirm Delete</h2>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setExerciseToDelete(null)} />
            </div>
            <div className="modal-body">
              <p className="mb-0">
                {exerciseToDelete ? `Delete ${exerciseToDelete.exerciseName}? This action cannot be undone.` : null}
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setExerciseToDelete(null)}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;