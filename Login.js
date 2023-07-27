import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form fields
    setErrors(validateForm({ email, password }));

    if (isSubmit) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
          email,
          password,
        });

        if (response.status === 200) {
          setErrors({});
          setIsSubmit(false);

          // Save the token and user data in local storage
          const token = response.data.token;
          const user = response.data.userResponse;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          // Redirect to LandingPage
          
        } else {
          setErrors({ submit: 'Invalid credentials. Please try again.' });
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrors({ submit: 'Login failed. Please try again.' });
      }
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (values.email.trim() === '') {
      errors.email = 'Email is required';
      setIsSubmit(false);
    } else if (!validateEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
      setIsSubmit(false);
    }

    if (values.password.trim() === '') {
      errors.password = 'Password is required';
      setIsSubmit(false);
    } else if (!validatePassword(values.password)) {
      errors.password =
        'Password must be 8-16 characters long, contain at least one uppercase letter, at least two numbers, and at least one special character';
      setIsSubmit(false);
    }

    setIsSubmit(true);
    return errors;
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) {
      return false;
    } else if (!/[A-Z]/.test(password)) {
      return false;
    } else if (!/\d.*\d/.test(password)) {
      return false;
    } else if (!/[!@#$%^&*()]/.test(password)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div className='imggg'></div>
      <div className='cont'>
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='mb-2'>
                <h3 className='text-center'>Sign In</h3>
                <label htmlFor='email'>Email</label>
                <div className='tae'>
                  <input type='email' placeholder='Enter Email' className='form-control' onChange={handleEmail} />
                  {errors.email}
                </div>
              </div>
              <div>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password' className='form-control' onChange={handlePassword} />
                {errors.password}
              </div>

              <div className='d-grid'>
                <Link to="/product-catalog"><button className='btn btn-primary'>Sign in</button></Link>
              </div>
              <p className='sofi'>
                <Link to='/signup' className='ms-2'>
                  Sign up
                </Link>
              </p>
              {errors.submit && <div className='error'>{errors.submit}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;