export const MUSCLE_GROUPS = ['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core'];

export const MUSCLE_BADGE_COLORS = {
  Chest: '#dc2626',
  Back: '#2563eb',
  Legs: '#16a34a',
  Shoulders: '#d97706',
  Biceps: '#7c3aed',
  Triceps: '#0891b2',
  Core: '#be185d',
};

export const getTodayDate = () => new Date().toISOString().slice(0, 10);

export const formatDate = (dateValue) => {
  if (!dateValue) {
    return '-';
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return String(dateValue);
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatCompactDate = (dateValue) => {
  if (!dateValue) {
    return '-';
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return String(dateValue);
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(Number(value || 0));

export const getEntityId = (entity) => entity?.id ?? entity?._id ?? entity?.workoutId ?? entity?.exerciseId ?? null;

export const normalizeCollection = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  return data?.content ?? data?.items ?? data?.data ?? data?.results ?? [];
};

export const getExerciseName = (exercise) => exercise?.name || exercise?.exerciseName || exercise?.title || 'Exercise';

export const getWorkoutTitle = (workout) => workout?.title || workout?.name || 'Workout';

export const getWorkoutExercises = (workout) => normalizeCollection(workout?.exercises ?? workout?.workoutExercises ?? []);

export const getExerciseSets = (exercise) => normalizeCollection(exercise?.sets ?? exercise?.exerciseSets ?? []);

export const countWorkoutExercises = (workout) => getWorkoutExercises(workout).length;

export const countWorkoutSets = (workout) =>
  getWorkoutExercises(workout).reduce((total, exercise) => total + getExerciseSets(exercise).length, 0);

export const sumWorkoutVolume = (workout) =>
  getWorkoutExercises(workout).reduce((total, exercise) => {
    const exerciseVolume = getExerciseSets(exercise).reduce((setTotal, setItem) => {
      const reps = Number(setItem?.reps || 0);
      const weight = Number(setItem?.weight || 0);
      return setTotal + reps * weight;
    }, 0);

    return total + exerciseVolume;
  }, 0);

export const calculateCurrentStreak = (workouts = []) => {
  const orderedDates = [...new Set(workouts.map((workout) => new Date(workout?.date || workout?.createdAt).toDateString()))]
    .filter((entry) => entry !== 'Invalid Date')
    .map((entry) => new Date(entry))
    .sort((left, right) => right - left);

  if (orderedDates.length === 0) {
    return 0;
  }

  let streak = 1;
  let cursor = new Date(orderedDates[0]);

  for (let index = 1; index < orderedDates.length; index += 1) {
    const expected = new Date(cursor);
    expected.setDate(expected.getDate() - 1);

    if (orderedDates[index].toDateString() === expected.toDateString()) {
      streak += 1;
      cursor = orderedDates[index];
    } else {
      break;
    }
  }

  return streak;
};