// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Log in to access your GrahSeva account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
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
          
          <div className="form-extras">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="btn-primary login-btn">
            Log In
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button className="social-btn google-btn">
                <i className="fab fa-google"></i> Google
              </button>
              <button className="social-btn facebook-btn">
                <i className="fab fa-facebook"></i> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="login-image">
        <div className="service-highlights">
          <h2>Your Home Services Partner</h2>
          <ul>
            <li>Professional Plumbing</li>
            <li>Expert Electricians</li>
            <li>Reliable House Maids</li>
            <li>Skilled Carpenters</li>
            <li>And much more...</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;