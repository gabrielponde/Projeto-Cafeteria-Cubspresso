'use client';
import styles from '../css/ProductInCart.module.css';
import { IProductInCart } from '../interfaces/productInCart.interface';
import { formatPrice } from '../utils/formatPrice';
import deleteImage from '../assets/Trash.svg';
import { ProductTagCart } from './ProductTagInCart';
import { useState } from 'react';
import { createRequest } from '../utils/createRequest';
import { useCart } from '../hooks/useCart';
import { ProductQuantity } from './ProductQuantity';
import Image from 'next/image';

interface ProductIncartProps {
  item: IProductInCart;
}

export function ProductInCart({ item }: ProductIncartProps) {
  const { generateNewProductInCart, cart } = useCart();
  const [quantity, setQuantity] = useState(item.quantidade);

  const handleUpdateQuantity = async (type: 'plus' | 'minus') => {
    let newQuantity = quantity;

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
      quantidade: newQuantity,
    };

    await createRequest(`/carrinho/${item.id}`, 'PUT', productInCart);

    const newProductsCart = cart.items.map((i) => {
      if (i.id === productInCart.id) {
        return productInCart;
      }
      return i;
    });

    generateNewProductInCart(newProductsCart);
  };

  const handleDeleteProduct = async () => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    await createRequest(`/carrinho/${item.id}`, 'DELETE');

    const newProductsInCart = cart.items.filter((i) => i.id !== item.id);
    generateNewProductInCart(newProductsInCart);
  };

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

          <button
            className={styles.cart__productDelete}
            onClick={handleDeleteProduct}
          >
            <Image src={deleteImage} alt="Deletar produto" />
          </button>
        </div>

        <div className={styles.cart__productRow}>
          <h3 className={styles.cart__productPrice}>{formatPrice(item.preco)}</h3>
          <ProductQuantity
            quantity={quantity}
            updateQuantity={handleUpdateQuantity}
            classes="cart__productQuantity"
          />
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