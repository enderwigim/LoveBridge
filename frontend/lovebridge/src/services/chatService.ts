// services/chatService.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export interface ChatMessage {
  id: string;
  sender_id: number;
  receiver_id: number;
  content: string;
  sent_at: string;
  read: boolean;
}

export const getConversation = async (
  userId: number,
  coupleId: number,
  token: string
): Promise<ChatMessage[]> => {
  const response = await axios.get(`${API_URL}/chat/conversation/${userId}/${coupleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  console.log('Mensajes recibidos:', response.data);
  return response.data;
};

export const sendMessageToApi = async (
  sender_id: number,
  receiver_id: number,
  content: string,
  token: string
): Promise<ChatMessage> => {
  const response = await axios.post(
    `${API_URL}/chat`,
    { sender_id, receiver_id, content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );
  return response.data;
};
