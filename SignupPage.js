import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SignupPage.css';
import axios from 'axios';

const SignupPage = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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
        const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
          name,
          email,
          password,
        });

        const token = response.data.accessToken;
        localStorage.setItem('token', token);

        setName('');
        setEmail('');
        setPassword('');

        history.push('/');
      } catch (error) {
        // Handle signup error here, show error messages, etc.
        console.error('Signup failed:', error);
        setShowErrorPopup(true);
      }
    } else {
      setErrors(validationErrors);
      setShowErrorPopup(true);
    }
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const validateForm = () => {
    const errors = [];

    // Name validation
    if (!name.trim()) {
      errors.push('Please enter your name');
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      errors.push('Please enter a valid email address');
    }

    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password.match(passwordPattern)) {
      errors.push(
        'Please enter a password with at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special symbol (!@#$%^&*)'
      );
    }

    return errors;
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src="https://tse3.mm.bing.net/th?id=OIP.h-GFVVmViolj45ncro8SfQHaHc&pid=Api&P=0&h=180" alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <i
              className={`password-toggle fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={handleTogglePasswordVisibility}
            ></i>
          </div>
        </div>
        
          <button className="submit">Signup</button>
          
        
        <div className="signup-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
      {showErrorPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
            <h3>Error.. Check your credentials or connection</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button className="error-popup-close" onClick={handleCloseErrorPopup}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
