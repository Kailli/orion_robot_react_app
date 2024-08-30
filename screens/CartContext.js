import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderReference, setOrderReference] = useState(null);

  const addToCart = (item, note, quantity) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(i => i.id === item.id);
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, note, quantity }];
      }
    });
  };

  const placeOrder = () => {
    const newOrderRef = `Order${Math.floor(10000000 + Math.random() * 90000000)}`;
    setOrderReference(newOrderRef);
    return newOrderRef;
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, orderReference, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
