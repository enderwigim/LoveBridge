'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './NotificationDropdown.module.scss';
import { fetchNotifications, Notification } from '../../../services/notificationService';
import NotificationItem from '../NotificationItem/NotificationItem';

interface NotificationDropdownProps {
  onClose: () => void;
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Asegúrate de que esté guardado correctamente
    if (!token) {
      setError('Token no encontrado');
      setLoading(false);
      return;
    }

    fetchNotifications(token)
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar notificaciones');
        setLoading(false);
      });
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`position-absolute end-0 mt-2 me-3 p-3 shadow rounded bg-white ${styles.notificationsDropdown}`}
      style={{ zIndex: 1050 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold mb-0">Notificaciones</h6>
        <button className="btn-close" onClick={onClose} aria-label="Cerrar"></button>
      </div>

      <ul className="list-unstyled mb-0">
        {loading && <li>Cargando...</li>}
        {error && <li>{error}</li>}
        {!loading && !error && notifications.length === 0 && (
          <li>No tienes notificaciones</li>
        )}
         {notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onClick={() => window.location.href = '/notifications'}
          />
        ))}
      </ul>
    </div>
  );
}
