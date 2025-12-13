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
      const response = axios.post(globalVar.backendURL+'/super/login', {
        email,
        password,
      }).then((res)=>{
        // Store in local storage
        console.log(res)
        const data = res.data
        for(var i of Object.keys(data)){
          console.log(data[i])
          localStorage.setItem(i,data[i])
        }
        // Redirect to /dashboard
        window.location.href = '/dashboard';
      }).catch((err)=>{
        console.log(err)
        setError(err.response.data);

      })

    } catch (error) {
        setError('An error occurred while logging in. Please try again.');
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
