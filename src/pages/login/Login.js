import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logoImage from '../../content/ta3afiLogo.png';
import globalVar from '../../globalVar'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(globalVar.backendURL)
      const response = await axios.post(globalVar.backendURL+'/admin/adminLogin', {
        email,
        password,
      });

      // Assuming the server responds with a JWT token
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Redirect to /dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while logging in. Please try again.');
      }
    }
  };

  return (
    <div id="adminLoginPage">
      <form onSubmit={handleSubmit}>
        <div id="logoLogin">
          <img alt="Ta3afi Logo" src={logoImage} />
          <p>Ta3afi Admin Dashboard Login</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Write Your Email"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Write Your Password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginPage;
