import React, { createContext, useContext, useState, useEffect } from "react";
//import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState();
  const [totalQuantities, settotalQuantities] = useState(0);
  const [qty, setqty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    settotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setcartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setcartItems([...cartItems, { ...product }]);
    }
    console.log("Added to cart");
    console.log(cartItems)
  };
  const incQty = () => {
    setqty((prevQty) => prevQty + 1);
  };
  const decQty = () => setqty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

  return (
    <Context.Provider
      value={{
        setshowCart,
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
