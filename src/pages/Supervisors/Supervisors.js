import React, {useState, useEffect} from 'react';
import './Supervisors.css';
import logoImage from '../../content/ta3afiLogo.png';
import SupervisorsCard from './components/SupervisorCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import globalVar from '../../public Func/globalVar'
import axios from 'axios';

function SupervisorsPage() {
    const [superList,setSuperList] = useState([])

    useEffect(()=>{
        axios.get(globalVar.backendURL+"/admin/supervisors").then((res)=>{
            console.log(res.data)
        }).catch(err=>{
            console.log("Error!!\n",err)
        })
    },[])
    return (
        <div id="supervisorsPage">

            <div className='titleHeader'>
                <h2>Supervisors</h2>
                <div className='row AddNewButton'>
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                     &nbsp; &nbsp;<p>Add New</p>
                </div>
            </div>
            <div className='SupervisorsListSection'>
            <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p className='email'>email@email.com</p>
                    <span className='active'>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span> | </span>
                        <span className='deleteButton'>delete</span>
                    </div>
                </div>
                <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p className='email'>email@email.com</p>
                    <span className='active'>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span> | </span>
                        <span className='deleteButton'>delete</span>
                    </div>
                </div>
                <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p className='email'>email@email.com</p>
                    <span className='active'>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span> | </span>
                        <span className='deleteButton'>delete</span>
                    </div>
                </div>
                <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p className='email'>email@email.com</p>
                    <span className='active'>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span> | </span>
                        <span className='deleteButton'>delete</span>
                    </div>
                </div>
                <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p className='email'>email@email.com</p>
                    <span className='active'>Active</span>
                    <div className='superControlButton'>
                        <span className='inactiveButton'>inactive</span>
                        <span> | </span>
                        <span className='deleteButton'>delete</span>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}

export default SupervisorsPage;
