import { createContext, useEffect, useState } from "react";
import {products} from "../data/products"; // adjust to your products file

export const CartContext = createContext();

const STORAGE_KEY = "samli-cart";

function CartContextProvider({ children }) {
  const [carts, setCarts] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved)
        ? saved.filter((i) => i && i.id != null && Number.isFinite(Number(i.price)))
        : [];
    } catch {
      return [];
    }
  });

  // Save on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carts));
    } catch {
      /* storage unavailable: cart still works for this session */
    }
  }, [carts]);

  // Keep multiple tabs in step
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        setCarts(JSON.parse(e.newValue) || []);
      } catch {
        setCarts([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Refresh saved items against the live product list (runs once on app load)
  useEffect(() => {
    setCarts((prev) => {
      const next = prev.map((i) => {
        const live = products.find((p) => String(p.id) === String(i.id));
        if (!live) return { ...i, unavailable: true };
        return {
          ...i,
          price: live.price,
          image: live.image,
          status: live.status,
          unavailable: !!live.soldOut,
        };
      });
      return JSON.stringify(next) === JSON.stringify(prev) ? prev : next;
    });
  }, []);

  function addToCart(product, qty = 1) {
    setCarts((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.map((i) =>
            i.id === product.id ? { ...i, qty: (i.qty || 1) + qty } : i
          )
        : [...prev, { ...product, qty }]
    );
  }

  function setQty(id, qty) {
    setCarts((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }

  function removeFromCart(id) {
    setCarts((prev) => prev.filter((i) => i.id !== id));
  }

  function removeUnavailable() {
    setCarts((prev) => prev.filter((i) => !i.unavailable));
  }

  function clearCart() {
    setCarts([]);
  }

  // Only count and total items that can still be ordered
  const available = carts.filter((i) => !i.unavailable);
  const unavailableCount = carts.length - available.length;
  const count = available.reduce((n, i) => n + (i.qty || 1), 0);
  const subtotal = available.reduce((n, i) => n + i.price * (i.qty || 1), 0);

  return (
    <CartContext.Provider
      value={{
        carts,
        setCarts,
        addToCart,
        setQty,
        removeFromCart,
        removeUnavailable,
        clearCart,
        count,
        subtotal,
        unavailableCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;