import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleFname = (event) => {
    event.preventDefault();
    setFname(event.target.value);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form fields
    setErrors(validateForm({ email, password, fname }));

    if (isSubmit) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
          email,
          password,
          name: fname,
          role: 'USER', // Assuming 'USER' role for registration
        });

        if (response.status === 200) {
          setErrors({});
          setIsSubmit(false);

          // Save the token in local storage
          const token = response.data.token;
          localStorage.setItem('token', token);

          // Redirect to LandingPage
          window.location.href = '/LandingPage';
        } else {
          setErrors({ submit: 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setErrors({ submit: 'Registration failed. Please try again.' });
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

    if (values.fname.trim() === '') {
      errors.fname = 'Name is required';
      setIsSubmit(false);
    }

    if (values.password.trim() === '') {
      errors.password = 'Password is required';
      setIsSubmit(false);
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      setIsSubmit(false);
    }

    setIsSubmit(true);
    return errors;
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);    
  };

  return (
    <>
      <div className='imggg'></div>
      <div className='cont'>
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='mb-2'>
                <h3 className='text-center'>Sign Up</h3>
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='Enter Email' className='form-control' onChange={handleEmail} />
                {errors.email}
              </div>
              <div>
                <label htmlFor='fname'>Name</label>
                <input type='text' placeholder='Enter Name' className='form-control' onChange={handleFname} />
                {errors.fname}
              </div>

              <div>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password' className='form-control' onChange={handlePassword} />
                {errors.password}
              </div>

              <div className='d-grid'>
                <button type='submit' className='btn btn-primary'>
                  Sign up
                </button>
              </div>
              <p className='stef'>
                Forgot <a href=''>Password</a>
              </p>
              {errors.submit && <div className='error'>{errors.submit}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;