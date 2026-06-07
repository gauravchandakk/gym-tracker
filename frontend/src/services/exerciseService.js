import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/exercises',  // ✅ direct URL, no proxy
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllExercises = () => axiosInstance.get('');
export const getExerciseById = (id) => axiosInstance.get(`/${id}`);
export const getByDate = (date) => axiosInstance.get(`/date/${date}`);
export const getByMuscleGroup = (muscle) => axiosInstance.get(`/muscle/${muscle}`);
export const createExercise = (data) => axiosInstance.post('', data);
export const updateExercise = (id, data) => axiosInstance.put(`/${id}`, data);
export const deleteExercise = (id) => axiosInstance.delete(`/${id}`);

export default axiosInstance;