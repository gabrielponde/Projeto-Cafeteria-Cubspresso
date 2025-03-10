'use client'

import styles from '../css/Cart.module.css'
import closeImage from '../assets/X.svg'
import { ProductInCart } from './ProductInCart'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../hooks/useCart'
import Image from 'next/image'


export function Cart() {
  const { resetCart, cart, checkout, toggleModalCart} = useCart()

  return (
    <div className={styles.cart}>
      <section className={styles.cart__header}>
        <h3 className={styles.cart__title}>Seu carrinho</h3>
        <button className={styles.cart__close} onClick={toggleModalCart}>
          <Image src={closeImage} alt="fechar carrinho" />
        </button>
      </section>
      <section className={styles.cart__body}>
        <div className={styles.cart__info}>
          <h4 className={styles.cart__quantityItems}>{cart.quantityItemInCart} itens</h4>
          <a href="#" className={styles.cart__deleteAll} onClick={resetCart}>
            Excluir Tudo
          </a>
        </div>
        <div className={styles.cart__products}>
          {cart.items.map(item => <ProductInCart key={item.id} item={item}  />)}
        </div>
        
      </section>
      <section className={styles.cart__footer}>
        <div className={`${styles.cart__footerRow} ${styles.cart__footerSubtotal}`}>
          <h3 className={styles.cart__footerTitle}>Subtotal</h3>
          <h3 className={styles.cart__footerPrice}>{formatPrice(cart.total)}</h3>
        </div>
        <div className={`${styles.cart__footerRow} ${styles.cart__footerDelivery}`}>
          <h3 className={styles.cart__footerTitle}>Entrega</h3>
          <h3 className={styles.cart__footerPrice}>{formatPrice(0)}</h3>
        </div>
        <div className={`${styles.cart__footerRow} ${styles.cart__footerTotal}`}>
          <h3 className={styles.cart__footerTitle}>Total</h3>
          <h3 className={styles.cart__footerPrice}>{formatPrice(cart.total)}</h3>
        </div>
        <div className={`${styles.cart__footerRow} ${styles.cart__footerBuy}`}>
          <button type="button" className={styles.cart__buy} onClick={checkout}>
            Finalizar compra
          </button>
        </div>
      </section>
    </div>
  )
}

