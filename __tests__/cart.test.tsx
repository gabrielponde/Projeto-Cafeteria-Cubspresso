import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '@/components/Cart';
import { useCart } from '@/hooks/useCart';
import "@testing-library/jest-dom";


jest.mock('@/hooks/useCart', () => ({
  useCart: jest.fn()
}));

describe('Componente Cart', () => {
  const resetCart = jest.fn();
  const toggleModalCart = jest.fn();
  const checkout = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cart: {
        items: [
          { id: 1, nome: 'Produto 1', preco: 10000, quantidade: 2, imagem: 'produto1.jpg', vegano: true },
        ],
        quantityItemInCart: 2,
        total: 20000,
      },
      resetCart,
      toggleModalCart,
      checkout,
    });

    render(<Cart />);
  });

  it('deve renderizar o carrinho com os itens e total corretos', () => {
    const label = screen.getByText('Produto 1');
    const value = screen.queryAllByText('R$ 200,00');

    expect(label).toBeInTheDocument();
    expect(value).toHaveLength(2);
  });

  it('deve chamar resetCart quando "Excluir Tudo" for clicado', () => {
    const button = screen.getByText('Excluir Tudo');
    fireEvent.click(button);
    expect(resetCart).toHaveBeenCalled();
  });

  it('deve chamar checkout quando "Finalizar compra" for clicado', () => {
    const button = screen.getByText('Finalizar compra');
    fireEvent.click(button);
    expect(checkout).toHaveBeenCalled();
  });

  it('deve fechar o carrinho quando o botão de fechar for clicado', () => {
    const button = screen.getByAltText('fechar carrinho');
    fireEvent.click(button);
    expect(toggleModalCart).toHaveBeenCalled();
  });
});
