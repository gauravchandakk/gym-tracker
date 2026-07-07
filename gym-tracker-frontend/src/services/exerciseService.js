import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllExercises = () => api.get('/api/exercises');
export const getExercisesByMuscle = (muscle) => api.get(`/api/exercises/muscle/${muscle}`);
export const searchExercises = (name) => api.get(`/api/exercises/search?name=${encodeURIComponent(name)}`);

export const getAllWorkouts = () => api.get('/api/workouts');
export const getWorkoutById = (id) => api.get(`/api/workouts/${id}`);
export const getWorkoutByDate = (date) => api.get(`/api/workouts/date/${date}`);
export const getStats = () => api.get('/api/workouts/stats');
export const createWorkout = (data) => api.post('/api/workouts', data);
export const updateWorkout = (id, data) => api.put(`/api/workouts/${id}`, data);
export const deleteWorkout = (id) => api.delete(`/api/workouts/${id}`);

export const addExerciseToWorkout = (data) => api.post('/api/workout-exercises', data);
export const removeExerciseFromWorkout = (id) => api.delete(`/api/workout-exercises/${id}`);

export const addSet = (data) => api.post('/api/sets', data);
export const updateSet = (id, data) => api.put(`/api/sets/${id}`, data);
export const deleteSet = (id) => api.delete(`/api/sets/${id}`);

export const getExerciseById = (id) => api.get(`/api/exercises/${id}`);
export const getByDate = (date) => api.get(`/api/exercises/date/${date}`);
export const getByMuscleGroup = (muscle) => api.get(`/api/exercises/muscle/${muscle}`);
export const createExercise = (data) => api.post('/api/exercises', data);
export const updateExercise = (id, data) => api.put(`/api/exercises/${id}`, data);
export const deleteExercise = (id) => api.delete(`/api/exercises/${id}`);

export default api;