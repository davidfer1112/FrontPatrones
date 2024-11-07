// services/notificationService.js
import api from './api';
import Cookies from 'js-cookie';

export const createAccessNotification = async (notificationData) => {
    try {
        const token = Cookies.get('token'); // Obtener el token de las cookies
        const response = await api.post('/access', notificationData, {
            headers: { Authorization: `Bearer ${token}` }, // Asegurarse de incluir el token en los headers
        });
        return response.data;
    } catch (error) {
        console.error('Error response data:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Error creating notification');
    }
};


export const getNotificationsByUserId = async (userId) => {
    try {
        const token = Cookies.get('token');
        const response = await api.get(`/notifications/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching notifications');
    }
};
