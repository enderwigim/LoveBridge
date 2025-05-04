import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data; // aquí vendría el token
  } catch (error) {
    // Puedes personalizar el mensaje según el error
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
};

export const registerService = async (name, email, password, password_confirmation) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            password,
            password_confirmation
        });
        return response.data; // aquí vendría el token o la respuesta del registro
        
    }   catch (error) {
        // Puedes personalizar el mensaje según el error
        throw error.response?.data?.message || 'Error al iniciar sesión';
    }
}