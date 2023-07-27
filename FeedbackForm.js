import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitAnimation, setSubmitAnimation] = useState(false);
  const [redirectToCatalog, setRedirectToCatalog] = useState(false);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send the feedback data to a server or perform any other actions

    // Reset form fields after submission
    setRating(0);
    setComment('');
    setSubmitAnimation(true);
  };

  useEffect(() => {
    let timer;

    if (submitAnimation) {
      // Redirect to "/product-catalog" after 3 seconds
      timer = setTimeout(() => {
        setRedirectToCatalog(true);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [submitAnimation]);

  if (redirectToCatalog) {
    return <Redirect to="/product-catalog" />;
  }

  return (
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="rating-container">
          <label htmlFor="rating">Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${value <= rating ? 'active' : ''}`}
                onClick={() => handleRatingChange(value)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>

        <div className="comment-container">
          <div className="stef">
            <label htmlFor="comment">Comment:</label>
          </div>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            required
            placeholder="Enter your comment here"
          ></textarea>
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      {submitAnimation && (
        <div className="submit-animation">
          <div className="tick">&#10004;</div>
          <p className="thank-you">Thank you!</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
