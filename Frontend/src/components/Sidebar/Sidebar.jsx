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

  const handleLogoutButtom = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

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
          <li className="logout-btn" onClick={() => handleLogoutButtom()} >
            <span className="menu-icon">🚪</span>
            <span className="menu-text">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;