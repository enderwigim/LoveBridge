'use client';
import { useEffect, useRef } from 'react';
import styles from './NotificationDropdown.module.scss';


interface NotificationDropdownProps {
  onClose: () => void;
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <li className={`d-flex align-items-center gap-2 ${styles.notificationItem}`}>
          <i className={`bi bi-heart-fill ${styles.notificationIcon}`}></i>
          Tienes una nueva solicitud de pareja
        </li>
        <li className={`d-flex align-items-center gap-2 ${styles.notificationItem}`}>
          <i className={`bi bi-chat-heart ${styles.notificationIcon}`}></i>
          Has recibido un nuevo mensaje
        </li>
      </ul>
    </div>
  );
}
