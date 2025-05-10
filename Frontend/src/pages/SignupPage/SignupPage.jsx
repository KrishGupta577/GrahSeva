import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
      });

      alert(response.data); // show success message
      navigate('/Login'); // ✅ Redirect to login page
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Your Account</h1>
          <p>Join GrahSeva and find reliable home services</p>
        </div>
        <div className="signup-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Personal Info</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Contact</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Complete</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          {step === 1 && (
            <div className="form-step">
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
              <div className="form-buttons">
                <button type="button" className="btn-primary" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
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
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="button" className="btn-outline" onClick={prevStep}>
                  Back
                </button>
                <button type="button" className="btn-primary" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="form-step">
              <div className="form-group terms-group">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="agreeTerms">
                    I agree to the <a href="/terms" className="terms-link">Terms of Service</a> and <a href="/privacy" className="terms-link">Privacy Policy</a>
                  </label>
                </div>
              </div>
              <div className="final-review">
                <h3>Review Your Information</h3>
                <div className="review-info">
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>
              </div>
              <div className="form-buttons">
                <button type="button" className="btn-outline" onClick={prevStep}>
                  Back
                </button>
                <button type="submit" className="btn-primary">
                  Create Account
                </button>
              </div>
            </div>
          )}
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
        </div>
      </div>
      <div className="signup-info">
        <div className="benefits">
          <h2>Why Choose GrahSeva</h2>
          <div className="benefit-item">
            <div className="benefit-icon">🏡</div>
            <div className="benefit-text">
              <h3>Verified Professionals</h3>
              <p>All service providers undergo background checks and skill verification</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">⭐</div>
            <div className="benefit-text">
              <h3>Quality Guarantee</h3>
              <p>Satisfaction guaranteed or we'll make it right</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🔒</div>
            <div className="benefit-text">
              <h3>Secure Booking</h3>
              <p>Safe payment options and encrypted personal information</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">⏱️</div>
            <div className="benefit-text">
              <h3>Timely Service</h3>
              <p>On-time service delivery with real-time tracking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
