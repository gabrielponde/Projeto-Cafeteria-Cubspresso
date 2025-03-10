'use client'
import Image from 'next/image'
import minusImage from '../assets/Minus.svg'
import plusImage from '../assets/Plus.svg'
import styles from '../css/ProductQuantity.module.css'

interface ProductQuantityProps {
  updateQuantity: (type: 'plus' | 'minus') => void
  quantity: number
  classes: string
}

export function ProductQuantity({ updateQuantity, quantity, classes }: ProductQuantityProps) {  
  return (
    <section className={`${styles.product__quantity} ${classes}`}>
        <button type="button" className={styles.product__quantityMinus} onClick={() => updateQuantity('plus')}>
          <Image src={plusImage} alt="mais um" />
        </button>
        <input type="text" readOnly  className={styles.product__quantityInput} value={quantity} />
        <button type="button" className={styles.product__quantityPlus} onClick={() => updateQuantity('minus')}>
          <Image src={minusImage} alt="menos um" />
        </button>
      </section>
  );
}