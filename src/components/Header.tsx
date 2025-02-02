import logoImage from '../assets/logo.svg';
import ToteImage from '../assets/Tote.svg';
import { useCartContext } from '../contexts/CartContext';


export function Header() {
  const { getTotalItems, setIsOpen, isOpen } = useCartContext();

  return (
    <header className="header">
      <div className="container">
        <a href="/">
          <img src={logoImage} alt="Logo Cubospresso" />
        </a>
        <button className="link__quantity" onClick={() => setIsOpen(!isOpen)}>
          <img src={ToteImage} alt="Carrinho" />
          <span className="badge__quantity">{getTotalItems()}</span>
        </button>
      </div>
    </header>
  );
}
