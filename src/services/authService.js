// services/authService.js
import api from './api';
import Cookies from 'js-cookie';

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error registering user');
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);

        const { token, userId, role } = response.data; // Desestructurar los datos de la respuesta

        // Guardar el token en la cookie "token"
        Cookies.set('token', token, { expires: 1 });

        // Guardar el rol en la cookie "rol"
        Cookies.set('rol', role, { expires: 1 });

        // Guardar el userId en la cookie "id"
        Cookies.set('id', userId, { expires: 1 });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
};
