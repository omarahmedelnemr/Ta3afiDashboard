import React from 'react';
import './UserProfile.css';
import { useParams } from 'react-router';

function PatientProfile() {
    const {patientID} = useParams()

    return (
        <div id="UserProfile">
            <div id='UserMain'>
                <img className='ProfileImage' src={"http://localhost:8000/profilepic/default.png"} />
                <div className='textMain'>
                    <h2>Omar Ahmed Elnemr</h2>
                    <h3>omar@email.com</h3>
                    <p>Male</p>
                </div>
                
            </div>
            <div id='UserData'>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Main Info</h1>
                    <hr />
                    <div className='DataEntry'>
                        <p className='key'>Height</p>
                        <p>172cm</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Weight</p>
                        <p>90 KG</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Blood</p>
                        <p>null</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>martialStatus</p>
                        <p>null</p>
                    </div>
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Hobbies</h1>
                    <hr />
                    <div className='DataEntry'>
                        <p className='key'>Tennis</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Basket Ball</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Football</p>
                    </div>
                    
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Diagnosis</h1>
                    <hr />
                    <div className='DataEntry'>
                        <p className='key'>Depression</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>OSD</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Mental Disorder</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default PatientProfile;
