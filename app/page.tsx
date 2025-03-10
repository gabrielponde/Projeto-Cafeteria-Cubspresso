'use client'

import styles from '../css/Home.module.css'
import { ProductItem } from '../components/ProductItem'
import { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/product.interface';
import { createRequest } from '@/utils/createRequest';

interface IProductsLists {
  productsClassics: IProduct[],
  productsFrozen: IProduct[]
}


export default function Home() {
  const [products, setProducts] = useState({
    productsClassics: [] as IProduct[],
    productsFrozen: [] as IProduct[],
  } as IProductsLists) 

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    const data: IProduct[] =  await createRequest(`/produtos`, 'GET')
    console.log('data:  ',data)
    const productsClassics = data.filter(p => p.categoria === 'classicos')
    const productsFrozen = data.filter(p => p.categoria === 'gelados')
    setProducts({
      productsClassics,
      productsFrozen
    })
  }

  return (
    <main>
      <section className={styles.slogan}>
        <div className="container">
          <h1 className={styles.slogan__title}>Fragrância e sabor elevado ao cubo</h1>
          <p className={styles.slogan__text}>
            Explore nossa variedade de blends exclusivos e saboreie a perfeição em cada gole.
          </p>
        </div>
      </section>

      <section className={styles.products}>
        <div className="container">
          <h2 className={styles.products__title}>Clássicos</h2>
          <div className={styles.products__list}>
            {products.productsClassics.map(p => <ProductItem key={p.id} item={p}/>)}
            
          </div>
        </div>
      </section>

      <section className={styles.products}>
        <div className="container">
          <h2 className={styles.products__title}>Gelados</h2>
          <div className={styles.products__list}>
            {products.productsFrozen.map(p => <ProductItem key={p.id} item={p}/>)}
          </div>
        </div>
      </section>
    </main>
  )
}
