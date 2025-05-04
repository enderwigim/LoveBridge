"use client";
import { useState } from 'react';
import styles from './Login.module.scss';
import Link from 'next/link';

// Se importa el router de next/navigation para redirigir al usuario después de iniciar sesión
import { useRouter } from 'next/navigation';
// Se importa el contexto de autentificación, y además el servicio de login.
import { useAuth } from '../../../context/AuthContext';
import { loginService } from '../../../services/authService';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginService(email, password);
      console.log("Token recibido:", data.token);
      // Guardamos el token en el localStorage en un contexto global.
      login(data.token);
      // Redigir al usuario a la pagina de inicio.
      router.push('/');
    } catch (err) {
      console.error(err);
      setError(err); // Mostrar mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
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
        <button type="submit" className="btn btn-primary w-100">
            Entrar
        </button>
        <div className="text-center mt-3">
            ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </div>
    </form>
  );
}
