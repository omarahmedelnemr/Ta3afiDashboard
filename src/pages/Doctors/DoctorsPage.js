import React, { useRef, useEffect, useState } from 'react';
import './Doctors.css';
// import randomizeData from '../../public Func/RandomData';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';


function DoctorsPage() {
    const [doctorList,setDoctorList] = useState([])
    const [htmlDoctorList,setHTMLDoctorList] = useState([])
    const [loadingStatus,setLoadingStatus] = useState('shown')
    const divRef = useRef(null);

    // Getting Doctor List
    useEffect(()=>{
        axios.get(globalVar.backendURL + "/therapists/patient/doctors-list").then((res)=>{
            console.log(res.data)
            const data = res.data
            setHTMLDoctorList(
                data.map(
                    doctor=>
                    <a className={"doctorCard"} id={doctor['id']} href={'./profile/doctor/'+doctor['id']}>
                        <img src={doctor['profileImage']}/>
                        <h2 className='doctorName'>{doctor['name']}</h2>
                        <h4 className='doctorEmail'>{doctor['title']}</h4>
                        <p>{doctor['description']}</p>
                        <div className='tagsList'>
                            {doctor['tags'].map(tag=><span className='tag'>{tag['tag']}</span>)}
                        </div>
                    </a>)
            )
            setDoctorList(data)
            setLoadingStatus("disabled")
        }).catch((err)=>{
            console.log("Error!!");
            console.log(err);
        })
    },[])

    function Search(event){
        const searchText = document.getElementById("doctorSearchInput").value.toLowerCase()     
        const data = doctorList.filter(doctor=> doctor.name.toLowerCase().includes(searchText))
        setHTMLDoctorList(
            data.map(
                doctor=>
                <a className={"doctorCard"} id={doctor['id']} href={'./profile/doctor/'+doctor['id']}>
                    <img src={doctor['profileImage']}/>
                    <h2 className='doctorName'>{doctor['name']}</h2>
                    <h4 className='doctorEmail'>{doctor['title']}</h4>
                    <p>{doctor['description']}</p>
                    <div className='tagsList'>
                        {doctor['tags'].map(tag=><span className='tag'>{tag['tag']}</span>)}
                    </div>
                </a>)
        )    }

    // Render the 
    return (
        <div id="SuperDoctorsPage"  ref={divRef}>
            <div className={'LoadingScreen '+loadingStatus} >
                <div className='loadingCircle'></div>
            </div>
            <div id='DoctorsSearchFilters'>
                <p>Find Doctors</p>
                <div className='row'> 
                    <input type='text' id='doctorSearchInput' className='SearchKeyWord' placeholder='Search By Name' onChange={Search}/>
                </div> 

            </div>
            <div id='AdminDoctorsFeed'>
            
                {htmlDoctorList}
                
            </div>
        </div>
    );
}

export default DoctorsPage;
