// services/notificationService.js
import api from './api';

export const createNotification = async (notificationData) => {
    try {
        const response = await api.post('/notifications', notificationData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating notification');
    }
};

export const getNotificationsByUserId = async (userId) => {
    try {
        const response = await api.get(`/notifications/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching notifications');
    }
};
