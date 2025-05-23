import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Configurar el encabezado con el token
const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Servicio para obtener el perfil por nombre de usuario
export const getProfileByUserName = async (userName, token) => {
  console.log('🔍 userName recibido en servicio:', userName);
  console.trace('📍 Traza desde getProfileByUserName');
  if (!userName) {
    throw 'Nombre de usuario no válido';
  }

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
