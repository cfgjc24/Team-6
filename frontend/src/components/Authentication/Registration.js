import React, { useState } from 'react';
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
    allLessons: '',
    lessonsCompleted: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
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
          <label htmlFor="allLessons">All Lessons</label>
          <input
            type="text"
            id="allLessons"
            name="allLessons"
            placeholder="Enter all lessons"
            value={formData.allLessons}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lessonsCompleted">Lessons Completed</label>
          <input
            type="text"
            id="lessonsCompleted"
            name="lessonsCompleted"
            placeholder="Enter completed lessons"
            value={formData.lessonsCompleted}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
