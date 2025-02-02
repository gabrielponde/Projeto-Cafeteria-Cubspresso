// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Product } from './pages/Product';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import './css/global.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Router>
      <CartProvider>
        <div className="layout">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
          </div>
          <Cart />
          <Footer />
        </div>
      </CartProvider>
    </Router>
  </StrictMode>
);
