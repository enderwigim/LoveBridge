'use client';
import { useState } from 'react';
import styles from './NotificationItem.module.scss';
import { Notification, acceptCoupleRequest, rejectCoupleRequest } from '../../../services/notificationService';
import SuccessModal from '../SuccessModal/SuccessModal'; // Asegúrate de importar el modal correctamente

type Props = {
  notification: Notification;
  onClick?: () => void;
  showActions?: boolean;
  token: string;
  onActionComplete?: () => void; // para actualizar la lista tras aceptar/rechazar
};

export default function NotificationItem({
  notification,
  onClick,
  showActions = false,
  token,
  onActionComplete,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [partnerName, setPartnerName] = useState('');

  const handleAccept = async () => {
    try {
      setLoading(true);
      await acceptCoupleRequest(notification.id, token);
      setPartnerName(notification.data.from_username || 'tu pareja');
      setShowModal(true);
      onActionComplete?.();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      await rejectCoupleRequest(notification.id, token);
      onActionComplete?.();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <button
              className={styles.acceptButton}
              onClick={handleAccept}
              disabled={loading}
            >
              Aceptar
            </button>
            <button
              className={styles.rejectButton}
              onClick={handleReject}
              disabled={loading}
            >
              Rechazar
            </button>
          </div>
        )}
      </li>

      {showModal && (
        <SuccessModal
          partnerName={partnerName}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
