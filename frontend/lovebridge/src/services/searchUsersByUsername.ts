// services/userService.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  profile: {
    id: number | null;
    avatar: string | null;
  };
};

const authHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
});

export const searchUsersByUsername = async (
  userName: string,
  token: string
): Promise<User[]> => {
  if (!userName || userName.trim() === '') {
    throw new Error('El nombre de usuario es obligatorio');
  }

  try {
    const response = await axios.get(
      `${API_URL}/users/search/${encodeURIComponent(userName)}`,
      authHeader(token)
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Error al buscar usuarios';
  }
};
