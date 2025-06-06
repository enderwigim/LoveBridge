'use client';
import { useEffect } from 'react';
import styles from './SuccessModal.module.scss';

type Props = {
  partnerName: string;
  onClose: () => void;
};

export default function SuccessModal({ partnerName, onClose }: Props) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000); // se cierra solo tras 3s
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>¡Enhorabuena!</h2>
        <p>Ahora eres pareja de <strong>{partnerName}</strong></p>
        <button className={styles.closeButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
