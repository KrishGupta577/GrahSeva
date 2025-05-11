import React, { useContext, useEffect, useState } from 'react';
import './FindServices.css';
import axios from 'axios';
import { MyContext } from '../../Context/ContextStore';
import BookingForm from '../BookingForm/BookingForm';

const FindServices = () => {
  const { url } = useContext(MyContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const serviceIcons = {
    'Electrician': '⚡',
    'Plumber': '🔧',
    'Carpenter': '🪚',
    'AC Service': '❄️',
    'Painter': '🖌️',
    'House Cleaning': '🧹',
    'Pest Control': '🐜',
    'Gardener': '🌱'
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/services`);
      setServices(response.data);
      setFilteredServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to load services. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [url]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service => 
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const serviceCategories = services.map(service => ({
    id: service.serviceId,
    name: service.serviceName,
    icon: serviceIcons[service.serviceName] || '🛠️'
  }));

  const formatPrice = (price) => {
    return `₹${price}`;
  };

  const handleBookService = (service) => {
    const serviceWithIcon = {
      ...service,
      icon: serviceIcons[service.serviceName] || '🛠️'
    };
    setBookingService(serviceWithIcon);
  };

  const handleCloseBookingForm = () => {
    setBookingService(null);
  };

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData);
    setBookingService(null);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading services, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button className="btn-primary" onClick={fetchServices}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="find-services">
      {showSuccessMessage && (
        <div className="success-message">
          <div className="success-content">
            <span className="success-icon">✓</span>
            <p>Booking confirmed successfully! Our team will contact you shortly.</p>
            <button className="close-button" onClick={() => setShowSuccessMessage(false)}>×</button>
          </div>
        </div>
      )}
      
      <div className="page-header">
        <h1>Find Services</h1>
        <p>Browse and book reliable home services from verified professionals</p>
      </div>

      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn-primary search-btn">Search</button>
      </form>

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
          <h2>{services.find(s => s.serviceId === selectedCategory)?.serviceName} Details</h2>
          <div className="selected-service-details">
            {services
              .filter(s => s.serviceId === selectedCategory)
              .map(service => (
                <div className="selected-service-card" key={service.serviceId}>
                  <div className="service-header">
                    <div className="service-img" style={{ backgroundColor: 'var(--primary-light)' }}>
                      {serviceIcons[service.serviceName] || '🛠️'}
                    </div>
                    <div>
                      <h3>{service.serviceName}</h3>
                      <div className="service-rating">4.8 ⭐</div>
                    </div>
                  </div>
                  <p className="service-description">{service.description}</p>
                  <div className="service-price">
                    <span className="price">{formatPrice(service.price)}</span>
                    <button className="btn-primary" onClick={() => handleBookService(service)}>Book Now</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="all-services">
        <h2>Available Services</h2>
        {filteredServices.length === 0 ? (
          <p className="no-results">No services match your search. Please try different keywords.</p>
        ) : (
          <div className="services-grid">
            {filteredServices.map(service => (
              <div className="service-card" key={service.serviceId}>
                <div className="service-img" style={{ backgroundColor: 'var(--accent-light)' }}>
                  {serviceIcons[service.serviceName] || '🛠️'}
                </div>
                <h3>{service.serviceName}</h3>
                <div className="service-rating">4.7 ⭐</div>
                <p>{service.description}</p>
                <div className="service-price">
                  <span className="price">{formatPrice(service.price)}</span>
                  <button className="btn-secondary" onClick={() => handleBookService(service)}>Book</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="popular-services">
        <h2>Most Popular Services</h2>
        <div className="popular-services-grid">
          {/* Display 4 services with highest assumed popularity (we could add popularity metrics later) */}
          {services.slice(0, 4).map((service, index) => (
            <div className="popular-service-card" key={service.serviceId}>
              <div 
                className="service-img" 
                style={{ 
                  backgroundColor: 
                    index === 0 ? 'var(--primary-light)' : 
                    index === 1 ? 'var(--accent-light)' : 
                    index === 2 ? 'var(--secondary-light)' : 'var(--info)' 
                }}
              >
                {serviceIcons[service.serviceName] || '🛠️'}
              </div>
              <h3>{service.serviceName}</h3>
              <div className="service-rating">4.{8 - (index % 3)} ⭐</div>
              <p>{service.description}</p>
              <div className="service-price">
                <span className="price">{formatPrice(service.price)}</span>
                <button className="btn-secondary" onClick={() => handleBookService(service)}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bookingService && (
        <BookingForm 
          service={bookingService}
          onClose={handleCloseBookingForm}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default FindServices;