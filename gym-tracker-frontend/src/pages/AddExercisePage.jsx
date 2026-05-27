import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseForm from '../components/ExerciseForm';
import useExercises from '../hooks/useExercises';

// AddExercisePage wraps the exercise form for creating a new exercise entry.
function AddExercisePage() {
  const navigate = useNavigate();
  const { addExercise } = useExercises();

  const handleAddExercise = async (exerciseData) => {
    await addExercise(exerciseData);
  };

  return (
    <div>
      <div className="alert alert-info shadow-sm mb-4">
        Fill in the workout details and press Save Exercise to store the selected date in your database.
      </div>
      <ExerciseForm
        mode="add"
        onSubmit={handleAddExercise}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}

export default AddExercisePage;