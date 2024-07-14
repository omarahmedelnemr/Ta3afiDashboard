import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logoImage from '../../content/ta3afiLogo.png';
import globalVar from '../../public Func/globalVar'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(globalVar.backendURL)
      const response = await axios.post(globalVar.backendURL+'/super/login', {
        email,
        password,
      });

      console.log(response)
      // Assuming the server responds with a JWT token

      // Store in local storage
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('role', response.data.role);

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
