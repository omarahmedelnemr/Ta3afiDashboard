import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SuperSignup.css';
import logoImage from '../../content/ta3afiLogo.png';
import globalVar from '../../public Func/globalVar';
import { useParams } from 'react-router';
import { Button, Input } from '../../components/ui';

function SuperSignupPage() {
  const {token} = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (name === '' || password === '' || email === ''){
      setError("Please Complete Your Info");
      return;
    }
    if (password !== password2){
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(globalVar.backendURL+'/super/signup', {
        "token":token,
        "name":name,
        "email":email,
        "password":password,
      });
      // Redirect to /login
      window.location.href = '/login';
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while signing up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Background Pattern */}
      <div className="login-background">
        <div className="background-pattern"></div>
        <div className="background-gradient"></div>
      </div>

      {/* Signup Container */}
      <div className="login-container">
        <div className="login-card">
          {/* Logo and Header */}
          <div className="login-header">
            <div className="login-logo">
              <img src={logoImage} alt="Ta3afy Logo" className="logo-img" />
            </div>
            <h1 className="login-title">Create Account</h1>
            <p className="login-subtitle">Ta3afy Supervisor Signup</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="login-error">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              leftIcon={<FontAwesomeIcon icon={faUser} />}
              required
              fullWidth
              size="lg"
              disabled={loading}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
              required
              fullWidth
              size="lg"
              disabled={loading}
            />

            <div className="password-field">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                leftIcon={<FontAwesomeIcon icon={faLock} />}
                rightIcon={
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                }
                required
                fullWidth
                size="lg"
                disabled={loading}
              />
            </div>

            <div className="password-field">
              <Input
                label="Confirm Password"
                type={showPassword2 ? 'text' : 'password'}
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm your password"
                leftIcon={<FontAwesomeIcon icon={faLock} />}
                rightIcon={
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword2(!showPassword2)}
                    tabIndex="-1"
                  >
                    <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} />
                  </button>
                }
                required
                fullWidth
                size="lg"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading || !name || !email || !password || !password2}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p className="login-footer-text">
              This link is valid for 24 hours only
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="login-info">
          <p>Already have an account? <a href="/login">Sign in here</a></p>
        </div>
      </div>
    </div>
  );
}

export default SuperSignupPage;
