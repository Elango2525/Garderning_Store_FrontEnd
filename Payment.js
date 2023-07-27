import React, { useState } from "react";
import Receipt from "./Receipt";
import { useHistory } from "react-router-dom";

import "./Payment.css";

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedUPIOption, setSelectedUPIOption] = useState("");
  const [upiNumber, setUpiNumber] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [name, setName] = useState("");
  

  const handlePaymentMethodChange = (e) => {
    setSelectedMethod(e.target.value);
    setSelectedUPIOption("");
    setUpiNumber("");
    setError("");
  };
  const history = useHistory();

  const handleUPIOptionChange = (e) => {
    setSelectedUPIOption(e.target.value);
    setUpiNumber("");
    setError("");
  };
  

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    let errorMessage = "";
    if (selectedMethod === "card") {
      if (!selectedCardType) {
        isValid = false;
        errorMessage = "Please select the card type.";
      } else if (!cardNumber) {
        isValid = false;
        errorMessage = "Please enter the card number.";
      }
    }

    if (selectedUPIOption === "gpay") {
      // Check if UPI ID starts with the email ID
      const emailRegex = /^([^@]+)@[^@]+\.[^@]+$/;
      if (!emailRegex.test(upiNumber) || !upiNumber.startsWith(userEmail)) {
        isValid = false;
        errorMessage = "GPay UPI ID should start with your email ID.";
      }
    } else if (selectedUPIOption === "paytm") {
      // Check if UPI ID is a valid mobile number
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(upiNumber)) {
        isValid = false;
        errorMessage = "Paytm UPI ID should be a valid mobile number.";
      }
    } else if (selectedUPIOption === "phonepe") {
      // Check if UPI ID is a valid mobile number
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(upiNumber)) {
        isValid = false;
        errorMessage = "PhonePe UPI ID should be a valid mobile number.";
      }
    }

    if (isValid) {
      // Perform payment processing logic here
      // Simulating a successful payment after 2 seconds
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        // Redirect to receipt page
        // Pass the necessary data as props
        const orderId = generateOrderId(); // Replace with your own logic to generate an order ID
        const customerId = generateCustomerId(); // Replace with your own logic to generate a customer ID
        const amount = calculatePaymentAmount(); // Replace with your own logic to calculate the payment amount
        const product = "Product Name"; // Replace with the actual product name
        history.push("/rec", {
          orderId,
          customerId,
          paymentMethod: selectedMethod,
          paymentAmount: amount,
          product,
        });
      }, 2000);
    }else {
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleUpiNumberChange = (e) => {
    setUpiNumber(e.target.value);
    setError("");
  };

  const handleCardTypeChange = (e) => {
    setSelectedCardType(e.target.value);
    setError("");
  };
  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
    setError("");
  };
  const generateRandomId = () => {
    return Math.random().toString(16).substring(2); // Generate a random string and remove "0." prefix
  };
  
  const generateOrderId = () => {
    return "ORDER" + generateRandomId();
  };
  
  const generateCustomerId = () => {
    return "CUSTOMER" + generateRandomId();
  };
  

  const handleCVVChange = (e) => {
    setCVV(e.target.value);
    setError("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    setError("");
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  // Replace with the actual user's email or retrieve it from the appropriate source
  const userEmail = "user@example.com";

  const isCashOnDelivery = selectedMethod === "cash-on-delivery";

  
  const calculatePaymentAmount = () => {
    // Implement your own logic to calculate the payment amount
    return 100; // Example amount
  };

  if (paymentSuccess && !isCashOnDelivery) {
    const orderId = generateOrderId(); // Replace with your own logic to generate an order ID
    const customerId = generateCustomerId(); // Replace with your own logic to generate a customer ID
    const amount = calculatePaymentAmount(); // Replace with your own logic to calculate the payment amount
    const product = "Product Name"; // Replace with the actual product name
    return (
      <Receipt
        orderId={orderId}
        customerId={customerId}
        paymentMethod={selectedMethod}
        paymentAmount={amount}
        product={product}
      />
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Payment Details</h2>
        </div>
        <div className="payment-body">
          <form onSubmit={handlePaymentSubmit}>
            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              <div className="payment-method">
                <input
                  type="radio"
                  id="card"
                  name="payment-method"
                  value="card"
                  checked={selectedMethod === "card"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="card">Card</label>
              </div>
              <div className="payment-method">
                <input
                  type="radio"
                  id="cash-on-delivery"
                  name="payment-method"
                  value="cash-on-delivery"
                  checked={selectedMethod === "cash-on-delivery"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="cash-on-delivery">Cash on Delivery</label>
              </div>
              <div className="payment-method">
                <input
                  type="radio"
                  id="upi"
                  name="payment-method"
                  value="upi"
                  checked={selectedMethod === "upi"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="upi">UPI</label>
              </div>
            </div>

            {selectedMethod === "upi" && (
              <>
                <div className="payment-method-inner">
                  <input
                    type="radio"
                    id="gpay"
                    name="payment-method-inner"
                    value="gpay"
                    checked={selectedUPIOption === "gpay"}
                    onChange={handleUPIOptionChange}
                  />
                  <label className="gpay-label" htmlFor="gpay">
                    GPay
                  </label>
                </div>
                <div className="payment-method-inner">
                  <input
                    type="radio"
                    id="paytm"
                    name="payment-method-inner"
                    value="paytm"
                    checked={selectedUPIOption === "paytm"}
                    onChange={handleUPIOptionChange}
                  />
                  <label className="paytm-label" htmlFor="paytm">
                    Paytm
                  </label>
                </div>
                <div className="payment-method-inner">
                  <input
                    type="radio"
                    id="phonepe"
                    name="payment-method-inner"
                    value="phonepe"
                    checked={selectedUPIOption === "phonepe"}
                    onChange={handleUPIOptionChange}
                  />
                  <label className="phonepe-label" htmlFor="phonepe">
                    PhonePe
                  </label>
                </div>
              </>
            )}

            {selectedMethod === "card" && (
              <div className="card-details">
                <div className="card-type">
                  <label htmlFor="card-type">Select Card Type:</label>
                  <div className="custom-select">
                    <select
                      id="card-type"
                      value={selectedCardType}
                      onChange={handleCardTypeChange}
                    >
                      <option value="">Select Card Type</option>
                      <option value="debit">Debit Card</option>
                      <option value="credit">Credit Card</option>
                    </select>
                  </div>
                </div>

                <div className="card-number">
                  <label htmlFor="card-number">Card Number:</label>
                  <input
                    type="text"
                    id="card-number"
                    placeholder="Enter your card number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </div>

                <div className="expiration-date">
                  <label htmlFor="expiration-date">Expiration Date (MM/YYYY):</label>
                  <input
                    type="text"
                    id="expiration-date"
                    placeholder="Enter expiration date"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                  />
                </div>

                <div className="cvv">
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="password"
                    id="cvv"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={handleCVVChange}
                  />
                </div>

                <div className="name">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
            )}

            {selectedMethod === "upi" && selectedUPIOption && (
              <div className="upi-details">
                <label htmlFor="upi-number">Enter UPI ID:</label>
                <input
                  type="text"
                  id="upi-number"
                  placeholder="Enter your UPI ID"
                  value={upiNumber}
                  onChange={handleUpiNumberChange}
                />
              </div>
            )}

            <div className="coupon-code">
              <label htmlFor="coupon-code">Coupon Code:</label>
              <input
                type="text"
                id="coupon-code"
                placeholder="Enter coupon code (optional)"
                value={couponCode}
                onChange={handleCouponCodeChange}
              />
            </div>

            {isCashOnDelivery ? (
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            ) : (
              <button type="submit" className="make-payment-btn">
                Make Payment
              </button>
            )}

            {paymentSuccess && (
              <div className="success-animation">
                <span className="tick">&#10004;</span>
                <p>Payment Successful!</p>
              </div>
            )}

            {error && (
              <div className="error-animation">
                <span className="error-icon">&#10060;</span>
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
