// Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: '🏠' },
    { id: 'services', label: 'Active Services', icon: '⚙️' },
    { id: 'history', label: 'Booking History', icon: '📅' },
    { id: 'find', label: 'Find Services', icon: '🔍' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo">GrahSeva</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className={activeTab === item.id ? 'active' : ''}>
              <button onClick={() => setActiveTab(item.id)}>
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="support-card">
          <div className="support-icon">🛟</div>
          <h4>Need Help?</h4>
          <p>Our support team is available 24/7</p>
          <button className="btn-primary support-btn">Contact Support</button>
        </div>

        <button className="logout-btn" onClick={() => navigate('/') } >
          <span className="menu-icon">🚪</span>
          <span className="menu-text">Logout</span>

        </button>
      </div>
    </div>
  );
};

export default Sidebar;