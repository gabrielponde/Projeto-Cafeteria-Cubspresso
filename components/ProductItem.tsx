import styles from '../css/ProductItem.module.css';
import { IProduct } from '../interfaces/product.interface';
import { formatPrice } from '../utils/formatPrice';
import { ProductTag } from './ProductTag';
import Image from 'next/image';


interface ProductItemProps {
  item: IProduct;
}

export function ProductItem({ item }: ProductItemProps) {
  return (
    <a href={`/product/${item.id}`} className={styles.products__listItem}>
      <Image src={item.imagem} alt={item.nome} width={290} height={290}/>
      <h3 className={styles.products__listPrice}>
        {formatPrice(item.preco_por)}
        <span>{formatPrice(item.preco_de)}</span>
      </h3>
      <h4 className={styles.products__listName}>{item.nome}</h4>
      <ProductTag type={item.vegano} />
    </a>
  );
}