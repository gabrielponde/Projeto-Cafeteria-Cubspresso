import { createContext, useContext, ReactNode, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { CartContextType } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const cart = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const getTotalItems = () => {
    return cart.cartItems.reduce((total, item) => total + item.quantidade, 0);
  };

  const setCartVisibility = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <CartContext.Provider value={{
      ...cart,
      isOpen,
      setIsOpen: setCartVisibility,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
