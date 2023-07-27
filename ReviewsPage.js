import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReviewsPage = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    rating: '',
    comment: '',
  });

  useEffect(() => {
    axios.get(`/api/products/${productId}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [productId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    axios.post(`/api/products/${productId}/reviews`, formData)
      .then((response) => {
        // Add the newly added review to the state
        setReviews((prevReviews) => [...prevReviews, response.data]);
        // Clear the form data
        setFormData({
          customerName: '',
          rating: '',
          comment: '',
        });
      })
      .catch((error) => {
        console.error('Error adding review:', error);
      });
  };

  const handleEditReview = (reviewId) => {
    // Implementation to edit the review with the given reviewId
    // You can use a separate form and PUT request similar to addReview
    // Update the review in the state after successful edit
  };

  const handleDeleteReview = (reviewId) => {
    axios.delete(`/api/products/${productId}/reviews/${reviewId}`)
      .then(() => {
        // Remove the deleted review from the state
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };

  return (
    <div>
      <h1>Reviews for Product ID: {productId}</h1>
      <h2>Add Review</h2>
      <form onSubmit={handleAddReview}>
        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleFormChange}
          />
        </label>
        <button type="submit">Add Review</button>
      </form>

      {reviews.length > 0 ? (
        <div>
          <h2>Existing Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h3>Customer: {review.customerName}</h3>
                <div>Rating: {review.rating}</div>
                <div>Comment: {review.comment}</div>
                <button onClick={() => handleEditReview(review.id)}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews available for this product.</p>
      )}
    </div>
  );
};

export default ReviewsPage;
