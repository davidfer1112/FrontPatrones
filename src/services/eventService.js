// services/eventService.js
import api from './api';
import Cookies from 'js-cookie';

const getAuthHeader = () => {
    const token = Cookies.get('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createEvent = async (eventData) => {
    try {
        const response = await api.post('/events', eventData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating event');
    }
};

export const getAllEvents = async () => {
    try {
        const response = await api.get('/events', {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching events');
    }
};

export const getEventById = async (eventId) => {
    try {
        const response = await api.get(`/events/${eventId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching event');
    }
};

export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await api.put(`/events/${eventId}`, eventData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating event');
    }
};

export const deleteEvent = async (eventId) => {
    try {
        const response = await api.delete(`/events/${eventId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting event');
    }
};
