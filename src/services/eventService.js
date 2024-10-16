import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Función para obtener todos los eventos
export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/events/all`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los eventos:', error);
        throw error;
    }
};

// Función para obtener un evento por ID
export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/events/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el evento con ID ${id}:`, error);
        throw error;
    }
};

// Función para crear un evento sin alojamiento
export const createEventWithoutAccommodation = async (eventData) => {
    try {
        const response = await axios.post(`${BASE_URL}/events/without-accommodation`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error al crear evento sin alojamiento:', error);
        throw error;
    }
};

// Función para actualizar un evento por ID
export const updateEventById = async (id, eventData) => {
    try {
        const response = await axios.put(`${BASE_URL}/events/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el evento con ID ${id}:`, error);
        throw error;
    }
};

// Función para eliminar un evento por ID
export const deleteEventById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/events/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el evento con ID ${id}:`, error);
        throw error;
    }
};

// Función para añadir alojamiento a un evento
export const addAccommodationToEvent = async (idEvent, idAccommodation) => {
    try {
        const response = await axios.put(`${BASE_URL}/events/${idEvent}/add-accommodation/${idAccommodation}`);
        return response.data;
    } catch (error) {
        console.error(`Error al añadir alojamiento al evento con ID ${idEvent}:`, error);
        throw error;
    }
};

// Función para obtener la información actual de un evento
export const getEventCurrentInfo = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/events/${id}/current-info`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la información actual del evento con ID ${id}:`, error);
        throw error;
    }
};
