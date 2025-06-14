'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SuccessModal.module.scss';

type Props = {
  partnerName: string;
};

export default function SuccessModal({ partnerName }: Props) {
  const router = useRouter();

  // Redirige a los 3 segundos solo si partnerName está presente
  useEffect(() => {
    if (!partnerName) return;
    const timeout = setTimeout(() => {
      router.push(`/chat/${partnerName}`);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [partnerName, router]);

  const handleClose = () => {
    router.push(`/chat/${partnerName}`);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>¡Enhorabuena!</h2>
        <p>Ahora eres pareja de <strong>{partnerName}</strong></p>
        <button className={styles.closeButton} onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
