'use client'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { createRequest } from '../utils/createRequest';
import { IProductInCart, ICart } from '../interfaces/productInCart.interface';

//context
interface CartContextProps {
  checkout: () => void
  resetCart: () => void
  cart: ICart
  generateNewProductInCart: (data: IProductInCart[]) => void
  toggleModalCart: () => void
  openModalCart: boolean
}

const CartContext = createContext<CartContextProps>({} as CartContextProps)

interface CartProviderProps {
  children: ReactNode
}

// Provider
export function CartProvider({ children }: CartProviderProps) {

  const [cart, setCart] = useState<ICart>({
    items: [],
    total: 0,
    quantityItemInCart: 0
  })

  const [openModalCart, setOpenModalCart] = useState(false)

  function toggleModalCart() {
    setOpenModalCart(!openModalCart)
  }
  
  useEffect(() => {
    console.log('teste:: ',cart)
    getCart()
  }, [])


  async function getCart() {
    const data: IProductInCart[] = await createRequest('/carrinho', 'GET');
    if (!data) return;
    await generateNewProductInCart(data);
  }

  async function resetCart() {
    if (!confirm('Tem certeza que deseja excluir todos produtos?')) return

    cart.items.forEach(async ({ id }) => {
      await createRequest(`/carrinho/${id}`, 'delete')
    })

    setCart({
      items: [],
      total: 0,
      quantityItemInCart: 0
    })
  }

  function checkout() {
    alert('Compra Finalizada Com Sucesso!!')
  }
  
  async function generateNewProductInCart(data: IProductInCart[]) {
    const newCart = {
      items: data,
      total: data.reduce((acc, p) => acc += p.preco * p.quantidade, 0),
      quantityItemInCart: data.reduce((acc, p) => acc += p.quantidade, 0)
    }
    setCart(newCart)
  }

  const values = {
    checkout,
    resetCart,
    cart,
    generateNewProductInCart,
    toggleModalCart,
    openModalCart
  }

  return <CartContext.Provider value={values}>
    {children}
  </CartContext.Provider>
}

//hook

export const useCart = () => {
  return useContext(CartContext)
}