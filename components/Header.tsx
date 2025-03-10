'use client'

import styles from '../css/Header.module.css'
import { Cart } from './Cart';
import logoImagem from '../assets/logo.svg'
import toteImagem from '../assets/Tote.svg'
import { useCart } from '../hooks/useCart';
import Image from 'next/image';


export function Header() {
  const { cart, toggleModalCart, openModalCart} = useCart()

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} container`}>
        <a href="/">
          <Image src={logoImagem} alt="logo cubospresso" />
        </a>
        <a href="#" className={`${styles.link__quantity} ${styles.cart__open}`} onClick={toggleModalCart}>
          <Image src={toteImagem} alt="Carrinho" />
          <span className={styles.badge__quantity}>{cart.quantityItemInCart}</span>
        </a>
      </div>
      {openModalCart &&
        <Cart />}
    </header>
  );
}