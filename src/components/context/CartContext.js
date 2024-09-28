import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState(''); 

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } 
          : cartItem
          
      )
    );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
    alert("added to the cart");
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    showMessage('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    showMessage('Cart cleared');
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevItems) => 
      prevItems.map((item) =>
        item.id === id 
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000); 
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity, message }}>
      {children}
    </CartContext.Provider>
  );
};
