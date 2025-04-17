// FindServices.jsx
import React, { useState } from 'react';
import './FindServices.css';

const FindServices = () => {
  const serviceCategories = [
    {
      id: 1,
      name: 'Plumbing',
      icon: '🔧',
      services: ['Pipe Fitting', 'Leak Repair', 'Tap Installation', 'Drainage Issues']
    },
    {
      id: 2,
      name: 'Electrical',
      icon: '⚡',
      services: ['Wiring', 'Switch Repair', 'Installation', 'Fan Repair']
    },
    {
      id: 3,
      name: 'Cleaning',
      icon: '🧹',
      services: ['Home Cleaning', 'Deep Cleaning', 'Office Cleaning', 'Bathroom Cleaning']
    },
    {
      id: 4,
      name: 'Painting',
      icon: '🖌️',
      services: ['Interior Painting', 'Exterior Painting', 'Touch-ups', 'Wall Texturing']
    },
    {
      id: 5,
      name: 'Carpentry',
      icon: '🪚',
      services: ['Furniture Assembly', 'Door Repair', 'Custom Shelving', 'Kitchen Cabinets']
    },
    {
      id: 6,
      name: 'Gardening',
      icon: '🌱',
      services: ['Lawn Maintenance', 'Plant Care', 'Garden Design', 'Tree Trimming']
    },
    {
      id: 7,
      name: 'Housekeeping',
      icon: '🏠',
      services: ['Daily Maid Service', 'Laundry', 'Dishwashing', 'Kitchen Cleaning']
    },
    {
      id: 8,
      name: 'Appliance Repair',
      icon: '🔌',
      services: ['AC Repair', 'Refrigerator Service', 'Washing Machine Repair', 'TV Repair']
    }
  ];
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="find-services">
      <div className="page-header">
        <h1>Find Services</h1>
        <p>Browse and book reliable home services from verified professionals</p>
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for services..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="btn-primary search-btn">Search</button>
      </div>
      
      <div className="categories-container">
        <h2>Service Categories</h2>
        <div className="categories-grid">
          {serviceCategories.map(category => (
            <div 
              key={category.id} 
              className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
      
      {selectedCategory && (
        <div className="services-list">
          <h2>{serviceCategories.find(c => c.id === selectedCategory)?.name} Services</h2>
          <div className="services-grid">
            {serviceCategories
              .find(c => c.id === selectedCategory)
              ?.services.map((service, index) => (
                <div className="service-card" key={index}>
                  <h3>{service}</h3>
                  <p>Starting from ₹499</p>
                  <button className="btn-primary">Book Now</button>
                </div>
              ))}
          </div>
        </div>
      )}
      
      <div className="popular-services">
        <h2>Popular Services</h2>
        <div className="popular-services-grid">
          <div className="popular-service-card">
            <div className="service-img" style={{ backgroundColor: 'var(--primary-light)' }}>🧹</div>
            <h3>House Deep Cleaning</h3>
            <div className="service-rating">4.8 ⭐</div>
            <p>Comprehensive cleaning of your entire home</p>
            <div className="service-price">
              <span className="price">₹999</span>
              <button className="btn-secondary">Book</button>
            </div>
          </div>
          
          <div className="popular-service-card">
            <div className="service-img" style={{ backgroundColor: 'var(--accent-light)' }}>⚡</div>
            <h3>Electrical Works</h3>
            <div className="service-rating">4.7 ⭐</div>
            <p>Complete electrical services by certified professionals</p>
            <div className="service-price">
              <span className="price">₹499</span>
              <button className="btn-secondary">Book</button>
            </div>
          </div>
          
          <div className="popular-service-card">
            <div className="service-img" style={{ backgroundColor: 'var(--secondary-light)' }}>🛠️</div>
            <h3>Bathroom Repair</h3>
            <div className="service-rating">4.9 ⭐</div>
            <p>Fix leaky taps, showers and other bathroom issues</p>
            <div className="service-price">
              <span className="price">₹799</span>
              <button className="btn-secondary">Book</button>
            </div>
          </div>
          
          <div className="popular-service-card">
            <div className="service-img" style={{ backgroundColor: 'var(--info)' }}>🧑‍🍳</div>
            <h3>Cook Services</h3>
            <div className="service-rating">4.6 ⭐</div>
            <p>Experienced cooks for daily meal preparation</p>
            <div className="service-price">
              <span className="price">₹8999/month</span>
              <button className="btn-secondary">Book</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindServices;