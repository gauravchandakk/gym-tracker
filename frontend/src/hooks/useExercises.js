import { useCallback, useState } from 'react';
import * as exerciseService from '../services/exerciseService';

// useExercises manages exercise data fetching and mutation state for the app.
function useExercises(initialList = []) {
  const [exercises, setExercises] = useState(initialList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSuccess = (response) => {
    const data = response?.data;
    if (Array.isArray(data)) {
      setExercises(data);
    } else if (data) {
      setExercises((currentExercises) => [...currentExercises, data]);
    }
    return data;
  };

  const request = useCallback(async (action) => {
    setLoading(true);
    setError('');

    try {
      const response = await action();
      return response;
    } catch (requestError) {
      const message = requestError?.response?.data?.message || requestError.message || 'Something went wrong';
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    const response = await request(() => exerciseService.getAllExercises());
    handleSuccess(response);
    return response?.data || [];
  }, [request]);

  const fetchByDate = useCallback(async (date) => {
    const response = await request(() => exerciseService.getByDate(date));
    handleSuccess(response);
    return response?.data || [];
  }, [request]);

  const fetchByMuscle = useCallback(async (muscle) => {
    const response = await request(() => exerciseService.getByMuscleGroup(muscle));
    handleSuccess(response);
    return response?.data || [];
  }, [request]);

  const addExercise = useCallback(async (exerciseData) => {
    const response = await request(() => exerciseService.createExercise(exerciseData));
    const createdExercise = response?.data;
    if (createdExercise) {
      setExercises((currentExercises) => [...currentExercises, createdExercise]);
    }
    return createdExercise;
  }, [request]);

  const updateExercise = useCallback(async (id, exerciseData) => {
    const response = await request(() => exerciseService.updateExercise(id, exerciseData));
    const updatedExercise = response?.data;
    setExercises((currentExercises) => currentExercises.map((exercise) => (String(exercise.id) === String(id) ? (updatedExercise || { ...exercise, ...exerciseData, id }) : exercise)));
    return updatedExercise;
  }, [request]);

  const deleteExercise = useCallback(async (id) => {
    await request(() => exerciseService.deleteExercise(id));
    setExercises((currentExercises) => currentExercises.filter((exercise) => String(exercise.id) !== String(id)));
  }, [request]);

  return {
    exercises,
    loading,
    error,
    setExercises,
    fetchAll,
    fetchByDate,
    fetchByMuscle,
    addExercise,
    updateExercise,
    deleteExercise,
  };
}

export default useExercises;