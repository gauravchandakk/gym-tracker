import React from 'react';
import { countWorkoutExercises, countWorkoutSets, formatDate, getWorkoutTitle, sumWorkoutVolume } from '../utils/helpers';

function WorkoutCard({ workout, compact = false, onOpen, onEdit, onDelete }) {
  const title = getWorkoutTitle(workout);
  const dateLabel = formatDate(workout?.date || workout?.createdAt);

  return (
    <article className="workout-card" onClick={() => onOpen?.(workout)} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && onOpen?.(workout)}>
      <div className="section-heading" style={{ marginBottom: 10 }}>
        <div>
          <div className="card-meta">
            <span className="badge-muted">{dateLabel}</span>
          </div>
          <h4>{title}</h4>
        </div>
        <span className="pill badge-muted">{countWorkoutExercises(workout)} exercises</span>
      </div>

      <div className="card-meta" style={{ marginBottom: compact ? 0 : 14 }}>
        <span><span className="metric-value">{countWorkoutSets(workout)}</span> total sets</span>
        <span><span className="metric-value">{sumWorkoutVolume(workout)}</span> kg volume</span>
      </div>

      {!compact ? (
        <div className="card-actions" onClick={(event) => event.stopPropagation()}>
          {onEdit ? (
            <button type="button" className="btn btn-secondary" onClick={() => onEdit(workout)}>
              Edit
            </button>
          ) : null}
          {onDelete ? (
            <button type="button" className="btn btn-danger" onClick={() => onDelete(workout)}>
              Delete
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export default WorkoutCard;
