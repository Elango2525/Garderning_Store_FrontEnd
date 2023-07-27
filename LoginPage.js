import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LoginPage.css';

import axios from 'axios';

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length === 0) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
          email,
          password,
        });

        const token = response.data.accessToken;
        localStorage.setItem('token', token);

        setEmail('');
        setPassword('');
        history.push('/product-catalog');
      } catch (error) {
        setShowErrorPopup(true);
      }
    } else {
      setShowErrorPopup(true);
    }
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const validateForm = () => {
    const errors = [];

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      errors.push('Please enter a valid email address');
    }

    // Password validation
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password.match(passwordPattern)) {
      errors.push(
        'Please enter a password with at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special symbol (!@#$%^&*)'
      );
    }

    return errors;
  };
  

  return (
    
    <div className="logins-container"> <div className="signup-link">
    
    <a className="blink1">
      <Link to="/AdminLogin"> Admin</Link>
    </a>
  </div>
      <div className="logo">
        <img src="https://tse3.mm.bing.net/th?id=OIP.h-GFVVmViolj45ncro8SfQHaHc&pid=Api&P=0&h=180" alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <i
              className={`password-toggle fas ${
                showPassword ? 'fa-eye-slash' : 'fa-eye'
              }`}
              onClick={handleTogglePasswordVisibility}
            ></i>
          </div>
        </div>
        <div className="social-buttons">
          <button className="submit">Login</button>
          </div>
        <p className="forgot-password">
          <a href="#"><Link to="/Forgot">Forgot password?</Link></a>
        </p>
        <div className="signup-link">
          Don't have an account?
          <a className="blink">
            <Link to="/signup"> Sign up</Link>
          </a>
        </div>
      </form>
      {showErrorPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
            <h3>Error</h3>
            <ul>
              {validateForm().map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button className="error-popup-close" onClick={handleCloseErrorPopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
