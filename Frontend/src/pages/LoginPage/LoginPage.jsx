// Login.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './LoginPage.css';
import axios from 'axios';
import { MyContext } from '../../Context/ContextStore';
import toast from 'react-hot-toast';

const Login = () => {
  const { setUserInfo,url } = useContext(MyContext);
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(url + "/users/login", {
        email: data.email,
        password: data.password,
      });
      console.log("Login successful:", response.data);
      setUserInfo(response.data);
      localStorage.setItem("token",response.data.id)
      toast.success("Welcome " + response.data.name)
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Log in to access your GrahSeva account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              placeholder="your@email.com"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", { 
                required: "Password is required",
              })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          
          <div className="form-extras">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="btn-primary login-btn">
            Log In
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button className="social-btn google-btn">
                <i className="fab fa-google"></i> Google
              </button>
              <button className="social-btn facebook-btn">
                <i className="fab fa-facebook"></i> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="login-image">
        <div className="service-highlights">
          <h2>Your Home Services Partner</h2>
          <ul>
            <li>Professional Plumbing</li>
            <li>Expert Electricians</li>
            <li>Reliable House Maids</li>
            <li>Skilled Carpenters</li>
            <li>And much more...</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;