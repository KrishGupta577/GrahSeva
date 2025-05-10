import { useState, useContext, useEffect } from 'react';
import { ChevronRight, Moon, Sun, Bell, Lock, User, Globe } from 'lucide-react';
import { MyContext } from '../../Context/ContextStore';
import './Setting.css'; // Make sure to create this CSS file

export default function Settings() {
  const { colorTheme, setColorTheme } = useContext(MyContext);
  const [isDark, setIsDark] = useState(colorTheme === 'dark');
  
  // Apply dark class to body when colorTheme changes
  useEffect(() => {
    if (colorTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    setIsDark(colorTheme === 'dark');
  }, [colorTheme]);
  
  const [settings, setSettings] = useState({
    general: {
      language: 'English',
      notifications: true,
      emailAlerts: true,
      smsAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30 minutes',
      loginAlerts: true
    }
  });

  const toggleDarkMode = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setColorTheme(newTheme);
    // Directly apply class to ensure immediate visual feedback
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  const updateSetting = (category, name, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value
      }
    }));
  };

  const SettingSection = ({ icon, title, expanded = false, children }) => {
    const [isOpen, setIsOpen] = useState(expanded);
    
    return (
      <div className={`setting-section ${isDark ? 'dark' : ''}`}>
        <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
          <div className="section-title">
            {icon}
            <h3>{title}</h3>
          </div>
          <ChevronRight className={`chevron ${isOpen ? 'rotate' : ''}`} size={20} />
        </div>
        
        {isOpen && <div className="section-content">{children}</div>}
      </div>
    );
  };

  const Toggle = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      className={`toggle ${enabled ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
    >
      <span className="toggle-slider"></span>
    </button>
  );

  // Update body class on initial load
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, []);

  return (
    <div className={`settings-container ${isDark ? 'dark' : ''}`}>
      <div className="settings-header">
        <h2>Settings</h2>
        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} color='white' /> : <Moon size={20} />}
        </button>
      </div>
      
      <SettingSection icon={<Globe size={20} />} title="General" expanded={true}>
        <div className="setting-item">
          <div className="setting-info">
            <h4>Language</h4>
            <p>Choose your preferred language</p>
          </div>
          <select 
            value={settings.general.language}
            onChange={(e) => updateSetting('general', 'language', e.target.value)}
            className="setting-select"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Kannada</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Notifications</h4>
            <p>Enable or disable all notifications</p>
          </div>
          <Toggle 
            enabled={settings.general.notifications} 
            onChange={(value) => updateSetting('general', 'notifications', value)}
          />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Email Alerts</h4>
            <p>Receive notifications via email</p>
          </div>
          <Toggle 
            enabled={settings.general.emailAlerts} 
            onChange={(value) => updateSetting('general', 'emailAlerts', value)}
            disabled={!settings.general.notifications}
          />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>SMS Alerts</h4>
            <p>Receive notifications via SMS</p>
          </div>
          <Toggle 
            enabled={settings.general.smsAlerts} 
            onChange={(value) => updateSetting('general', 'smsAlerts', value)}
            disabled={!settings.general.notifications}
          />
        </div>
      </SettingSection>
      
      <SettingSection icon={<Lock size={20} />} title="Security">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security</p>
          </div>
          <Toggle 
            enabled={settings.security.twoFactorAuth} 
            onChange={(value) => updateSetting('security', 'twoFactorAuth', value)}
          />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Session Timeout</h4>
            <p>Set automatic logout timeout</p>
          </div>
          <select 
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
            className="setting-select"
          >
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>2 hours</option>
            <option>Never</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Login Alerts</h4>
            <p>Get notified of new login attempts</p>
          </div>
          <Toggle 
            enabled={settings.security.loginAlerts} 
            onChange={(value) => updateSetting('security', 'loginAlerts', value)}
          />
        </div>

        <button className="btn password-btn">
          Change Password
        </button>
      </SettingSection>
      
      <SettingSection icon={<User size={20} />} title="Account">
        <div className="danger-zone">
          <button className="btn danger-btn">
            Delete My Account
          </button>
          <p className="warning-text">This action cannot be undone</p>
        </div>
      </SettingSection>
      
      <div className="settings-actions">
        <button className="btn cancel-btn">
          Cancel
        </button>
        <button className="btn save-btn">
          Save Changes
        </button>
      </div>
    </div>
  );
}