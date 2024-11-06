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
        // Guardar el token en la cookie "token"
        Cookies.set('token', response.data.token, { expires: 1 });
        // Guardar el rol en la cookie "rol"
        Cookies.set('rol', credentials.role, { expires: 1 });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
};
