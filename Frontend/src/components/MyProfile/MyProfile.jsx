// MyProfile.jsx
import React, { useState, useEffect } from 'react';
import './MyProfile.css';

const MyProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Raj Kumar',
    email: 'raj.kumar@email.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Bangalore, Karnataka',
    profileImage: '/api/placeholder/120/120'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...profile});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({...formData});
    setIsEditing(false);
    // In a real app, you would send this to your backend
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button 
          className={`btn-${isEditing ? 'secondary' : 'primary'}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-image-section">
          <div className="profile-image-container">
            <img src={profile.profileImage} alt="Profile" className="profile-image" />
            {isEditing && (
              <div className="profile-image-overlay">
                <button className="btn-outline">Change Photo</button>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
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
                value={formData.email} 
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
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                rows="3" 
                required 
              />
            </div>
            <button type="submit" className="btn-primary">Save Changes</button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-group">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{profile.name}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{profile.email}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">{profile.phone}</span>
            </div>
            <div className="detail-group">
              <span className="detail-label">Address</span>
              <span className="detail-value">{profile.address}</span>
            </div>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h3>Service Preferences</h3>
        <div className="preferences-container">
          <div className="preference-card">
            <h4>Preferred Service Hours</h4>
            <p>Weekdays: 9:00 AM - 6:00 PM</p>
            <p>Weekends: 10:00 AM - 4:00 PM</p>
            <button className="btn-outline">Update</button>
          </div>
          <div className="preference-card">
            <h4>Notification Settings</h4>
            <div className="preference-toggle">
              <span>Email Notifications</span>
              <label className="switch">
                <input type="checkbox" checked readOnly />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="preference-toggle">
              <span>SMS Notifications</span>
              <label className="switch">
                <input type="checkbox" checked readOnly />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="preference-toggle">
              <span>Promotional Offers</span>
              <label className="switch">
                <input type="checkbox" readOnly />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;