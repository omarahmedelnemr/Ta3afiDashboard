import React from 'react';
import axios from '../../public Func/axiosAuth';
import './Dashboard.css';
import globalVar from '../../globalVar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        <p>Hello</p>
        
    </div>
)
}

export default Dashboard;
