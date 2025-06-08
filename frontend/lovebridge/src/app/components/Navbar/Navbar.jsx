
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Navbar.module.scss';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; 
import SearchModal from '../SearchBar/searchBar';
import NotificationDropdown from '../Notification/NotificationDropdown';


export default function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const router = useRouter();


  const handleLogout = () => {
    logout();
    router.push('/');
  };



  return (
    <>
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} />}
      {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}

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

          {/* Botón de lupa y notificaciones */}
          {isLoggedIn && (
            <>
            <div className="d-flex align-items-center ms-auto d-lg-none">
            <button
              className="btn btn-link"
              onClick={() => setShowSearchModal(true)}
              aria-label="Buscar perfil">
              <i className="bi bi-search-heart"></i>
            </button>
            

            <button
              className="btn btn-link"
              onClick={() => setShowNotifications((prev) => !prev)}
              aria-label="Ver notificaciones">
              <i className="bi bi-bell fs-4"></i>
            </button>
            </div>
            </>
          )}

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
                <Link className={`nav-link ${styles.navLink}`} href="/pricing">
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
                    <Link className={`dropdown-item ${styles.dropdownItem}`} href="/blog">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${styles.dropdownItem}`} href="/foros">
                      Foros
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Botones de autenticación */}
            <div className={`d-flex ${styles.authButtons}`}>
              {!isLoggedIn ? (
                <>
                  <Link className={`btn btn-outline me-2 ${styles.navLink}`} href={"/login"}>
                    Iniciar Sesión
                  </Link>
                  <Link className={`btn btn-outline me-2 ${styles.navLink}`} href={"/register"}>
                    Registrarse
                  </Link>
                </>
              ) : (
                <>
                  <div className="me-2 d-none d-lg-inline">
                    <button
                      className="btn btn-link"
                      onClick={() => setShowSearchModal(true)}
                      aria-label="Buscar perfil">
                      <i className="bi bi-search-heart fs-4"></i>
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => setShowNotifications((prev) => !prev)}
                      aria-label="Ver notificaciones">
                      <i className="bi bi-bell fs-4"></i>
                    </button>
                  </div>
                  <button type="button" className="btn btn-outline" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
