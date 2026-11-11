

import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "../lib/productsApi";

const ProductsContext = createContext({ products: [], loading: true, error: null });

export function ProductsProvider({ children }) {
  const [state, setState] = useState({ products: [], loading: true, error: null });

  useEffect(() => {
    let ignore = false;
    fetchProducts()
      .then((products) => !ignore && setState({ products, loading: false, error: null }))
      .catch((err) => !ignore && setState({ products: [], loading: false, error: err.message }));
    return () => { ignore = true; };
  }, []);

  return <ProductsContext.Provider value={state}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);