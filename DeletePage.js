import axios from "axios";
import React, { useState } from "react";
import './DeletePage.css';
function Delete() {
  const [id, setSearch] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/deleteProduct/${id}`)
      .then(response => {
        console.log("Product deleted successfully!");
        setShowMessage(true); // Show the success message
        setTimeout(() => setShowMessage(false), 3000); // Hide the message after 3 seconds
        // You can add further logic or update state if needed
      })
      .catch(err => {
        console.log(err);
        // Handle the error if the delete request fails
      });
  }

  return (
    <div className="tt">
      <div className="ccc">
        <h1 id="dels">Delete a Product </h1>
        <div className="">
          <input
            type="text"
            className="k"
            placeholder="Enter the Id"
            value={id}
            onChange={e => setSearch(e.target.value)}
          />
          <button onClick={handleDelete}>Delete</button> {/* Add the delete button here */}
        </div>
      </div>

      {/* Show the message when the product is successfully deleted */}
      <div className={`message ${showMessage ? 'show' : ''}`}>
        The Product was successfully deleted
      </div>
    </div>
  );
}

export default Delete;
