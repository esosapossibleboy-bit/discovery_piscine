import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p._id === product._id)
      if (existing) {
        return prev.map(p => p._id === product._id? {...p, qty: (p.qty || 1) + 1 } : p)
      }
      return [...prev, {...product, qty: 1 }]
    })
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)