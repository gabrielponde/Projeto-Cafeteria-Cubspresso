'use client'

import logoImage from '../assets/logo-02.svg'
import styles from '../css/Footer.module.css'
import Image from 'next/image';


export function Footer() {
  return (
    <footer className={styles.footer}>
      <section className="container">
        <Image src={logoImage} className="logo" alt="logo cubospresso" />
        <div className={styles.footer__list}>
          <div className={styles.footer__listItem}>
            <h3>Clássicos</h3>
            <ul>
              <li>Espresso</li>
              <li>Americano</li>
              <li>Cappuccino</li>
              <li>Latte</li>
              <li>Macchiato</li>
              <li>Mocha</li>
              <li>Irish Coffee</li>
            </ul>
          </div>
          <div className={styles.footer__listItem}>
            <h3>Gelados</h3>
            <ul>
              <li>Cold Brew</li>
              <li>Frappuccino</li>
              <li>Laranja e tônica</li>
              <li>Milk shake</li>
            </ul>
          </div>
          <div className={styles.footer__listItem}>
            <h3>Veganos</h3>
            <ul>
              <li>Espresso</li>
              <li>Americano</li>
              <li>Cold Brew</li>
              <li>Irish Coffee</li>
            </ul>
          </div>
        </div>
      </section>
    </footer>

  );
}