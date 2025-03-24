import Link from 'next/link';
import styles from './Footer.module.scss'


export default function Footer() {
    return (
    
    <footer className={`${styles['footer-lovebridge']} py-4`}>
        <div className="container">
        <div className="row">
            {/* Información de la marca */}
            <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">LoveBridge</h5>
            <p>
                Red social para parejas a distancia, conectando corazones y creando puentes de amor.
            </p>
            </div>
            {/* Enlaces rapidos */}
            <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Enlaces</h5>
            <ul className="list-unstyled">
                <li><Link className={styles['footer-lovebridge_link']} href="#">Inicio</Link></li>
                <li><Link className={styles['footer-lovebridge_link']} href="#">Cómo Funciona</Link></li>
                <li><Link className={styles['footer-lovebridge_link']} href="#">Planes</Link></li>
            </ul>
            </div>
            {/* Politicas y Contacto */}
            <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Contacto</h5>
            <ul className="list-unstyled">
                <li><Link className={styles['footer-lovebridge_link']} href="#">Soporte</Link></li>
                <li><Link className={styles['footer-lovebridge_link']} href="#">Privacidad</Link></li>
                <li><Link className={styles['footer-lovebridge_link']} href="#">Términos</Link></li>
            </ul>
            </div>
        </div>
        <div className="text-center">
            &copy; 2025 LoveBridge. Todos los derechos reservados.
        </div>
        </div>
  </footer>
    );
}