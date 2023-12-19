import React, { useState } from 'react';
import axios from 'axios';
import '../Supervisors.css';

function SupervisorsCard({img,name,email,status}) {

  return (
        <div className={"SupervisorCard"}>
            <img alt={name+" Profile Image"} src={img}/>
            <div className='SupervisorCardInfo'>
                <h3>{name}</h3>
                <h4>{email}</h4>
            </div>
            <div className='row SupervisorCardButtons'>
                <span className='pendingButton'><span className={'Status '+status}></span>{status}</span>
                <span className='sperator'>|</span>
                <span className='deleteButton'>Delete</span>
            </div>
        </div>
  );
}

export default SupervisorsCard;
