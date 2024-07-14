import React from 'react';
import './UserProfile.css';
import { useParams } from 'react-router';
import axios from 'axios';
import globalVar from '../../public Func/globalVar';
import { useState, useEffect } from "react";

function PatientProfile() {
    const {patientID} = useParams()

    // Account Info
    const [profilePic,setProfilePic] = useState(null)
    const [name,setName] = useState(null)
    const [email,setEmail] = useState(null)
    const [gender,setGender] = useState(null)

    // Main Info
    const [Height,setHeight] = useState(" - ")
    const [Weight,setWeight] = useState(" - ")
    const [Blood,setBlood] = useState(" - ")
    const [martialStatus,setmartialStatus] = useState(" - ")
    const [alcohol,setAlcohol] = useState(" - ")
    const [drugs,setDrugs] = useState(" - ")
    const [religious,setReligious] = useState(" - ")
    const [religion,setReligion] = useState(" - ")


    // Other Sections
    const [hobbies,setHobbies] = useState([])
    const [Diagnoses,setDiagnoses] = useState([])
    const [Medicine,setMedicine] = useState([])
    const [prescriptionFile,setPrescriptionFile] = useState([])


    useEffect(()=>{
        // Getting The Patient Info
        axios.get(`${globalVar.backendURL}/profile/patient-main-info?patientID=${patientID}`).then(res=>{
            setProfilePic(res.data.profileImage)
            setName(res.data.name)
            setEmail(res.data.email)
            setGender(res.data.gender)
        }).catch(err=>{
            console.log("Error!",err)
        })

        // Getting The Patient Personal Account Info
        axios.get(`${globalVar.backendURL}/profile/patient-account-info?patientID=${patientID}`).then(res=>{
            const data = res.data
            setHeight(data['height']? data['height']:<span className='commentKey'>Not Set</span>)
            setWeight(data['weight']? data['weight']:<span className='commentKey'>Not Set</span>)
            setBlood(data['blood']? data['blood']:<span className='commentKey'>Not Set</span>)
            setmartialStatus(data['martialStatus']? data['martialStatus']:<span className='commentKey'>Not Set</span>)
            setAlcohol(data['alcohol']? data['alcohol']:<span className='commentKey'>Not Set</span>)
            setDrugs(data['drugs']? data['drugs']:<span className='commentKey'>Not Set</span>)
            setReligious(data['religious']? data['religious']:<span className='commentKey'>Not Set</span>)
            setReligion(data['religion']? data['religion']:<span className='commentKey'>Not Set</span>)

        }).catch(err=>{
            console.log("Error!",err)
        })

        // Getting The Patient Hobbies
        axios.get(`${globalVar.backendURL}/profile/patient-hobby?patientID=${patientID}`).then(res=>{
            console.log(res.data)
            const data = res.data
            const temp = []
            for(var i =0;i< data.length;i++){
                temp.push(
                    <div className='DataEntry' key={"hobby"+data[i]['id']}>
                        <p className='key'>{data[i]["hobby"]}</p>
                    </div>
                )
            }
            setHobbies(temp.length?temp:<p className='commentKey'>No Hobbies Found</p>)
        }).catch(err=>{
            console.log("Error!",err)
        })

        // Getting The Patient Diagnoses
        axios.get(`${globalVar.backendURL}/profile/patient-diagnose?patientID=${patientID}`).then(res=>{
            console.log(res.data)
            const data = res.data
            const temp = []
            for(var i =0;i< data.length;i++){
                temp.push(
                    <div className='DataEntry' key={"diagnose"+data[i]['id']}>
                        <p className='key'>{data[i]['name']}</p>
                        <span className='drName'>By Dr./ {data[i]['doctorName']}</span>
                    </div>
                )
            }
            setDiagnoses(temp.length?temp:<p className='commentKey'>No Diagnoses Found</p>)
        }).catch(err=>{
            console.log("Error!",err)
        })
        
        // Getting The Patient Medicine
        axios.get(`${globalVar.backendURL}/profile/patient-medicine?patientID=${patientID}`).then(res=>{
            console.log(res.data)
            const data = res.data
            const temp = []
            for(var i =0;i< data.length;i++){
                temp.push(
                    <div className='DataEntry' key={"medicine"+data[i]['id']}>
                        <p className='key'>{data[i]['name']}</p>
                        <span className='drName'>By Dr./ {data[i]['doctorName']}</span>
                    </div>
                )
            }
            setMedicine(temp.length?temp:<p className='commentKey'>No Medicine Found</p>)
        }).catch(err=>{
            console.log("Error!",err)
        })

        // Getting The Patient Prescription Files
        axios.get(`${globalVar.backendURL}/profile/patient-medicine?patientID=${patientID}`).then(res=>{
            console.log(res.data)
            const data = res.data
            const temp = []
            for(var i =0;i< data.length;i++){
                temp.push(
                    <div className='DataEntry' key={"file"+data[i]['id']}>
                        <img className='key' src={`${globalVar.backendURL}/file/${data[i]['file']}`} />
                        <span className='drName'>By Dr./ {data[i]['doctorName']}</span>
                    </div>
                )
            }
            setPrescriptionFile(temp.length?temp:<p className='commentKey'>No Files Found</p>)
        }).catch(err=>{
            console.log("Error!",err)
        })
    },[])

    return (
        <div id="UserProfile">
            <div id='UserMain'>
                <img className='ProfileImage' src={profilePic} title='Profile Image'/>
                <div className='textMain'>
                    <h2>{name}</h2>
                    <h3>{email}</h3>
                    <p>{gender}</p>
                </div>
                
            </div>
            <div id='UserData'>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Main Info</h1>
                    <hr />
                    <div className='DataEntry'>
                        <p className='key'>Height</p>
                        <p>{Height} cm</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Weight</p>
                        <p>{Weight} KG</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Blood</p>
                        <p>{Blood}</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>martialStatus</p>
                        <p>{martialStatus}</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Alcohol</p>
                        <p>{alcohol}</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Drugs</p>
                        <p>{drugs}</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Religious</p>
                        <p>{religious}</p>
                    </div>
                    <div className='DataEntry'>
                        <p className='key'>Religion</p>
                        <p>{religion}</p>
                    </div>
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Hobbies</h1>
                    <hr />
                    {hobbies}
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Diagnosis</h1>
                    <hr />
                    {Diagnoses}
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Medicine</h1>
                    <hr />
                    {Medicine}
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Prescription Files</h1>
                    <hr />
                    {prescriptionFile}
                </div>
            </div>
        </div>
    );
}

export default PatientProfile;
