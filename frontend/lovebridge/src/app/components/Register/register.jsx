"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Register.module.scss';

// Se importa el router de next/navigation para redirigir al usuario después de iniciar sesión
import { useRouter } from 'next/navigation';
// Se importa el contexto de autentificación, y además el servicio de login.
import { useAuth } from '../../../context/AuthContext';
import { registerService } from '../../../services/authService';

export default function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
          const data = await registerService(username, email, password, confirmPassword);
          // Guardamos el token en el localStorage en un contexto global.
          login(data.token);
          // Redigir al usuario a la pagina de inicio.
          router.push('/');
        } catch (err) {
          console.error(err);
          setError(err); // Mostrar mensaje al usuario
        }
    
    console.log('Datos de registro:', { username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Usuario</label>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Registrarse
      </button>
      <div className="text-center mt-3">
        ¿Ya tienes cuenta? <Link href="/login">Inicia Sesión</Link>
      </div>
      {error && (
        <div className="alert alert-danger mt-3 text-center">
          {error}
        </div>
      )}
    </form>
  );
}
