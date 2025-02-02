import { useState, useEffect } from 'react';
import { Product, CartItem } from '../types/cart';
import { api } from '../services/api';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(() => 
    localStorage.getItem('cartState') === 'open'
  );

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartState', isOpen ? 'open' : 'closed');
  }, [isOpen]);

  const loadCart = async () => {
    try {
      const items = await api.fetchCart();
      setCartItems(items);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  const addToCart = async (productId: number) => {
    const observacoes = prompt("Digite uma observação para o produto (opcional):");
    try {
      const product: Product = await api.fetchProduct(productId);
      const existingItem = cartItems.find(item => item.id === product.id);

      if (existingItem) {
        await api.updateCartItem(existingItem.id, {
          ...existingItem,
          quantidade: existingItem.quantidade + 1,
          observacoes: observacoes || ''
        });
      } else {
        await api.addToCart({
          id: product.id,
          nome: product.nome,
          preco: product.preco.por,
          quantidade: 1,
          imagem: product.imagem,
          observacoes: observacoes || 'Sem observação',
          vegano: product.vegano
        });
      }
      await loadCart();
      setIsOpen(true);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const updateQuantity = async (productId: number, change: number) => {
    try {
      const item = cartItems.find(item => item.id === productId);
      if (!item) return;
      
      const newQuantity = item.quantidade + change;
      if (newQuantity < 1) {
        await removeFromCart(productId);
        return;
      }
      
      await api.updateCartItem(productId, { ...item, quantidade: newQuantity });
      await loadCart();
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await api.removeFromCart(productId);
      await loadCart();
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  const clearCart = async () => {
    try {
      await Promise.all(cartItems.map(item => api.removeFromCart(item.id)));
      await loadCart();
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const frete = subtotal >= 10000 ? 0 : 500;
    const total = subtotal + frete;
    return { subtotal, frete, total };
  };

  return {
    cartItems,
    isOpen,
    setIsOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotals
  };
}
