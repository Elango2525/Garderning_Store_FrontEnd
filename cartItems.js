import React from "react";

const CartItem = (product) => {
  const removeItem = () => {
    // Implement logic to remove the product from the cart
    // For example:
    product.removeItemFromCart(product.id);

    

  };

  return (
    <tr>
      <td>{product.count}.</td>
      <td>
        <img src={product.imageUrl} alt={product.productname}  />
      </td>
      <td>{product.productname}</td>
      <td>{product.quantity || 1}</td>
      <td>₹{product.discountedPrice}/-</td>
      <td>
        <button
          style={{
            color: "#fff",
            backgroundColor: "#dc3545",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            padding: "0.2rem 0.5rem"
          }}
          onClick={removeItem}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default CartItem;