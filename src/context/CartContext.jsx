

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const STORAGE_KEY = "samli-cart";

function CartContextProvider({ children }) {
  const [carts, setCarts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Keep the cart after a refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carts));
    } catch {
      /* storage unavailable: cart still works for this session */
    }
  }, [carts]);

  function updateCarts() {
    return carts;
  }

  // Call from ProductCard: addToCart(product)
  function addToCart(product, qty = 1) {
    setCarts(prev =>
      prev.some(i => i.id === product.id)
        ? prev.map(i =>
            i.id === product.id ? { ...i, qty: (i.qty || 1) + qty } : i
          )
        : [...prev, { ...product, qty }]
    );
  }

  function setQty(id, qty) {
    setCarts(prev =>
      prev.map(i => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }

  function removeFromCart(id) {
    setCarts(prev => prev.filter(i => i.id !== id));
  }

  function clearCart() {
    setCarts([]);
  }

  const count = carts.reduce((n, i) => n + (i.qty || 1), 0);
  const subtotal = carts.reduce((n, i) => n + i.price * (i.qty || 1), 0);

  return (
    <CartContext.Provider
      value={{
        carts,
        setCarts,
        updateCarts,
        addToCart,
        setQty,
        removeFromCart,
        clearCart,
        count,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;


