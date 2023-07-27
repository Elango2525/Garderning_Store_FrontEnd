import React, { useState, useEffect } from "react";
import "./Receipt.css";

export default function Receipt() {
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    // Generate random values
    const randomOrderId = generateRandomId();
    const randomCustomerId = generateRandomId();
    const randomPaymentMethod = generateRandomPaymentMethod();
    const randomPaymentAmount = generateRandomPaymentAmount();
    const randomProduct = generateRandomProduct();

    // Set the state with the random values
    setOrderId(randomOrderId);
    setCustomerId(randomCustomerId);
    setPaymentMethod(randomPaymentMethod);
    setPaymentAmount(randomPaymentAmount);
    setProduct(randomProduct);

    // Clear the values after 3 seconds
    const timeout = setTimeout(() => {
      setOrderId("");
      setCustomerId("");
      setPaymentMethod("");
      setPaymentAmount("");
      setProduct("");
    }, 300000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  const generateRandomId = () => {
    // Generate a random ID
    return Math.floor(Math.random() * 1000000);
  };

  const generateRandomPaymentMethod = () => {
    // Generate a random payment method
    const paymentMethods = ["Card", "COD", "UPI"];
    const randomIndex = Math.floor(Math.random() * paymentMethods.length);
    return paymentMethods[randomIndex];
  };

  const generateRandomPaymentAmount = () => {
    // Generate a random payment amount
    const randomAmount = (Math.random() * 100).toFixed(2);
    return `$${randomAmount}`;
  };

  const generateRandomProduct = () => {
    // Generate a random product
    const products = ["Product A", "Product B", "Product C"];
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };

  return (
    <div className="receipt-container">
      <h2>Receipt</h2>
      {orderId && (
        <div className="receipt-details">
          <p>Order ID: {orderId}</p>
          <p>Customer ID: {customerId}</p>
          <p>Payment Method: {paymentMethod}</p>
          <p>Payment Amount: {paymentAmount}</p>
          <p>Product: {product}</p>
        </div>
      )}
      {!orderId && <p>Loading...</p>}
      <button onClick={() => window.print()} className="print-button">
        Print
      </button>
    </div>
  );
}
