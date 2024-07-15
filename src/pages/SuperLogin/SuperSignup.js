import React, { useState } from 'react';
import axios from 'axios';
import './SuperSignup.css';
import logoImage from '../../content/ta3afiLogo.png';
import globalVar from '../../public Func/globalVar'
import { useParams } from 'react-router';

function LoginPage() {
  const {token} = useParams()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (name === '' || password === '' || email === ''){
        setError("Please Complete Your Info")
        return;
      }
      if (password !== password2){
        setError("Incorrect Password")
        return;
      }
      
      axios.post(globalVar.backendURL+'/super/signup', {
        "token":token,
        "name":name,
        "email":email,
        "password":password,
      }).then((res)=>{
        // Redirect to /dashboard
        window.location.href = '/login';
        
        
      }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          console.log(error)
          setError('An error occurred while logging in. Please try again.');
        }
      });

      
  };

  return (
    <div id="SupervisorSignup">
      <form onSubmit={handleSubmit}>
        <div id="logoLogin">
          <img alt="Ta3afi Logo" src={logoImage} />
          <p>Ta3afi Admin Dashboard Signup</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="email">Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write Your Name"
        />
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
        <label htmlFor="password">ReWrite Password</label>
        <input
          name="password2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Re-Write Your Password"
        />
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default LoginPage;
