'use client'

import styles from '../css/Header.module.css'
import { Cart } from './Cart';
import logoImagem from '../assets/logo.svg'
import toteImagem from '../assets/Tote.svg'
import { useCart } from '../hooks/useCart';
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';


export function Header() {
  const { cart, toggleModalCart, openModalCart} = useCart()
  const { user, signOut } = useAuth();

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} container`}>
        <a href="/">
          <Image src={logoImagem} alt="logo cubospresso" />
        </a>
        <div className={styles.header__authCart}>
          {user ? (
            <div className={styles.userInfo}>
              <span className={styles.userEmail}>{user.email}</span>
              <button onClick={signOut} className={styles.logoutButton}>Sair</button>
            </div>
          ) : (
            <a href="/login" className={styles.loginLink}>Login</a>
          )}
          <a href="#" className={`${styles.link__quantity} ${styles.cart__open}`} onClick={toggleModalCart}>
            <Image src={toteImagem} alt="Carrinho" />
            <span className={styles.badge__quantity}>{cart.quantityItemInCart}</span>
          </a>
        </div>
      </div>
      {openModalCart &&
        <Cart />}
    </header>
  );
}