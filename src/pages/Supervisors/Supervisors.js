import React from 'react';
import './Supervisors.css';
import logoImage from '../../content/ta3afiLogo.png';
import SupervisorsCard from './components/SupervisorCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SupervisorsPage() {

    return (
        <div id="supervisorsPage">
            {/* <SupervisorsCard img={logoImage} name={"Omar Ahmed Elnemr"} email={"Omar@gmail.com"} status={'online'}/>
            <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'offline'}/>
            <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'pending'}/>
            <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
            <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
            <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
            <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
            <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/> */}
            <div className='titleHeader'>
                <p>Supervisors</p>
                <div className='AddNew Button'>
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                    <p>Add New</p>
                </div>
            </div>
            <div className='SupervisorsListSection'>
            <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p>email@email.com</p>
                    <span>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span>delete</span>
                    </div>
                </div>
                <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p>email@email.com</p>
                    <span>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span>delete</span>
                    </div>
                </div>
                <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p>email@email.com</p>
                    <span>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span>delete</span>
                    </div>
                </div>
                <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p>email@email.com</p>
                    <span>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span>delete</span>
                    </div>
                </div>
                <div className='supervisorCard'>
                    <p>Omar Ahmed</p>
                    <p>email@email.com</p>
                    <span>Active</span>
                    <div className='superControlButton'>
                        <span>inactive</span>
                        <span>delete</span>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}

export default SupervisorsPage;
