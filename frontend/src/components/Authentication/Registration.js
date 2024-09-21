import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    tutor: '',
    usertype: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          school: formData.school,
          tutor: formData.tutor,
          user_type: formData.userType,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setError(null);
        navigate('/home');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Registration successful!</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="school">School</label>
          <input
            type="text"
            id="school"
            name="school"
            placeholder="Enter your school"
            value={formData.school}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tutor">Tutor(s)</label>
          <input
            type="text"
            id="tutor"
            name="tutor"
            placeholder="Enter tutor names"
            value={formData.tutor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_type">Type</label>
          <select
            id="user_type"
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="student">student</option>
            <option value="admin">admin</option>
            <option value="tutor">tutor</option>
          </select>
        </div>
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>

      <div className="redirect-login">
        <p>Already have an account?</p>
        <button onClick={redirectToLogin} className="login-button">
          Login
        </button>
      </div>

    </div>
  );
}

export default Registration;
