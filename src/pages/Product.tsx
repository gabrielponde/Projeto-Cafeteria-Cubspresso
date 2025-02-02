import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import PlantImage from '../assets/Plant.png';
import CowImage from '../assets/Cow.png';
import MinusImage from '../assets/Minus.svg';
import PlusImage from '../assets/Plus.svg';
import { Produto } from '../types/produto';
import { formatPrice } from '../utils/formatters';
import '../css/product.css';

export function Product() {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        if (id) {
          const data = await api.fetchProduct(Number(id));
          setProduto(data);
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        setProduto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!produto) return <div>Produto não encontrado.</div>;

  const handleBuy = async () => {
    const produtoCarrinho = {
      idProduto: produto.id,
      nome: produto.nome,
      imagem: produto.imagem,
      preco: produto.preco.por,
      vegano: produto.vegano,
      quantidade,
      observacao: observacoes,
    };

    try {
      await api.addToCart(produtoCarrinho);
      alert('Produto adicionado ao carrinho com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  return (
    <main>
      <div className="container product__container">
        <a href="/" className="product__link">Voltar para o início</a>
        <section className="product">
          <div className="product__container--image">
            <img src={`../../${produto.imagem}`} className="product__image" alt={produto.nome} />
          </div>
          <div className="product__data">
            <h1 className="product__title">{produto.nome}</h1>
            <h2 className="product__price">R$ {formatPrice(produto.preco.por)}</h2>
            <div className="product__tag">
              <img src={produto.vegano ? PlantImage : CowImage} alt={produto.vegano ? "Vegano" : "Contém lactose"} />
              <span>{produto.vegano ? "Vegano" : "Contém lactose"}</span>
            </div>
            <p className="product__description">{produto.descricao}</p>
            <form onSubmit={(e) => { e.preventDefault(); handleBuy(); }}>
              <section className="product__observation">
                <label htmlFor="observation">Observações sobre o pedido</label>
                <textarea
                  rows={3}
                  name="observation"
                  id="observation"
                  placeholder="Digite suas observações. Ex.: Enviar açúcar"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </section>
              <div className="product__buy">
                <section className="product__quantity">
                  <button
                    type="button"
                    className="product__quantity--minus"
                    onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                  >
                    <img src={MinusImage} alt="Diminuir quantidade" />
                  </button>
                  <input
                    type="text"
                    className="product__quantity--input"
                    value={quantidade}
                    readOnly
                  />
                  <button
                    type="button"
                    className="product__quantity--plus"
                    onClick={() => setQuantidade(q => q + 1)}
                  >
                    <img src={PlusImage} alt="Aumentar quantidade" />
                  </button>
                </section>
                <button type="submit" className="product__button">
                  Comprar
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
