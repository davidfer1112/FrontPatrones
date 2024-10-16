import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Función para obtener todos los alojamientos
export const getAllAccommodations = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/accommodations/all`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los alojamientos:', error);
        throw error;
    }
};

// Función para obtener un alojamiento por ID
export const getAccommodationById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/accommodations/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el alojamiento con ID ${id}:`, error);
        throw error;
    }
};

// Función para crear un nuevo alojamiento
export const createAccommodation = async (accommodationData) => {
    try {
        const response = await axios.post(`${BASE_URL}/accommodations`, accommodationData);
        return response.data;
    } catch (error) {
        console.error('Error al crear alojamiento:', error);
        throw error;
    }
};

// Función para actualizar un alojamiento por ID
export const updateAccommodationById = async (id, accommodationData) => {
    try {
        const response = await axios.put(`${BASE_URL}/accommodations/${id}`, accommodationData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el alojamiento con ID ${id}:`, error);
        throw error;
    }
};

// Función para eliminar un alojamiento por ID
export const deleteAccommodationById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/accommodations/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el alojamiento con ID ${id}:`, error);
        throw error;
    }
};
