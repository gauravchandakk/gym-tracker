import React from 'react';
import ExerciseCard from './ExerciseCard';

// ExerciseList displays all exercises in a Bootstrap table.
function ExerciseList({ exercises, loading, error, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status" aria-label="Loading exercises">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {exercises.length === 0 ? (
          <p className="mb-0 text-muted">No exercises found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Exercise Name</th>
                  <th scope="col">Muscle Group</th>
                  <th scope="col">Sets</th>
                  <th scope="col">Reps</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Date</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id ?? exercise._id ?? index}
                    exercise={exercise}
                    index={index + 1}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseList;