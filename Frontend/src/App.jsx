
// App.jsx
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/LoginPage/LoginPage';
import Signup from './pages/SignupPage/SignupPage';
import Dashboard from './pages/DashboardPage/DashboardPage';
import { Toaster } from 'react-hot-toast';
import { MyContext } from './Context/ContextStore';

function App() {

  const { colorTheme } = useContext(MyContext)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;