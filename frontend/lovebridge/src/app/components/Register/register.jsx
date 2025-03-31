"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Register.module.scss';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Aquí puedes agregar la lógica de registro (ej. llamada a una API)
    console.log('Datos de registro:', { name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre Completo</label>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Tu nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
    </form>
  );
}
