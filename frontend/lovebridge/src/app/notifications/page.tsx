'use client';
import { useEffect, useState } from 'react';
import { Notification, fetchNotifications } from '../../services/notificationService';
import styles from './notifications.module.scss';
import NotificationItem from '../components/NotificationItem/NotificationItem';
import Link from 'next/link';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No estás autenticado.');
      setLoading(false);
      return;
    }

    fetchNotifications(token)
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar las notificaciones');
        setLoading(false);
      });
  }, []);
  return (
    
    <section className="container my-5">
      <div className="card shadow-sm">
        <div className={`${styles.cardHeader} card-header d-flex justify-content-between align-items-center`}>
          <h5 className="mb-0">Tus Notificaciones</h5>
        </div>
        <ul className="list-group list-group-flush">
          {loading && <li className="list-group-item">Cargando...</li>}
          {error && <li className="list-group-item text-danger">{error}</li>}
          {!loading && !error && notifications.length === 0 && (
            <li className="list-group-item">No tienes notificaciones por ahora.</li>
          )}
{notifications.map((n) => (
    <NotificationItem
      key={n.id}
      notification={n}
      showActions={true}
    />
  ))}


        </ul>
      </div>
    </section>
  );
}
