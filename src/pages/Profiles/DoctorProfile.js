import React from 'react';
import './UserProfile.css';
import { useParams } from 'react-router';
import axios from 'axios';
import globalVar from '../../public Func/globalVar';
import { useState, useEffect } from "react";

function DoctorProfile() {
    const {doctorID} = useParams()
        // Main Info
        const [profilePic,setProfilePic] = useState(null)
        const [name,setName] = useState(null)
        const [title,setTitle] = useState(null)
        const [birthDate,setBirthDate] = useState(null)
        const [email,setEmail] = useState(null)
        const [gender,setGender] = useState(null)
        const [description,setDescription] = useState(null)
        const [online,setOnline] = useState(null)
        const [starRate,setStarRate] = useState(null)
        const [completedSessions,setCompletedSessions] = useState(null)
        const [pendingSessions,setPendingSessions] = useState(null)


        // Account Details
        const [education,setEducation] = useState(<p className="commentKey">No Education Records Found</p>)
        const [experince,setExperince] = useState(<p className="commentKey">No Experince Records Found</p>)
        const [certificate,setCertificate] = useState(<p className="commentKey">No Certificate Records Found</p>)
        const [tag,setTag] = useState(<p className="commentKey">No Tags Found</p>)
        const [price,setPrice] = useState(<p className="commentKey">No Prices Found</p>)
        const [availableTime,setAvailableTime] = useState(<p className="commentKey">No Times Found</p>)

        useEffect(()=>{
            // Getting The doctor Info
            axios.get(`${globalVar.backendURL}/profile/doctor-main-info?doctorID=${doctorID}`).then(res=>{
                setProfilePic(res.data.profileImage)
                setName(res.data.name)
                setTitle(res.data.title)
                setBirthDate(res.data.birthDate?res.data.birthDate.split("T")[0]:" - ")
                setEmail(res.data.email)
                setGender(res.data.gender)
                setDescription(res.data.description)
                setOnline(res.data.online)
                setStarRate(res.data.starRate)
                setCompletedSessions(res.data.completedSessions)
                setPendingSessions(res.data.pendingSessions)
            }).catch(err=>{
                console.log("Error!",err)
            })

            // Getting The doctor Education
            axios.get(`${globalVar.backendURL}/profile/doctor-education-record?doctorID=${doctorID}`).then(res=>{
                const data = res.data
                const temp = []
                for (var i=0;i<data.length;i++){
                    temp.push(
                            <div className='card'>
                                <span className={'key title'}>Title: {data[i]['title']}</span>&nbsp;
                                <span className={'key place'}>From: {data[i]['place']}</span>&nbsp;
                                <span className={'key startDate'}>Started: {data[i]['startDate'] ? data[i]['startDate'].split("T")[0]:null}</span>&nbsp;
                                <span className={'key endDate'}>Ended: {data[i]['endDate'] ? data[i]['endDate'].split("T")[0]:null}</span>&nbsp;
                            </div>
                    
                    )
                }
                setEducation(
                    temp.length?
                    <div className={"DataEntry"}>
                        {temp}
                    </div>
                    :
                    <p className="commentKey">No Education Records Found</p>

                )
            }).catch(err=>{
                console.log("Error!",err)
            })
            
            // Getting The doctor experince
            axios.get(`${globalVar.backendURL}/profile/doctor-experince-record?doctorID=${doctorID}`).then(res=>{
                const data = res.data
                const temp = []
                for (var i=0;i<data.length;i++){
                    temp.push(
                            <div className='card'>
                                <span className={'key title'}>Title: {data[i]['title']}</span>&nbsp;
                                <span className={'key place'}>From: {data[i]['place']}</span>&nbsp;
                                <span className={'key startDate'}>Started: {data[i]['startDate'] ? data[i]['startDate'].split("T")[0]:null}</span>&nbsp;
                                <span className={'key endDate'}>Ended: {data[i]['endDate'] ? data[i]['endDate'].split("T")[0]:null}</span>&nbsp;
                            </div>
                    
                    )
                }
                setExperince(
                    temp.length?
                    <div className={"DataEntry"}>
                        {temp}
                    </div>
                    :
                    <p className="commentKey">No Experince Records Found</p>

                )
            }).catch(err=>{
                console.log("Error!",err)
            })

            // Getting The doctor Certificates
            axios.get(`${globalVar.backendURL}/profile/doctor-certificate-record?doctorID=${doctorID}`).then(res=>{
                const data = res.data
                const temp = []
                for (var i=0;i<data.length;i++){
                    temp.push(
                            <div className='card'>
                                <span className={'key title'}>Title: {data[i]['title']}</span>&nbsp;
                                <span className={'key place'}>From: {data[i]['place']}</span>&nbsp;
                                <span className={'key date'}>Date: {data[i]['date'] ? data[i]['date'].split("T")[0]:null}</span>&nbsp;
                            </div>
                    
                    )
                }
                setCertificate(
                    temp.length?
                    <div className={"DataEntry"}>
                        {temp}
                    </div>
                    :
                    <p className="commentKey">No Certificates Records Found</p>
                )
            }).catch(err=>{
                console.log("Error!",err)
            })

            // Getting The doctor Tags
            axios.get(`${globalVar.backendURL}/profile/doctor-tag?doctorID=${doctorID}`).then(res=>{
                const data = res.data
                const temp = []
                for (var i=0;i<data.length;i++){
                    temp.push(
                        <span className={'key'}>{data[i]['tag']}</span>                    
                    )
                }
                setTag(
                    temp.length?
                    <div className={"DataEntry"}>
                        {temp}
                        
                    </div>
                    :
                    <p className="commentKey">No Tags Found</p>
                )
            }).catch(err=>{
                console.log("Error!",err)
            })

            // Getting The doctor Prices
            axios.get(`${globalVar.backendURL}/profile/doctor-price?doctorID=${doctorID}`).then(res=>{
                const data = res.data
                const temp = []
                for (var i=0;i<data.length;i++){
                    temp.push(
                        <div className={"card"}>
                            <p className='key'>Minuts: <span className='commentKey'>{data[i]["minutesRate"]}</span></p>
                            <p className='key'>Price: <span className='commentKey'>{data[i]["moneyRate"]}</span></p>
                        </div>
                    
                    )
                }
                setPrice(
                    temp.length?
                    <div className={"DataEntry"}>
                        {temp}
                    </div>
                    :
                    <p className="commentKey">No Prices Found</p>

                )
            }).catch(err=>{
                console.log("Error!",err)
            })

            // Getting The doctor times
            axios.get(`${globalVar.backendURL}/profile/doctor-available-time?doctorID=${doctorID}`).then(res=>{
                const data = res.data
                const temp = []
                for (var i=0;i<data.length;i++){
                    temp.push(
                            <div className='card'>
                                <span className={'key title'}>Day: {data[i]['dayName']}</span>&nbsp;
                                <div>
                                    {
                                        data[i]['hours'].map(hour=><span className={'key startDate'}>- {hour['hour']} {hour["AMPM"]} - </span>)

                                    }
                                </div>
                            </div>
                    
                    )
                }
                setAvailableTime(
                    temp.length?
                    <div className={"DataEntry"}>
                        {temp}
                    </div>
                    :
                    <p className="commentKey">No Times Found</p>

                )
            }).catch(err=>{
                console.log("Error!",err)
            })
        },[])
    return (
        <div id="UserProfile">
            <div id='UserMain'>
                <img className='ProfileImage' src={profilePic} title='Profile Picture'/>
                <div className='textMain'>
                    <h2>{name}</h2>
                    <h3>{email}</h3>
                    <h3>{title}</h3>
                    <p>{gender}</p>
                    <p className={"mainInfo"}>Birth Date:  <span>{birthDate}</span></p>
                    <p className={"mainInfo"}>Description:  <span>{description}</span></p>
                    <p className={"mainInfo"}>Status: &nbsp;
                        {online?
                            <div className={"doctorStatus online"}></div>
                        :                        
                            <div className={"doctorStatus offline"}></div>
                        } 
                         <span> {online?"online":"offline"}</span>
                    </p>
                    <p className={"mainInfo"}>Star Rate: <span>{starRate}</span></p>
                    <p className={"mainInfo"}>Completed Sessions: <span>{completedSessions}</span></p>
                    <p className={"mainInfo"}>Pending Sessions: <span>{pendingSessions}</span></p>
                </div>
                
            </div>
            <div id='UserData'>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Education</h1>
                    <hr />
                    
                    {education}
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Experince</h1>
                    <hr />
                    {experince}     
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Certificates</h1>
                    <hr />
                    {certificate}
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Tags</h1>
                    <hr />
                    {tag}
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Prices</h1>
                    <hr />
                    {price}
                </div>
                <div className='DataSection'>
                    <h1 className='DataTitle'>Available Time</h1>
                    <hr />
                    {availableTime}
                </div>
            </div>
        </div>
    );
}

export default DoctorProfile;
