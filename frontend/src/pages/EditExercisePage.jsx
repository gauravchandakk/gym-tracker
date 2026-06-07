import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ExerciseForm from '../components/ExerciseForm';
import * as exerciseService from '../services/exerciseService';
import useExercises from '../hooks/useExercises';

// EditExercisePage loads an existing exercise and passes it to the form.
function EditExercisePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { updateExercise } = useExercises();
  const [exercise, setExercise] = useState(location.state?.exercise || null);
  const [loading, setLoading] = useState(!location.state?.exercise);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExercise = async () => {
      if (exercise) {
        setLoading(false);
        return;
      }

      try {
        const response = await exerciseService.getExerciseById(id);
        setExercise(response.data);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || requestError.message || 'Unable to load exercise.');
      } finally {
        setLoading(false);
      }
    };

    loadExercise();
  }, [exercise, id]);

  const handleUpdateExercise = async (exerciseData) => {
    await updateExercise(id, exerciseData);
  };

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status" aria-label="Loading exercise">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <ExerciseForm
      mode="edit"
      initialValues={exercise}
      onSubmit={handleUpdateExercise}
      onCancel={() => navigate('/')}
    />
  );
}

export default EditExercisePage;