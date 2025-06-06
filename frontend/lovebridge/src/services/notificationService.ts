import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export type Notification = {
  id: number;
  user_id: number;
  type: string;
  data: {
    message: string;
    [key: string]: any;
  };
  read: boolean;
  created_at: string;
  updated_at: string;
};

const authHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
});

export const fetchNotifications = async (
  token: string
): Promise<Notification[]> => {
  
  try {
    const response = await axios.get(`${API_URL}/notifications`, authHeader(token));
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Error al obtener notificaciones';
  }
};

export const acceptCoupleRequest = async (
  notificationId: number,
  token: string
): Promise<string> => {
  
  try {
    const response = await axios.post(
      `${API_URL}/notifications/${notificationId}/accept`,
      {},
      authHeader(token)
    );
    return response.data.message;
  } catch (error: any) {
    throw error.response?.data?.message || 'Error al aceptar solicitud';
  }
};

export const rejectCoupleRequest = async (
  notificationId: number,
  token: string
): Promise<string> => {
  try {
    const response = await axios.delete(
      `${API_URL}/notifications/${notificationId}/reject`,
      authHeader(token)
    );
    return response.data.message;
  } catch (error: any) {
    throw error.response?.data?.message || 'Error al rechazar solicitud';
  }
};