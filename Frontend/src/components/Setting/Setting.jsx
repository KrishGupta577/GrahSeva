// Settings.jsx
import React, { useState } from 'react';
import './Setting.css';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    language: 'English',
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    smsAlerts: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30 minutes',
    loginAlerts: true
  });

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <h3>General Settings</h3>
        <div className="settings-card">
          <div className="settings-item">
            <div className="settings-label">
              <span>Language</span>
              <p className="settings-description">Choose your preferred language</p>
            </div>
            <div className="settings-control">
              <select 
                name="language" 
                value={generalSettings.language}
                onChange={handleGeneralChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Kannada">Kannada</option>
              </select>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-label">
              <span>Dark Mode</span>
              <p className="settings-description">Toggle dark mode for the application</p>
            </div>
            <div className="settings-control">
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="darkMode" 
                  checked={generalSettings.darkMode}
                  onChange={handleGeneralChange} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-label">
              <span>Notifications</span>
              <p className="settings-description">Enable or disable all notifications</p>
            </div>
            <div className="settings-control">
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="notifications" 
                  checked={generalSettings.notifications}
                  onChange={handleGeneralChange} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-label">
              <span>Email Alerts</span>
              <p className="settings-description">Receive notifications via email</p>
            </div>
            <div className="settings-control">
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="emailAlerts" 
                  checked={generalSettings.emailAlerts}
                  onChange={handleGeneralChange}
                  disabled={!generalSettings.notifications} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-label">
              <span>SMS Alerts</span>
              <p className="settings-description">Receive notifications via SMS</p>
            </div>
            <div className="settings-control">
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="smsAlerts" 
                  checked={generalSettings.smsAlerts}
                  onChange={handleGeneralChange}
                  disabled={!generalSettings.notifications} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Security Settings</h3>
        <div className="settings-card">
          <div className="settings-item">
            <div className="settings-label">
              <span>Two-Factor Authentication</span>
              <p className="settings-description">Add an extra layer of security</p>
            </div>
            <div className="settings-control">
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="twoFactorAuth" 
                  checked={securitySettings.twoFactorAuth}
                  onChange={handleSecurityChange} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-label">
              <span>Session Timeout</span>
              <p className="settings-description">Set automatic logout timeout</p>
            </div>
            <div className="settings-control">
              <select 
                name="sessionTimeout" 
                value={securitySettings.sessionTimeout}
                onChange={handleSecurityChange}
              >
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="Never">Never</option>
              </select>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-label">
              <span>Login Alerts</span>
              <p className="settings-description">Get notified of new login attempts</p>
            </div>
            <div className="settings-control">
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="loginAlerts" 
                  checked={securitySettings.loginAlerts}
                  onChange={handleSecurityChange} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-button">
              <button className="btn-primary">Change Password</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Account Settings</h3>
        <div className="settings-card">
          <div className="settings-item">
            <div className="settings-button danger-zone">
              <button className="btn-danger">Delete My Account</button>
              <p className="settings-description warning-text">This action cannot be undone</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-actions">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;