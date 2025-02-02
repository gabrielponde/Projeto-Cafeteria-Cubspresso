    export interface Product {
    id: number;
    nome: string;
    preco: {
      por: number;
    };
    imagem: string;
    descricao?: string;
    vegano?: boolean;
  }
  
  export interface CartItem {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    imagem: string;
    observacao: string;
    vegano?: boolean;
  }

  export interface CartContextType {
    cartItems: CartItem[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    addToCart: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, change: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    calculateTotals: () => { subtotal: number; frete: number; total: number };
    getTotalItems: () => number;
  }