import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatusBoxes from './Components/overviewBoxes';

function Dashboard() {
  // Check Authentication
//   axios.post(globalVar.backendURL+'/admin/checkAuth');


    function showHideMinu(){
        if (localStorage.getItem('lang') ==='en'){
            document.getElementsByClassName('sideNav')[0].style.setProperty('left','0px')
            document.getElementsByClassName('sideNav')[0].style.setProperty('right','auto')
        }else{
            document.getElementsByClassName('sideNav')[0].style.setProperty('right','0px')
            document.getElementsByClassName('sideNav')[0].style.setProperty('left','auto')
        }
        document.querySelector('.sideNav').querySelector('.backgroundBlock').style.setProperty('display','block')
    }
return (
    <div id='DashboardPage'>
        <div className="sideMinu row">
            <FontAwesomeIcon icon="fa-solid fa-list" onClick={showHideMinu} />   
        </div>
        <StatusBoxes/>
    </div>
)
}

export default Dashboard;
