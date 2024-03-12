import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatusBoxes from './Components/overviewBox';
import GraphBox from './Components/GraphBox';
import IssusBox from './Components/IssuesBox';
import TimeGraphBox from './Components/TimeGraphBox';

function Dashboard() {
  // Check Authentication
//   axios.post(globalVar.backendURL+'/admin/checkAuth');


    
return (
    <div id='DashboardPage'>
        <div className='row infoBoxes'>
          <StatusBoxes title={"Patients"} icon={<FontAwesomeIcon icon="fa-solid fa-user" />} color={"#d798eb"} value={23}/>
          <StatusBoxes title={"Doctors"} icon={<FontAwesomeIcon icon="fa-solid fa-user-doctor" />} color={"#ee9981"} value={23}/>
          <StatusBoxes title={"Articles"} icon={<FontAwesomeIcon icon="fa-solid fa-newspaper" />} color={"#67a5e7"} value={23}/>
          <StatusBoxes title={"Posts"} icon={<FontAwesomeIcon icon="fa-solid fa-square-poll-horizontal" />} color={"#f4c075"} value={23}/>
        </div>           
        <div className='row SecondLevel'>
          <GraphBox title={"Appoinments"}/>
          <IssusBox title={"Latest Issus"}/>
        </div>
        <TimeGraphBox title={"Appointment Over Time"}/>

    </div>
)
}

export default Dashboard;
