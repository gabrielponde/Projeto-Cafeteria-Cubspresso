'use client'
import styles from '../css/ProductTag.module.css'
import PlantImage from '../assets/Plant.png'
import CowImage from '../assets/Cow.png'
import Image from 'next/image'
interface ProductTagProps {
  type: boolean
}
export function ProductTagCart({type}: ProductTagProps) {
  return (
    <>
    {type ? 
    <div className={styles.product__tag}>
      <Image src={PlantImage} alt="vegano" />
      <span>Vegano</span>
    </div> :
    <div className={styles.product__tag}>
      <Image src={CowImage} alt="Contém Lactose" />
      <span>Contém Lactose</span>
    </div>}
    </>
  );
}