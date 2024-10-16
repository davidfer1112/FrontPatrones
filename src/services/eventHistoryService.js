import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Función para obtener todos los registros de eventos de clientes
export const getAllEventClientRecords = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/event-client-record/all`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los registros de eventos de clientes:', error);
        throw error;
    }
};

// Función para obtener un registro de evento de cliente por ID
export const getEventClientRecordById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/event-client-record/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el registro de evento de cliente con ID ${id}:`, error);
        throw error;
    }
};

// Función para registrar la asistencia de un cliente a un evento
export const attendEvent = async (idEvent, emailPersona, numberBuyedTickets) => {
    try {
        const response = await axios.post(`${BASE_URL}/event-client-record/attendEvent/event/${idEvent}/client/${emailPersona}/tickets/${numberBuyedTickets}`);
        return response.data;
    } catch (error) {
        console.error(`Error al registrar la asistencia del cliente al evento con ID ${idEvent}:`, error);
        throw error;
    }
};

// Función para actualizar un registro de evento de cliente por ID
export const updateEventClientRecordById = async (id, recordData) => {
    try {
        const response = await axios.put(`${BASE_URL}/event-client-record/${id}`, recordData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el registro de evento de cliente con ID ${id}:`, error);
        throw error;
    }
};

// Función para eliminar un registro de evento de cliente por ID
export const deleteEventClientRecordById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/event-client-record/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el registro de evento de cliente con ID ${id}:`, error);
        throw error;
    }
};
