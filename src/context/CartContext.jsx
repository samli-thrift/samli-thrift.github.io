
import { createContext, useState } from "react";


export const CartContext = createContext();

function CartContextProvider({children}) {
  const [carts, setCarts] = useState([]);
  function updateCarts() {
    return carts;
  };

  return <CartContext.Provider
    value={{
      carts,
      setCarts,
      updateCarts,
    }}
  >
    {children}
  </CartContext.Provider>
}

export default CartContextProvider;