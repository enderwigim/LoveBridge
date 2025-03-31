"use client";
import { useState } from 'react';
import styles from './Login.module.scss';
import Link from 'next/link';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    console.log('Datos de login:', { email, password });
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
