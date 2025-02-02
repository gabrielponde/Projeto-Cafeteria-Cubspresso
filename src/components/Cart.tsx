import { useEffect, useRef } from 'react';
import { useCartContext } from '../contexts/CartContext';
import closeImage from '../assets/X.svg';
import deleteImage from '../assets/Trash.svg';
import plantImage from '../assets/Plant.png';
import cowImage from '../assets/Cow.png';
import plusImage from '../assets/Plus.svg';
import minusImage from '../assets/Minus.svg';
import { formatPrice } from '../utils/formatters';
import styles from '../css/Cart.module.css';


function CartComponent() {
  const {
    cartItems,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotals
  } = useCartContext();

  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  if (!isOpen) return null;

  const { subtotal, frete, total } = calculateTotals();

  const handleFinishPurchase = () => {
    if (cartItems.length === 0) {
      alert('Não é possível finalizar a compra porque o carrinho está vazio.');
      return;
    }
    
    alert('Compra finalizada com sucesso!');
    clearCart();
    setIsOpen(false);
  };

  return (
    <div className={`${styles.cart} ${isOpen ? styles.open : ''}`} ref={cartRef}>
      <section className={styles.cart__header}>
        <h3 className={styles.cart__title}>Seu carrinho</h3>
        <button 
          className={styles.cart__close}
          onClick={() => setIsOpen(false)}
        >
          <img src={closeImage} alt="fechar carrinho" />
        </button>
      </section>

      <section className={styles.cart__body}>
        <div className={styles.cart__info}>
          <h4 className={styles.cart__quantityItems}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
          </h4>
          <button 
            className={styles.cart__deleteAll}
            onClick={clearCart}
          >
            Excluir Tudo
          </button>
        </div>

        <div className={styles.cart__products}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cart__product}>
              <img
                src={`../../${item.imagem}`}
                alt={item.nome}
                className={styles.cart__productImage}
              />

              <div className={styles.cart__productInfo}>
                <div className={styles.cart__productRow}>
                  <div className={styles.cart__productColumn}>
                    <h2 className={styles.cart__productName}>{item.nome}</h2>

                    <div className={styles.product__tag}>
                      <img 
                        src={item.vegano ? plantImage : cowImage} 
                        alt={item.vegano ? "Vegano" : "Contém lactose"} 
                      />
                      <span>{item.vegano ? "Vegano" : "Contém lactose"}</span>
                    </div>
                  </div>

                  <button 
                    className={styles.cart__productDelete}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img src={deleteImage} alt="Deletar produto" />
                  </button>
                </div>

                <div className={styles.cart__productRow}>
                  <h3 className={styles.cart__productPrice}>
                    R$ {formatPrice(item.preco)} 
                  </h3>

                  <section className={styles.product__quantity}>
                    <button 
                      type="button" 
                      className={styles.product__quantityMinus}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <img src={minusImage} alt="menos um" />
                    </button>
                    <input 
                      type="text" 
                      readOnly 
                      className={styles.product__quantityInput} 
                      value={item.quantidade} 
                    />
                    <button 
                      type="button" 
                      className={styles.product__quantityPlus}
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <img src={plusImage} alt="mais um" />
                    </button>
                  </section>
                </div>

                <p className={styles.cart__productObservation}>
                  Observação: {item.observacao ? item.observacao : 'Sem observação'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cart__footer}>
        <div className={styles.cart__footerRow}>
          <h3 className={styles.cart__footerTitle}>Subtotal</h3>
          <h3 className={styles.cart__footerPrice}>
            R$ {formatPrice(subtotal)} 
          </h3>
        </div>
        <div className={styles.cart__footerRow}>
          <h3 className={styles.cart__footerTitle}>Entrega</h3>
          <h3 className={styles.cart__footerPrice}>
            R$ {formatPrice(frete)} 
          </h3>
        </div>
        <div className={styles.cart__footerRow}>
          <h3 className={styles.cart__footerTitle}>Total</h3>
          <h3 className={styles.cart__footerPrice}>
            R$ {formatPrice(total)} 
          </h3>
        </div>
        <div className={styles.cart__footerRow}>
          <button 
            type="button" 
            className={styles.cart__buy}
            onClick={handleFinishPurchase}
          >
            Finalizar compra
          </button>
        </div>
      </section>
    </div>
  );
}

export default CartComponent;
