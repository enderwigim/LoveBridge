import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configurar el encabezado con el token
const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Servicio para obtener el perfil por nombre de usuario
export const getProfileByUserName = async (userName, token) => {
  try {
    const response = await axios.get(
      `${API_URL}/profiles/username/${userName}`,
      authHeader(token)
    );
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener el perfil';
  }
};
