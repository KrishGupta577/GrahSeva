// Dashboard.jsx
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './DashboardPage.css';

// Components
import ActiveServices from '../../components/ActiveServices/ActiveServices';
import Sidebar from '../../components/Sidebar/Sidebar';
import MyProfile from '../../components/MyProfile/MyProfile';
import FindServices from '../../components/FindServices/FindServices';
import BookingHistory from '../../components/BookingHistory/BookingHistory';
import Settings from '../../components/Setting/Setting';
import { MyContext } from '../../Context/ContextStore';

// Home Dashboard Component
const DashboardHome = ({ navigateToTab }) => {
  return (
    <div className="dashboard-home">
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Active Bookings</h3>
          <p className="summary-number">2</p>
          <p className="summary-text">Services in progress</p>
        </div>
        <div className="summary-card">
          <h3>Upcoming Services</h3>
          <p className="summary-number">3</p>
          <p className="summary-text">In the next 7 days</p>
        </div>
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p className="summary-number">₹4,250</p>
          <p className="summary-text">This month</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => navigateToTab('services')}>
            <span className="action-icon">🔍</span>
            <span>Find Service</span>
          </button>
          <button className="action-btn" onClick={() => navigateToTab('services')}>
            <span className="action-icon">📅</span>
            <span>Schedule Service</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">⭐</span>
            <span>Rate Provider</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🏠</span>
            <span>Add Address</span>
          </button>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-container">
          <div className="section-header">
            <h3>Active Services</h3>
            <button className="btn-text" onClick={() => navigateToTab('active-services')}>View All</button>
          </div>
          <ActiveServices limit={2} />
        </div>

        <div className="section-container">
          <div className="section-header">
            <h3>Recent Bookings</h3>
            <button className="btn-text" onClick={() => navigateToTab('booking-history')}>View All</button>
          </div>
          <BookingHistory limit={3} />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { userInfo } = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Map current path to active tab
  const getCurrentTab = () => {
    const path = location.pathname.split('/').pop();
    
    switch(path) {
      case 'dashboard':
        return 'home';
      case 'active-services':
        return 'services';
      case 'booking-history':
        return 'history';
      case 'find-services':
        return 'find';
      case 'profile':
        return 'profile';
      case 'settings':
        return 'settings';
      default:
        return 'home';
    }
  };
  
  const activeTab = getCurrentTab();
  
  // Function to navigate between tabs
  const navigateToTab = (tab) => {
    switch(tab) {
      case 'home':
        navigate('/dashboard');
        break;
      case 'services':
        navigate('/dashboard/active-services');
        break;
      case 'history':
        navigate('/dashboard/booking-history');
        break;
      case 'find':
        navigate('/dashboard/find-services');
        break;
      case 'profile':
        navigate('/dashboard/profile');
        break;
      case 'settings':
        navigate('/dashboard/settings');
        break;
      default:
        navigate('/dashboard');
    }
  };

  if (!userInfo) {
    return <div className="loading-screen">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={navigateToTab} />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>Welcome back, {userInfo.name}!</h2>
          <div className="user-controls">
            <div className="notifications">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </div>
            <div className="user-profile">
              <img src="/profile_photo.png" alt="User Profile" className="user-profile-photo" />
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<DashboardHome navigateToTab={navigateToTab} />} />
            <Route path="/active-services" element={<ActiveServices />} />
            <Route path="/booking-history" element={<BookingHistory />} />
            <Route path="/find-services" element={<FindServices />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;