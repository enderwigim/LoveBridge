"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Navbar.module.scss';


export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(
        <nav className={`navbar navbar-expand-lg ${styles.navbarLovebridge}`}>
      <div className="container-fluid">
        <Link className={`navbar-brand d-flex align-items-center ${styles.navbarBrand}`} href="/">
          <Image 
            src="/img/logo-nobg.png" 
            alt="LoveBridge Logo" 
            width={90}
            height={70}
            className="me-2"
          />
          <span>LoveBridge</span>
        </Link>
        
        <button 
          className={`navbar-toggler ${styles.navbarToggler}`} 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}></span>
        </button>
        
        <div className={`collapse navbar-collapse ${styles.navbarCollapse}`} id="navbarNav">
          <ul className="navbar-nav ms-auto me-3">
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} href="/planes">
                Planes
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a 
                className={`nav-link dropdown-toggle ${styles.navLink}`} 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Comunidad
              </a>
              <ul className={`dropdown-menu ${styles.dropdownMenu}`} aria-labelledby="navbarDropdown">
                <li>
                  <Link className={`dropdown-item ${styles.dropdownItem}`} href="/historias-exito">
                    Historias de Éxito
                  </Link>
                </li>
                <li>
                  <Link className={`dropdown-item ${styles.dropdownItem}`} href="/eventos">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link className={`dropdown-item ${styles.dropdownItem}`} href="/foros">
                    Foros
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} href="/contacto">
                Contacto
              </Link>
            </li>
          </ul>
          
          {/* Botones de autenticación */}
          <div className={`d-flex ${styles.authButtons}`}>
            {!isLoggedIn ? (
              <>
                <button type="button" className="btn btn-outline me-2">
                  Login
                </button>
                <button type="button" className="btn btn-outline me-2">
                  Register
                </button>
              </>
            ) : (
              <button type="button" className="btn btn-outline">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
    )
}
