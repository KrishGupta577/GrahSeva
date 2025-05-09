
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/LoginPage/LoginPage';
import Signup from './pages/SignupPage/SignupPage';
import Dashboard from './pages/DashboardPage/DashboardPage';
<<<<<<< HEAD
import { Toaster } from 'react-hot-toast';

function App() {
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
=======

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
>>>>>>> 2b007e2ab7115c5bae8ae14165ac37e6961d197f
  );
}

export default App;