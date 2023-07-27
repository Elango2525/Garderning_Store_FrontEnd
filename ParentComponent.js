import React, { useState } from 'react';
import HandTool from './HandTool';
import Cart from './Cart';

const ParentComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div>
      <HandTool handleAddToCart={handleAddToCart} />
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default ParentComponent;
