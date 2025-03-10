'use client'
import styles from '../css/ProductInCart.module.css'
import { IProductInCart } from '../interfaces/productInCart.interface';
import { formatPrice } from '../utils/formatPrice';
import deleteImage from '../assets/Trash.svg'
import { ProductTagCart } from './ProductTagInCart';
import { useState } from 'react';
import { createRequest } from '../utils/createRequest';
import { useCart } from '../hooks/useCart';
import { ProductQuantity } from './ProductQuantity';
import Image from 'next/image';

interface ProductIncart__props {
  item: IProductInCart
}

export function ProductInCart({ item }: ProductIncart__props) {
  const { generateNewProductInCart, cart } = useCart();
  const [quantity, setQuantity] = useState(item.quantidade);

  async function updateQuantityInCart(type: 'plus' | 'minus') {
    let newQuantity = item.quantidade;

    if (type === 'plus') {
      newQuantity = newQuantity + 1;
    } else {
      if (quantity > 1) {
        newQuantity = newQuantity - 1;
      }
    }

    setQuantity(newQuantity);

    const productInCart = {
      ...item,
      quantidade: newQuantity
    };

    await createRequest(`/carrinho/${item.id}`, 'put', productInCart);

    const newProductsCart = cart.items.map(i => {
      if (i.id === productInCart.id) {
        return productInCart;
      }
      return i;
    });

    generateNewProductInCart(newProductsCart);
  }

  async function deleteProductInCart() {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    await createRequest(`/carrinho/${item.id}`, 'delete');

    const newProductsInCart = cart.items.filter(i => i.id !== item.id);

    generateNewProductInCart(newProductsInCart);
  }

  return (
    <div className={styles.cart__product} data-id="produtoId">
      <img
        src={item.imagem}
        alt={item.nome}
        className={styles.cart__productImage}
      />

      <div className={styles.cart__productInfo}>
        <div className={styles.cart__productRow}>
          <div className={styles.cart__productColumn}>
            <h2 className={styles.cart__productName}>{item.nome}</h2>

            <ProductTagCart type={item.vegano} />
          </div>

          <button className={styles.cart__productDelete} onClick={deleteProductInCart}>
            <Image src={deleteImage} alt="Deletar produto" />
          </button>
        </div>

        <div className={styles.cart__productRow}>
          <h3 className={styles.cart__productPrice}>{formatPrice(item.preco)}</h3>

          <ProductQuantity quantity={quantity} updateQuantity={updateQuantityInCart} classes="cart__productQuantity" />
        </div>
        
        {item.observacao && (
          <p className={styles.cart__productObservation}>
            <strong>Observação:</strong> {item.observacao}
          </p>
        )}
      </div>
    </div>
  );
}
