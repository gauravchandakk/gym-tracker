import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExercisePickerModal from '../components/ExercisePickerModal';
import MuscleGroupBadge from '../components/MuscleGroupBadge';
import SetRow from '../components/SetRow';
import {
  addExerciseToWorkout,
  addSet,
  getAllExercises,
  getWorkoutById,
  removeExerciseFromWorkout,
  updateSet,
  updateWorkout,
} from '../services/exerciseService';
import { formatDate, getExerciseName, getExerciseSets, getEntityId, getWorkoutExercises, getWorkoutTitle, normalizeCollection } from '../utils/helpers';

const makeTempId = () => `temp-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const normalizeWorkout = (workoutData) => ({
  ...workoutData,
  id: getEntityId(workoutData),
  title: getWorkoutTitle(workoutData),
  date: workoutData?.date || workoutData?.createdAt || '',
  notes: workoutData?.notes || '',
  completed: Boolean(workoutData?.completed || workoutData?.status === 'completed'),
  exercises: normalizeCollection(workoutData?.exercises ?? workoutData?.workoutExercises ?? []).map((exercise) => ({
    ...exercise,
    id: getEntityId(exercise),
    workoutExerciseId: exercise?.workoutExerciseId ?? getEntityId(exercise),
    exerciseId: exercise?.exerciseId ?? getEntityId(exercise?.exercise),
    name: getExerciseName(exercise?.exercise || exercise),
    muscleGroup: exercise?.muscleGroup || exercise?.exercise?.muscleGroup || 'Core',
    sets: normalizeCollection(exercise?.sets ?? exercise?.exerciseSets ?? []).map((setItem, index) => ({
      ...setItem,
      id: getEntityId(setItem) ?? setItem?.tempId ?? makeTempId(),
      setNumber: setItem?.setNumber ?? index + 1,
      reps: setItem?.reps ?? '',
      weight: setItem?.weight ?? '',
      completed: Boolean(setItem?.completed),
    })),
  })),
});

function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [exerciseLibrary, setExerciseLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const loadWorkout = async () => {
      setLoading(true);
      setError('');

      try {
        const [workoutResponse, exerciseResponse] = await Promise.all([getWorkoutById(id), getAllExercises()]);
        setWorkout(normalizeWorkout(workoutResponse?.data || {}));
        setExerciseLibrary(normalizeCollection(exerciseResponse?.data));
      } catch (requestError) {
        setError(requestError?.response?.data?.message || requestError.message || 'Unable to load workout.');
      } finally {
        setLoading(false);
      }
    };

    loadWorkout();
  }, [id]);

  const exercises = useMemo(() => getWorkoutExercises(workout), [workout]);

  const persistWorkout = async (nextWorkout) => {
    await updateWorkout(nextWorkout.id, {
      title: nextWorkout.title,
      date: nextWorkout.date,
      notes: nextWorkout.notes,
      completed: nextWorkout.completed,
    });
  };

  const updateWorkoutField = (field, value) => {
    setWorkout((current) => {
      const nextWorkout = { ...current, [field]: value };
      persistWorkout(nextWorkout).catch((requestError) => {
        setError(requestError?.response?.data?.message || requestError.message || 'Unable to save workout.');
      });
      return nextWorkout;
    });
  };

  const updateSetOnWorkout = (exerciseId, setId, patch) => {
    setWorkout((current) => ({
      ...current,
      exercises: getWorkoutExercises(current).map((exercise) => {
        if (String(exercise.id) !== String(exerciseId)) {
          return exercise;
        }

        return {
          ...exercise,
          sets: getExerciseSets(exercise).map((setItem) => {
            if (String(setItem.id) !== String(setId)) {
              return setItem;
            }

            const nextSet = { ...setItem, ...patch };
            updateSet(setId, {
              reps: nextSet.reps,
              weight: nextSet.weight,
              completed: nextSet.completed,
              setNumber: nextSet.setNumber,
              workoutExerciseId: exercise.workoutExerciseId ?? exercise.id,
            }).catch((requestError) => {
              setError(requestError?.response?.data?.message || requestError.message || 'Unable to save set.');
            });
            return nextSet;
          }),
        };
      }),
    }));
  };

 const handleAddSet = async (exercise) => {
    try {
      const response = await addSet({
        workoutExerciseId: exercise.workoutExerciseId ?? exercise.id,  // ✅ keep
        setNumber: exercise.sets.length + 1,                           // ✅ keep
        reps: 0,                                                        // ✅ 0 not ''
        weight: null,                                                   // ✅ null not ''
        completed: false,
        
      });

      const createdSet = response?.data || { id: makeTempId(), reps: 0, weight: null, completed: false };

      setWorkout((current) => ({
        ...current,
        exercises: getWorkoutExercises(current).map((currentExercise) => {
          if (String(currentExercise.id) !== String(exercise.id)) {
            return currentExercise;
          }
          return {
            ...currentExercise,
            sets: [...getExerciseSets(currentExercise), createdSet],
          };
        }),
      }));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to add set.');
    }
  };

  const handleAddExercise = async (exercise) => {
    try {
      await addExerciseToWorkout({ workoutId: id, exerciseId: getEntityId(exercise) });
      const response = await getWorkoutById(id);
      setWorkout(normalizeWorkout(response?.data || {}));
      setPickerOpen(false);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to add exercise.');
    }
  };

  const handleRemoveExercise = async (exercise) => {
    try {
      await removeExerciseFromWorkout(exercise.workoutExerciseId ?? exercise.id ?? exercise._id);
      setWorkout((current) => ({
        ...current,
        exercises: getWorkoutExercises(current).filter((item) => String(item.id) !== String(exercise.id)),
      }));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to remove exercise.');
    }
  };

  const handleFinishWorkout = async () => {
    try {
      await updateWorkout(id, { ...(workout || {}), completed: true, status: 'completed' });
      navigate('/workouts');
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to finish workout.');
    }
  };

  if (loading) {
    return <div className="loading-state"><div className="spinner" aria-label="Loading workout" /></div>;
  }

  if (error && !workout) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="page-header">
          <div>
            <h1 className="page-title" style={{ fontSize: '2rem' }}>{workout?.title}</h1>
            <div className="card-meta" style={{ marginTop: 10 }}>
              <span className="badge-muted">{formatDate(workout?.date || workout?.createdAt)}</span>
              <span className="badge-muted">{exercises.length} exercises</span>
              <span className={`badge-muted ${workout?.completed ? 'status-chip' : ''}`}>{workout?.completed ? 'Completed' : 'In progress'}</span>
            </div>
          </div>
          <div className="hero-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/workouts')}>Back to Workouts</button>
            <button type="button" className="btn btn-success" onClick={handleFinishWorkout}>Finish Workout</button>
          </div>
        </div>
        <textarea className="textarea" style={{ marginTop: 16 }} rows="3" value={workout?.notes || ''} onChange={(event) => updateWorkoutField('notes', event.target.value)} placeholder="Workout notes" />
      </section>

      {error ? <div className="error-state">{error}</div> : null}

      <div className="detail-stack">
        {exercises.length === 0 ? <div className="empty-state">No exercises added yet. Use the button below to build this session.</div> : null}

        {exercises.map((exercise) => (
          <article key={exercise.id} className="detail-section">
            <div className="exercise-header">
              <div>
                <h3>{exercise.name}</h3>
                <div style={{ marginTop: 10 }}>
                  <MuscleGroupBadge group={exercise.muscleGroup} />
                </div>
              </div>
              <button type="button" className="btn btn-ghost" onClick={() => handleRemoveExercise(exercise)}>Remove Exercise</button>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>Previous</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>✓</th>
                  </tr>
                </thead>
                <tbody>
                  {getExerciseSets(exercise).map((setItem, index) => {
                    const previous = index > 0 ? getExerciseSets(exercise)[index - 1] : null;
                    return (
                      <SetRow
                        key={setItem.id ?? `${exercise.id}-${index}`}
                        setItem={setItem}
                        setIndex={index}
                        previousLabel={previous ? `${previous.reps || 0} reps / ${previous.weight || 0} kg` : '-'}
                        onChange={(field, value) => updateSetOnWorkout(exercise.id, setItem.id, { [field]: value })}
                        onToggleCompleted={(checked) => updateSetOnWorkout(exercise.id, setItem.id, { completed: checked })}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="toolbar" style={{ marginTop: 16 }}>
              <button type="button" className="btn btn-outline" onClick={() => handleAddSet(exercise)}>+ Add Set</button>
            </div>
          </article>
        ))}
      </div>

      <div className="page-toolbar" style={{ marginTop: 24 }}>
        <button type="button" className="btn btn-primary" onClick={() => setPickerOpen(true)}>+ Add Exercise</button>
      </div>

      <ExercisePickerModal open={pickerOpen} onClose={() => setPickerOpen(false)} onPick={handleAddExercise} />
    </div>
  );
}

export default WorkoutDetailPage;
