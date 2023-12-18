import React, { useState } from 'react';
import axios from 'axios';
import './Supervisors.css';
import logoImage from '../../content/ta3afiLogo.png';
import globalVar from '../../public Func/globalVar'
import SupervisorsCard from './components/SupervisorCard';

function SupervisorsPage() {

  return (
    <div id="supervisorsPage">
        <SupervisorsCard img={logoImage} name={"Omar Ahmed Elnemr"} email={"Omar@gmail.com"} status={'online'}/>
        <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'offline'}/>
        <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'pending'}/>
        <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
        <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
        <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
        <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
        <SupervisorsCard img={logoImage} name={"Omar Ahmed"} email={"Omar@gmail.com"} status={'online'}/>
    </div>
  );
}

export default SupervisorsPage;
