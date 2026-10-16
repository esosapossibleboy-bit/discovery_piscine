import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('esosa_cart');
    return saved? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('esosa_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p._id === product._id);
      if (found) return prev.map(p => p._id === product._id? {...p, qty: p.qty+1} : p);
      return [...prev, {...product, qty: 1}];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p._id!== id));
  const clearCart = () => setCart([]);
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const count = cart.reduce((s, p) => s + p.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);