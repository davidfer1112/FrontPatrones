// services/accommodationService.js
import api from './api';
import Cookies from 'js-cookie';

export const createAccommodation = async (accommodationData) => {
    try {
        const token = Cookies.get('token');
        const response = await api.post('/accommodations', accommodationData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating accommodation');
    }
};

export const getAllAccommodations = async () => {
    try {
        const token = Cookies.get('token');
        const response = await api.get('/accommodations', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching accommodations');
    }
};
