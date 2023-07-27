import React from "react";
import "./ButtonMain.css";
import { Link } from 'react-router-dom';

const ButtonComponent = () => {
  return (
   
      
      <div className="buttonMainer-container">
        <Link to='/AdminPage'>
          <button className="buttondd">Add Product</button>
        </Link>
        <Link to='./GetPage'>
          <button className="buttondd1">View Product</button>
        </Link>
        <Link to='/PutPage'>
          <button className="buttondd2">Update Product</button>
        </Link>
        <Link to='./DeletePage'>
          <button className="buttondd3">Delete Product</button>
        </Link>
        <Link to='./feedbackdis'>
          <button className="buttondd1">View Feedback</button>
        </Link>
      </div>
    
  );
};

export default ButtonComponent;
