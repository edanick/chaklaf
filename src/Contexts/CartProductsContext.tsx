import { createContext, useEffect, useState } from "react";


type ContextType = {
  cartProducts: any[]
  updateCart: (_id: number) => void
  totalProductsAmount: number
}

export const CartProductsContext = createContext<ContextType>({
  cartProducts: [],
  updateCart: (_id: number) => { },
  totalProductsAmount: 0
});

export const CartProductsProvider = ({ children }: any) => {

  const [cartProducts, setCartProducts] = useState<any[]>(JSON.parse(localStorage.getItem("cart_products") ?? "[]")),
    getAmountOfProductsTotal = () => cartProducts.map((p: any) => p.amount).reduce((a: number, n: number) => a + n, 0),
    [totalProductsAmount, setTotalAmount] = useState<number>(getAmountOfProductsTotal());


  const updateCart = (_id: number) => {
    if (!cartProducts.find((c: any) => c._id == _id)) {

      cartProducts.push({
        _id: _id,
        amount: 1
      });

      localStorage.setItem("cart_products", JSON.stringify(cartProducts));
      setTotalAmount(getAmountOfProductsTotal());
      setCartProducts(cartProducts);

    }
  };

  return (
    <CartProductsContext.Provider value={{ cartProducts, updateCart, totalProductsAmount }}>
      {children}
    </CartProductsContext.Provider>
  );
}