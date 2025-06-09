'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatInterface from '../../components/ChatInterface/ChatInterface';
import { searchUsersByUsername, User } from '../../../services/searchUsersByUsername';
import { useAuth } from '@/context/AuthContext';

export default function ChatPage() {
  const { username } = useParams();
  const token = localStorage.getItem('token'); 
  const user = localStorage.getItem('user');
  const [userData, setUserData] = useState<User | null>(user ? JSON.parse(user) : null);
  const [couple, setCouple] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const loadUser = async () => {
    if (!token || !username || !userData?.username) {
      return;
    }

    try {
      const foundUsers = await searchUsersByUsername(username.toString(), token);
      const foundMainUser = await searchUsersByUsername(userData.username, token);

      if (!foundUsers.length) {
        setError(`No se encontró el usuario "${username}"`);
      } else {
        setCouple(foundUsers[0]);
        setUserData(foundMainUser[0]); // Actualiza userData desde API si necesario
      }
    } catch (err: any) {
      console.error('Error al buscar usuario:', err);
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, [username, token, userData?.username]);

  if (!token) return <p className="text-center mt-5 text-danger">No estás autenticado</p>;
  if (loading) return <p className="text-center mt-5">Cargando...</p>;

  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!user || !couple) return <p className="text-center mt-5">Usuario no disponible</p>;

  // Convert profile.avatar: null to undefined for type compatibility
  const toChatUser = (u: User | null) =>
    u
      ? {
          ...u,
          profile: {
            ...u.profile,
            avatar: u.profile.avatar === null ? undefined : u.profile.avatar,
          },
        }
      : undefined;

  return (
    <ChatInterface
      user={toChatUser(userData)}
      couple={toChatUser(couple)}
      token={token}
    />
  );
}
