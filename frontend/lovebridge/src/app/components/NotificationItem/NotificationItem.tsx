'use client';
import styles from './NotificationItem.module.scss';
import { Notification } from '../../../services/notificationService';

type Props = {
  notification: Notification;
  onClick?: () => void;
  showActions?: boolean;
};

export default function NotificationItem({ notification, onClick, showActions = false }: Props) {
  return (
    <li
      className={`${styles.notificationItem}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <div className="d-flex align-items-center gap-2">
        <i
          className={`${styles.notificationIcon} bi ${
            notification.type === 'message'
              ? 'bi-chat-heart'
              : notification.type === 'couple_request'
              ? 'bi-heart-fill'
              : 'bi-bell'
          }`}
        ></i>
        <div>
          <p className="mb-0">
            {notification.data.from_username} {notification.data.message}
          </p>
          <small className="text-muted">Tipo: {notification.type}</small>
        </div>
      </div>

      {showActions && notification.type === 'couple_request' && (
        <div className={styles.actionButtons}>
          <button className={styles.acceptButton}>Aceptar</button>
          <button className={styles.rejectButton}>Rechazar</button>
        </div>
      )}
    </li>
  );
}
