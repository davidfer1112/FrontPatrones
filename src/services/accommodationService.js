// services/accommodationService.js
import api from './api';

export const createAccommodation = async (accommodationData) => {
    try {
        const response = await api.post('/accommodations', accommodationData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating accommodation');
    }
};

export const getAllAccommodations = async () => {
    try {
        const response = await api.get('/accommodations');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching accommodations');
    }
};
