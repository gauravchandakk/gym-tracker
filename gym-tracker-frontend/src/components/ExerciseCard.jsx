import React from 'react';
import { formatDate } from '../utils/helpers';

// ExerciseCard renders one exercise row inside the table.
function ExerciseCard({ exercise, onEdit, onDelete, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td>{exercise.exerciseName}</td>
      <td>{exercise.muscleGroup}</td>
      <td>{exercise.sets}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight ?? '-'}</td>
      <td>{formatDate(exercise.date)}</td>
      <td>{exercise.notes || '-'}</td>
      <td>
        <div className="btn-group btn-group-sm" role="group" aria-label="Exercise actions">
          <button type="button" className="btn btn-warning" onClick={() => onEdit(exercise)}>
            Edit
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onDelete(exercise)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ExerciseCard;