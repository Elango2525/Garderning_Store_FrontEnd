import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch the reviews for the specified product using the productId
    axios.get(`http://localhost:8080/api/reviews`)
      .then((response) => {
        const reviews = response.data;
        setReviews(reviews);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [productId]);

  return (
    <div>
      <h2>Reviews:</h2>
      {reviews.map((review, index) => (
        <div key={index}>
            <p>ProductId: {review.productId}</p>
          <p>Customer Name: {review.customerName}</p>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default GetReview;
