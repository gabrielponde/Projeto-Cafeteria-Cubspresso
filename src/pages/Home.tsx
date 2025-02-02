import { useEffect, useState } from 'react';
import { api } from '../services/api';  
import PlantImage from '../assets/Plant.png';
import CowImage from '../assets/Cow.png';
import { Produto } from '../types/produto';
import { formatPrice, capitalizeFirstLetter } from '../utils/formatters';  
import '../css/home.css';

export default function Home() {
  const [categorias, setCategorias] = useState<{ [key: string]: Produto[] }>({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const produtos = await api.fetchProducts();  
        interface CategoriaProdutos {
          [key: string]: Produto[];
        }

        const produtosPorCategoria: CategoriaProdutos = produtos.reduce((acc: CategoriaProdutos, produto: Produto) => {
          const categoriaFormatada = capitalizeFirstLetter(produto.categoria);
          
          if (!acc[categoriaFormatada]) {
            acc[categoriaFormatada] = [];
          }
          acc[categoriaFormatada].push(produto);
          return acc;
        }, {} as CategoriaProdutos);

        setCategorias(produtosPorCategoria);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main>
      <section className="slogan">
        <div className="container">
          <h1 className="slogan__title">Fragrância e sabor elevado ao cubo</h1>
          <p className="slogan__text">
            Explore nossa variedade de blends exclusivos e saboreie a perfeição em cada gole.
          </p>
        </div>
      </section>

      {Object.entries(categorias).map(([categoria, produtos]) => (
        <section key={categoria} className="products">
          <div className="container">
            <h2 className="products__title">{categoria}</h2>
            <div className="products__list">
              {produtos.map((produto) => (
                <a key={produto.id} href={`/product/${produto.id}`} className="products__list--item">
                  <img src={produto.imagem} className="product__image" alt={produto.nome} />
                  <h3 className="products__list--price">
                    R$ {formatPrice(produto.preco.por)}{' '}
                    {produto.preco.de && <span>R$ {formatPrice(produto.preco.de)}</span>}
                  </h3>
                  <h4 className="products__list--name">{produto.nome}</h4>
                  <div className="product__tag">
                    <img src={produto.vegano ? PlantImage : CowImage} alt={produto.vegano ? 'Vegano' : 'Contém lactose'} />
                    <span>{produto.vegano ? 'Vegano' : 'Contém lactose'}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
