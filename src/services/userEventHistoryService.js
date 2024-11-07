// services/userEventHistoryService.js
import api from './api';
import Cookies from 'js-cookie';

// Obtener el historial de eventos de un usuario
export const getUserEventHistory = async (userId) => {
    try {
        const token = Cookies.get('token');
        const response = await api.get(`/user-event-history/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching event history');
    }
};

// Crear una entrada en el historial de eventos
export const createUserEventHistory = async (historyData) => {
    try {
        const token = Cookies.get('token');
        const response = await api.post('/user-event-history', historyData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating event history');
    }
};
