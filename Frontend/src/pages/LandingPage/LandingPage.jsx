// components/LandingPage/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const services = [
    { id: 1, name: "Plumbing", icon: "🔧", description: "Expert plumbing services for repairs and installations" },
    { id: 2, name: "House Cleaning", icon: "🧹", description: "Professional home cleaning services" },
    { id: 3, name: "Electrician", icon: "⚡", description: "Electrical repair and installation services" },
    { id: 4, name: "Gardening", icon: "🌱", description: "Garden maintenance and landscaping" },
    { id: 5, name: "Painting", icon: "🖌️", description: "Interior and exterior painting services" },
    { id: 6, name: "Carpentry", icon: "🪚", description: "Custom woodwork and furniture repair" },
    { id: 7, name: "Appliance Repair", icon: "🔌", description: "Fixing household appliances" },
    { id: 8, name: "Pest Control", icon: "🐜", description: "Effective pest management solutions" }
  ];

  const testimonials = [
    { id: 1, name: "Priya Sharma", text: "GrahSeva made finding a reliable plumber so easy! Great service, will use again.", rating: 5 },
    { id: 2, name: "Rahul Verma", text: "I needed urgent electrical work and got connected with a professional within an hour. Excellent platform!", rating: 5 },
    { id: 3, name: "Ananya Patel", text: "The house cleaning service I got through GrahSeva exceeded my expectations. My home has never looked better!", rating: 4 }
  ];

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <h1>GrahSeva</h1>
          </div>
          <nav className="nav">
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><Link to="/login" className="btn-outline">Login</Link></li>
              <li><Link to="/signup" className="btn-primary">Sign Up</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Your Home Services, Just a Click Away</h1>
            <p>Find reliable professionals for all your household needs - plumbing, cleaning, electrical work, and more!</p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn-primary">Get Started</Link>
              <a href="#services" className="btn-outline">Explore Services</a>
            </div>
          </div>
          <div className="hero-image">
            {/* Placeholder for hero image */}
            <div className="image-placeholder"></div>
          </div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional and reliable household services at your doorstep</p>
          
          <div className="services-grid">
            {services.map(service => (
              <div className="service-card" key={service.id}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section how-section">
        <div className="container">
          <h2 className="section-title">How GrahSeva Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose a Service</h3>
              <p>Browse through our wide range of home services and select what you need</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Book an Appointment</h3>
              <p>Select your preferred date and time slot that works for you</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Professional Arrives</h3>
              <p>Our verified professional will arrive at your doorstep on time</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Enjoy Quality Service</h3>
              <p>Relax as the job gets done professionally and efficiently</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials">
            {testimonials.map(testimonial => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="rating">
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to make your home better?</h2>
          <p>Join thousands of satisfied customers who trust GrahSeva for their home service needs</p>
          <Link to="/signup" className="btn-primary cta-button">Sign Up Now</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>GrahSeva</h2>
              <p>Your trusted partner for home services</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h3>Services</h3>
                <ul>
                  <li><a href="#plumbing">Plumbing</a></li>
                  <li><a href="#cleaning">Cleaning</a></li>
                  <li><a href="#electrical">Electrical</a></li>
                  <li><a href="#gardening">Gardening</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>Company</h3>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#partners">Partner With Us</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>Support</h3>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#feedback">Feedback</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} GrahSeva. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;