// Dashboard.jsx
import React, { useContext, useState } from 'react';
import './DashboardPage.css';
import ActiveServices from '../../components/ActiveServices/ActiveServices';
import Sidebar from '../../components/Sidebar/Sidebar';
import MyProfile from '../../components/MyProfile/MyProfile';
import FindServices from '../../components/FindServices/FindServices';
import BookingHistory from '../../components/BookingHistory/BookingHistory';
import Settings from '../../components/Setting/Setting';
import { MyContext } from '../../Context/ContextStore';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { userInfo } = useContext(MyContext)

  if (!userInfo) {
    return <div>Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>Welcome back, {userInfo.name}!</h2>
          <div className="user-controls">
            <div className="notifications">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </div>
            <div className="user-profile">
              <img src="/profile_photo.png" alt="User Profile" className='user-profile-photo' />
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {activeTab === 'home' && (
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
                <div className="summary-card">
                  <h3>Saved Providers</h3>
                  <p className="summary-number">7</p>
                  <p className="summary-text">Trusted professionals</p>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn">
                    <span className="action-icon">🔍</span>
                    <span>Find Service</span>
                  </button>
                  <button className="action-btn">
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
                    <button className="btn-text" onClick={() => setActiveTab('services')}>View All</button>
                  </div>
                  <ActiveServices limit={2} />
                </div>

                <div className="section-container">
                  <div className="section-header">
                    <h3>Recent Bookings</h3>
                    <button className="btn-text" onClick={() => setActiveTab('history')}>View All</button>
                  </div>
                  <BookingHistory limit={3} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && <ActiveServices />}
          {activeTab === 'history' && <BookingHistory />}
          {activeTab === 'find' && <FindServices />}
          {activeTab === 'profile' && <MyProfile />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;