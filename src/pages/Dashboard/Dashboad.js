import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatusBoxes from './Components/overviewBoxes';

function Dashboard() {
  // Check Authentication
//   axios.post(globalVar.backendURL+'/admin/checkAuth');


    
return (
    <div id='DashboardPage'>
        <StatusBoxes/>
    </div>
)
}

export default Dashboard;
