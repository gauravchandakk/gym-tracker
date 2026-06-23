import React from 'react';
import MuscleGroupBadge from './MuscleGroupBadge';
import { getExerciseName } from '../utils/helpers';

function ExerciseCard({ exercise, onSelect, actionLabel = 'Add Exercise' }) {
  return (
    <article
      className="exercise-card"
      onClick={() => onSelect?.(exercise)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => event.key === 'Enter' && onSelect?.(exercise)}
    >
      <div className="section-heading" style={{ marginBottom: 12 }}>
        <div>
          <h4>{getExerciseName(exercise)}</h4>
          <p className="muted" style={{ margin: 0 }}>
            Built for strong, repeatable work.
          </p>
        </div>
      </div>
      <MuscleGroupBadge group={exercise?.muscleGroup} />
      {onSelect ? (
        <button type="button" className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => onSelect(exercise)}>
          {actionLabel}
        </button>
      ) : null}
    </article>
  );
}

export default ExerciseCard;