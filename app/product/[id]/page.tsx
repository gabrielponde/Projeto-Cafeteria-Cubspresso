'use client'

import styles from '@/css/Product.module.css';
import { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/product.interface';
import { IProductInCart } from '@/interfaces/productInCart.interface';
import { formatPrice } from '@/utils/formatPrice';
import { ProductQuantity } from '@/components/ProductQuantity';
import { createRequest } from '@/utils/createRequest';
import { useCart } from '@/hooks/useCart';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function Product() {
  const { id } = useParams();
  const { generateNewProductInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');

  const [product, setProduct] = useState<IProduct>({
    id: 0,
    nome: '',
    imagem: '',
    descricao: '',
    preco_de: 0,
    preco_por: 0,
    vegano: false,
    categoria: 'classicos',
  });

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    const data: IProduct = await createRequest(`/produtos/${id}`, 'GET');
    setProduct(data);
  }

  async function updateQuantity(type: 'plus' | 'minus') {
    let newQuantity = quantity;

    if (type === 'plus') {
      newQuantity = newQuantity + 1;
    } else {
      if (quantity > 1) {
        newQuantity = newQuantity - 1;
      }
    }

    setQuantity(newQuantity);
  }

  async function addInCart() {
    console.log('Adicionando produto ao carrinho...');
    try {
      const data: IProductInCart[] = await createRequest('/carrinho', 'GET');
      console.log('Carrinho atual:', data);
  
      const productExistInCart = data.find(item => item.id_produto === product.id.toString());
            console.log('Produto existe no carrinho?', productExistInCart);
  
      let newProduct;
  
      if (!productExistInCart) {
        // Adiciona produto no carrinho
        newProduct = {
          id_produto: product.id,
          nome: product.nome,
          imagem: product.imagem,
          preco: product.preco_por, 
          vegano: product.vegano,
          quantidade: quantity,
          observacao: observation,
        };
        console.log('Novo produto a ser adicionado:', newProduct);
        await createRequest('/carrinho', 'POST', newProduct);
      } else {
        // Altera produto no carrinho
        newProduct = {
          ...productExistInCart,
          observacao: observation,
          quantidade: productExistInCart.quantidade + quantity,
        };
        console.log('Produto atualizado:', newProduct);
        await createRequest(`/carrinho/${productExistInCart.id}`, 'PUT', newProduct);
      }
  
      const newProductsCart = await createRequest('/carrinho', 'GET');
      console.log('Carrinho atualizado:', newProductsCart);
      generateNewProductInCart(newProductsCart);
  
      alert('Produto adicionado ao carrinho com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      alert('Ocorreu um erro ao adicionar o produto ao carrinho.');
    }
  }

  return (
    <main>
      <div className={`container ${styles.product__container}`}>
        <a href="/" className={styles.product__link}>Voltar para o início</a>
        <section className={styles.product}>
          <div className={styles.product__containerImage}>
            <Image src={`${product.imagem}`} className={styles.product__image} alt={product.nome} width={700} height={750}/>
          </div>
          <div className={styles.product__data}>
            <h1 className={styles.product__title}>{product.nome}</h1>
            <h2 className={styles.product__price}>{formatPrice(product.preco_por)}</h2>
            <div className={styles.product__tag}></div>
            <p className={styles.product__description}>
              {product.descricao}
            </p>

            <section className={styles.product__observation}>
              <label htmlFor="observation">Observações sobre o pedido</label>
              <textarea
                rows={3}
                name="observation"
                id="observation"
                placeholder="Digite suas observações. Ex.: Enviar açúcar"
                onChange={(e) => setObservation(e.target.value)}
                value={observation}
              ></textarea>
            </section>
            <div className={styles.product__buy}>
              <ProductQuantity quantity={quantity} updateQuantity={updateQuantity} classes="" />
              <button type="button" className={styles.product__button} onClick={addInCart}>
                Comprar
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}