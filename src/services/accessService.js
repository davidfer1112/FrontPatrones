// services/accessService.js
import api from './api';

export const logAccess = async (accessData) => {
    try {
        const response = await api.post('/access', accessData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging access');
    }
};

export const getAccessLogs = async () => {
    try {
        const response = await api.get('/access', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching access logs');
    }
};
