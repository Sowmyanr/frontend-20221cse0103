import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthPages.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from URL query params (if any)
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    try {
      await login(email, password);
      navigate(`/${redirectPath}`);
    } catch (err) {
      setFormError(err.message || 'Login failed. Please try again.');
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
          
          {(formError || error) && (
            <div className="auth-error">
              {formError || error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
              </div>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>Or</span>
          </div>
          
          <p className="auth-alternate">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        
        <div className="auth-image">
          <img 
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Stylish living room" 
          />
          <div className="auth-image-overlay">
            <div className="auth-image-content">
              <h2>Elevate Your Home</h2>
              <p>Join us to discover beautiful furniture pieces for every corner of your home.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;