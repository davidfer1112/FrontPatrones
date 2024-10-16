import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Función para obtener todos los registros de alojamiento de clientes
export const getAllAccommodationClientRecords = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/accommodation-client-record/all`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los registros de alojamiento de clientes:', error);
        throw error;
    }
};

// Función para obtener un registro de alojamiento de cliente por ID
export const getAccommodationClientRecordById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/accommodation-client-record/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el registro de alojamiento de cliente con ID ${id}:`, error);
        throw error;
    }
};

// Función para registrar una estadía en un alojamiento
export const stayInAccommodation = async (idAccommodation, emailPersona) => {
    try {
        const response = await axios.post(`${BASE_URL}/accommodation-client-record/stayInAccomodation/accommodation/${idAccommodation}/client/${emailPersona}`);
        return response.data;
    } catch (error) {
        console.error('Error al registrar la estadía en el alojamiento:', error);
        throw error;
    }
};

// Función para actualizar un registro de alojamiento de cliente
export const updateAccommodationClientRecordById = async (id, recordData) => {
    try {
        const response = await axios.put(`${BASE_URL}/accommodation-client-record/updateAnAccomodation/${id}`, recordData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el registro de alojamiento de cliente con ID ${id}:`, error);
        throw error;
    }
};

// Función para calificar un alojamiento
export const rateAccommodationById = async (id, ratingData) => {
    try {
        const response = await axios.put(`${BASE_URL}/accommodation-client-record/rateAnAccomodation/${id}`, ratingData);
        return response.data;
    } catch (error) {
        console.error(`Error al calificar el alojamiento con ID ${id}:`, error);
        throw error;
    }
};

// Función para eliminar un registro de alojamiento de cliente por ID
export const deleteAccommodationClientRecordById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/accommodation-client-record/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el registro de alojamiento de cliente con ID ${id}:`, error);
        throw error;
    }
};

// Función para obtener acceso a un alojamiento para un cliente
export const getAccessToAccommodation = async (idAccommodation, emailPersona) => {
    try {
        const response = await axios.get(`${BASE_URL}/accommodation-client-record/getAccessToAccommodation/${idAccommodation}/client/${emailPersona}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener acceso al alojamiento con ID ${idAccommodation} para el cliente ${emailPersona}:`, error);
        throw error;
    }
};
