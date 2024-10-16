import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/all`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        throw error;
    }
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el usuario con ID ${id}:`, error);
        throw error;
    }
};

// Función para registrar un usuario
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
};

// Función para actualizar un usuario por ID
export const updateUserById = async (id, userData) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el usuario con ID ${id}:`, error);
        throw error;
    }
};

// Función para eliminar un usuario por ID
export const deleteUserById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el usuario con ID ${id}:`, error);
        throw error;
    }
};

// Función para marcar un usuario como inactivo
export const deactivateUser = async (id) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/unnactive_user/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al desactivar el usuario con ID ${id}:`, error);
        throw error;
    }
};

// Función para activar un usuario
export const activateUser = async (id) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/active_user/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al activar el usuario con ID ${id}:`, error);
        throw error;
    }
};

// Función para login de usuario
export const loginUser = async (email, password) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/login/${email}/${password}`);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};
