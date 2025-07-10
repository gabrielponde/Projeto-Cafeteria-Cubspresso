'use client'

import { useState } from 'react';
import styles from '@/css/Login.module.css';
import Image from 'next/image';
import logoImage from '@/assets/logo.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      localStorage.setItem('jwt_token', data.token);
      window.location.href = '/'; 

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.logoContainer}>
          <Image src={logoImage} alt="Cubspresso Logo" width={150} height={150} />
        </div>
        <h1 className={styles.title}>Faça seu Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.signupText}>
          Não tem uma conta? <a href="/signup">Crie uma agora!</a>
        </p>
      </div>
    </div>
  );
} 