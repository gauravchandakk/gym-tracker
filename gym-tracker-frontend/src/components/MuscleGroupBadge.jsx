import React from 'react';
import { MUSCLE_BADGE_COLORS } from '../utils/helpers';

function MuscleGroupBadge({ group }) {
  const color = MUSCLE_BADGE_COLORS[group] || '#475569';

  return (
    <span className="muscle-badge" style={{ backgroundColor: color }}>
      {group || 'Unknown'}
    </span>
  );
}

export default MuscleGroupBadge;
