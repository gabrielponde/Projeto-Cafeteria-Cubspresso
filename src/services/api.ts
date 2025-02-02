const API_URL = 'http://localhost:3000';

export const api = {
  async fetchProducts() {
    const response = await fetch(`${API_URL}/produtos`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async fetchProduct(id: number) {
    const response = await fetch(`${API_URL}/produtos/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async fetchCart() {
    const response = await fetch(`${API_URL}/carrinho`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async addToCart(product: any) {
    const response = await fetch(`${API_URL}/carrinho`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  async updateCartItem(id: number, data: any) {
    const response = await fetch(`${API_URL}/carrinho/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update cart item');
    return response.json();
  },

  async removeFromCart(id: number) {
    const response = await fetch(`${API_URL}/carrinho/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
  }
};