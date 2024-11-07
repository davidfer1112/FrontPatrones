// services/userAccommodationHistoryService.js
import api from './api';
import Cookies from 'js-cookie';

// Obtener el historial de alojamientos de un usuario
export const getUserAccommodationHistory = async (userId) => {
    try {
        const token = Cookies.get('token');
        const response = await api.get(`/user-accommodation-history/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching accommodation history');
    }
};

// Crear una entrada en el historial de alojamientos
export const createUserAccommodationHistory = async (historyData) => {
    try {
        const token = Cookies.get('token');
        const response = await api.post('/user-accommodation-history', historyData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating accommodation history');
    }
};
