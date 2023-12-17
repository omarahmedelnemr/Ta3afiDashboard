import React from 'react';
import axios from '../../public Func/axiosAuth';
import './Dashboard.css';
import globalVar from '../../globalVar'

function Dashboard() {
  // Check Authentication
  axios.post(globalVar.backendURL+'/admin/checkAuth');

  
return (
    <div>Loading...</div>
)
}

export default Dashboard;
