import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getAllExercises = () => axios.get(`${API}/api/exercises`);
export const getExercisesByMuscle = (m) => axios.get(`${API}/api/exercises/muscle/${m}`);
export const searchExercises = (name) => axios.get(`${API}/api/exercises/search?name=${name}`);

export const getAllWorkouts = () => axios.get(`${API}/api/workouts`);
export const getWorkoutById = (id) => axios.get(`${API}/api/workouts/${id}`);
export const getWorkoutByDate = (date) => axios.get(`${API}/api/workouts/date/${date}`);
export const getStats = () => axios.get(`${API}/api/workouts/stats`);
export const createWorkout = (data) => axios.post(`${API}/api/workouts`, data);
export const updateWorkout = (id, data) => axios.put(`${API}/api/workouts/${id}`, data);
export const deleteWorkout = (id) => axios.delete(`${API}/api/workouts/${id}`);

export const addExerciseToWorkout = (data) => axios.post(`${API}/api/workout-exercises`, data);
export const removeExerciseFromWorkout = (id) => axios.delete(`${API}/api/workout-exercises/${id}`);

export const addSet = (data) => axios.post(`${API}/api/sets`, data);
export const updateSet = (id, data) => axios.put(`${API}/api/sets/${id}`, data);
export const deleteSet = (id) => axios.delete(`${API}/api/sets/${id}`);