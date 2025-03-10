'use client'
import styles from '../css/ProductItem.module.css'
import { IProduct } from '../interfaces/product.interface';
import { formatPrice } from '../utils/formatPrice';
import { ProductTag } from './ProductTag';
import { baseURL } from '../utils/baseURL';

interface ProductItemProps {
  item: IProduct
}
export function ProductItem({ item }: ProductItemProps) {
  return (
    <a href={`/product/${item.id}`} className={styles.products__listItem}>
      <img src={item.imagem} alt={item.nome} />
      <h3 className={styles.products__listPrice}>{formatPrice(item.preco.por)}<span>{formatPrice(item.preco.de)}</span></h3>
      <h4 className={styles.products__listName}>{item.nome}</h4>
      <ProductTag type={item.vegano} />
    </a>
  );
}