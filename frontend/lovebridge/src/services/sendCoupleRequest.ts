import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function sendCoupleRequest(username: string, token: string) {
    try {
        const response = await axios.post(
            `${API_URL}/coupleRequest/${username}`,
            {}, // cuerpo vacío
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // ya está parseado como JSON
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'Error al enviar solicitud';
            throw new Error(message);
        } else {
            throw new Error('Error inesperado');
        }
    }
}
