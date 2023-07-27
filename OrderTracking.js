import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './OrderTracking.css';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingStatus, setTrackingStatus] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (trackingStatus && trackingStatus.status === 'Delivered') {
      const timer = setTimeout(() => {
        history.push('/feedback');
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [trackingStatus, history]);

  const handleOrderNumberChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();

    // Simulate API call to track order
    // Replace with your own logic to fetch tracking information
    // For this example, let's assume the trackingStatus is received from the API
    const trackingStatusFromAPI = getTrackingStatusFromAPI(orderNumber);

    setTrackingStatus(trackingStatusFromAPI);
  };

  const getTrackingStatusFromAPI = (orderNumber) => {
    // Simulate the tracking status received from the API based on the order number
    // Replace this with your own logic to fetch the tracking status
    // In this example, we have a hardcoded list of tracking statuses
    const trackingStatuses = [
      { orderNumber: '123456', status: 'Shipped', day: 'Yesterday' },
      { orderNumber: '789012', status: 'In Transit', day: 'Yesterday' },
      { orderNumber: '345678', status: 'Out for Delivery', day: 'Today' },
      { orderNumber: '901234', status: 'Delivered', day: 'Today' },
    ];

    const status = trackingStatuses.find(
      (trackingStatus) => trackingStatus.orderNumber === orderNumber
    );

    return status ? status : null;
  };

  return (
    <div className="order-tracking-container">
      <h2>Order Tracking</h2>
      <form onSubmit={handleTrackOrder}>
        <label htmlFor="order-number">Order Number:</label>
        <input
          type="text"
          id="order-number"
          value={orderNumber}
          onChange={handleOrderNumberChange}
          required
        />
        <button type="submit">Track Order</button>
      </form>

      {trackingStatus && (
        <div className="tracking-status">
          <h3>Tracking Status:</h3>
          <p>
            {trackingStatus.day} - {trackingStatus.status}
          </p>
          <div className="status-map">
            <div className={`status-dot ${trackingStatus.status === 'Shipped' ? 'active' : ''}`}>
              <span className="dot-text"></span>
              <span className="dot-status">Order Day</span>
            </div>
            <div className={`status-dot ${trackingStatus.status === 'In Transit' ? 'active' : ''}`}>
              <span className="dot-text"></span>
              <span className="dot-status">Shipping</span>
            </div>
            <div className={`status-dot ${trackingStatus.status === 'Out for Delivery' ? 'active' : ''}`}>
              <span className="dot-text"></span>
              <span className="dot-status">Out of Delivery</span>
            </div>
            <div className={`status-dot ${trackingStatus.status === 'Delivered' ? 'active' : ''}`}>
              <span className="dot-text"></span>
              <span className="dot-status">Successfully Delivered</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
