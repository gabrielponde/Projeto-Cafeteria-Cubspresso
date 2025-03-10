'use client'
import styles from '@/css/Product.module.css'
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/product.interface";
import { formatPrice } from "@/utils/formatPrice";

import { baseURL } from "@/utils/baseURL";
import { ProductQuantity } from "@/components/ProductQuantity";
import { createRequest } from "@/utils/createRequest";
import { IProductInCart } from "@/interfaces/productInCart.interface";
import { useCart } from "@/hooks/useCart";
import { useParams } from 'next/navigation';

export default function Product() {
  const { id } = useParams()
  const { generateNewProductInCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [observation, setObservation] = useState('')

  const [product, setProduct] = useState( {
    id: '',
    nome: '',
    imagem: '',
    preco: {
      de: 0,
      por:0
    },
    vegano: false,
    categoria: 'gelados'
  } as IProduct) 

  useEffect(() => {
    getProduct()
  }, [])

  async function getProduct() {
    const data: IProduct =  await createRequest(`/produtos/${id}`, 'GET')   
    setProduct(data)
  }


  async function updateQuantity(type: 'plus' | 'minus') {
    let newQuantity = quantity
  
    if (type === 'plus') {
      newQuantity = newQuantity + 1
    } else {
      if (quantity > 1) {
        newQuantity = newQuantity - 1
      }
    }
    
    setQuantity(newQuantity)
  }

  async function addInCart() {

    const data: IProductInCart[] = await createRequest('/carrinho', 'get')
    const productExistInCart = data.find(item => item.idProduto === product.id)
    let newProduct

    if (!productExistInCart) {
      // adiciona produto no carrinho 
      newProduct = {
        idProduto: product.id,
        nome: product.nome,
        imagem: product.imagem,
        preco: product.preco.por,
        vegano: product.vegano,
        quantidade: quantity,
        observacao: observation
      }
      await createRequest('/carrinho', 'post', newProduct)
    } else {
      // altera produto no carrinho
      newProduct = {
        ...productExistInCart,
        observacao: observation,
        quantidade: productExistInCart.quantidade + quantity
      }
      await createRequest(`/carrinho/${productExistInCart.id}`, 'put', newProduct)
    }

    const newProductsCart =  await createRequest('/carrinho', 'get')
    generateNewProductInCart(newProductsCart)
    
    alert('Produto adicionado ao carrinho com sucesso!')

  }

  return (

    <main>
      <div className={`container ${styles.product__container}`}>
        <a href="/" className={styles.product__link}>Voltar para o início</a>
        <section className={styles.product}>
          <div className={styles.product__containerImage}>
            <img src={`/${product.imagem}`} className={styles.product__image} alt={product.nome} />
          </div>
          <div className={styles.product__data}>
            <h1 className={styles.product__title}>{product.nome}</h1>
            <h2 className={styles.product__price}>{formatPrice(product.preco.por)}</h2>
            <div className={styles.product__tag}></div>
            <p className={styles.product__description}>
              {product.descricao}
            </p>

            <section className={styles.product__observation}>
              <label htmlFor="observation">Observações sobre o pedido</label>
              <textarea rows={3} name="observation" id="observation"
                placeholder="Digite suas observações. Ex.: Enviar açúcar" 
                onChange={(e) => setObservation(e.target.value)} 
                value={observation}></textarea>
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
  )
}


