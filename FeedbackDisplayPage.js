import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedDisPage.css";

const FeedbackDisplayPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data using axios.get
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/feedback/allf");
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Failed to fetch feedback data", error);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <div className="feedback-display-container">
      <h1>Feedback Received</h1>
      {feedbackData.length === 0 ? (
        <p>No feedback received yet.</p>
      ) : (
        <ul>
          {feedbackData.map((feedback, index) => (
            <li key={index} className="feedback-item">
              <strong>Name:</strong> {feedback.name}<br />
              <strong>Email:</strong> {feedback.email}<br />
              <strong>Message:</strong> {feedback.message}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackDisplayPage;
