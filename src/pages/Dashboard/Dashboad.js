import React, {useState, useEffect} from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatusBoxes from './Components/overviewBox';
import GraphBox from './Components/GraphBox';
import IssusBox from './Components/IssuesBox';
import TimeGraphBox from './Components/TimeGraphBox';
import axios from 'axios';
import globalVar from '../../public Func/globalVar';

function Dashboard() {

    // Getting Patients Count
    const [patientsCount,setPatientCount] = useState("-")
    useEffect(()=>{
        axios.get(globalVar.backendURL+"/admin/patients-number").then((res)=>{
            setPatientCount(res.data.number)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    },[])
    
    // Getting Doctors Count
    const [doctorsCount,setDoctorCount] = useState("-")
    useEffect(()=>{
        axios.get(globalVar.backendURL+"/admin/doctors-number").then((res)=>{
            setDoctorCount(res.data.number)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    },[])

    // Getting Articles Count
    const [ArticlesCount,setArticlesCount] = useState("-")
    useEffect(()=>{
        axios.get(globalVar.backendURL+"/admin/articles-number").then((res)=>{
            setArticlesCount(res.data.number)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    },[])

    // Getting Posts Count
    const [PostsCount,setPostsCount] = useState("-")
    useEffect(()=>{
        axios.get(globalVar.backendURL+"/admin/posts-number").then((res)=>{
            setPostsCount(res.data.number)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    },[])

    // Getting Appointments Status Data
    const [appointmentsData,setAppointmentsData] = useState([])
    useEffect(()=>{
        axios.get(globalVar.backendURL+"/admin/appointment-status").then((res)=>{
            setAppointmentsData(res.data)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    },[])

    // Getting Latest Support Issues
    const [supportData,setSupportData] = useState([])
    useEffect(()=>{
        axios.get(globalVar.backendURL+"/admin/supportissues").then((res)=>{
            setSupportData(res.data)
            console.log("Support:",res.data)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    },[])

    // Get The Series Data For Time Graph
    const [postsOverTime,setPostsOverTime] = useState([])
    const [articlessOverTime,setArticlesOverTime] = useState([])
    const [appointmentsOverTime,setAppointmentsOverTime] = useState([])
    const currentYear = new Date().getFullYear();
    const firstDayOfYear = new Date(currentYear, 0, 1); // January is 0
    const lastDayOfYear = new Date(currentYear, 11, 31); // December is 11
    useEffect(()=>{
        axios.get(globalVar.backendURL+`/admin/posts-overtime?fromDate=${firstDayOfYear}&toDate=${lastDayOfYear}`).then((res)=>{
            setPostsOverTime(res.data)
            console.log("OverTime:",res.data)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })

        axios.get(globalVar.backendURL+`/admin/articles-overtime?fromDate=${firstDayOfYear}&toDate=${lastDayOfYear}`).then((res)=>{
            setArticlesOverTime(res.data)
            console.log("OverTime:",res.data)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })

        axios.get(globalVar.backendURL+`/admin/appointments-overtime?fromDate=${firstDayOfYear}&toDate=${lastDayOfYear}`).then((res)=>{
            setAppointmentsOverTime(res.data)
            console.log("OverTime:",res.data)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    },[])

    return (
        <div id='DashboardPage'>
            <div className='row infoBoxes'>
            <StatusBoxes title={"Patients"} icon={<FontAwesomeIcon icon="fa-solid fa-user" />} color={"#d798eb"} value={patientsCount}/>
            <StatusBoxes title={"Doctors"} icon={<FontAwesomeIcon icon="fa-solid fa-user-doctor" />} color={"#ee9981"} value={doctorsCount}/>
            <StatusBoxes title={"Articles"} icon={<FontAwesomeIcon icon="fa-solid fa-newspaper" />} color={"#67a5e7"} value={ArticlesCount}/>
            <StatusBoxes title={"Posts"} icon={<FontAwesomeIcon icon="fa-solid fa-square-poll-horizontal" />} color={"#f4c075"} value={PostsCount}/>
            </div>           
            <div className='row SecondLevel'>
            <GraphBox title={"Appoinments"} Data={appointmentsData}/>
            <IssusBox title={"Latest Issus"} Data={supportData}/>
            </div>
            <TimeGraphBox title={"Appointment Over Time"} postsData={postsOverTime} articlesData={articlessOverTime} appointmentsData={appointmentsOverTime}/>

        </div>
    )
}

export default Dashboard;
