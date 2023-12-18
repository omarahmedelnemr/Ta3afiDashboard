import { useEffect, useState } from 'react';
import './styles/overviewBoxes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../public Func/axiosAuth';
import Global from '../../../public Func/globalVar';
function OverviewBoxes() {
    
    // get Assignments Numbers
    const [userCount,setUserCount] = useState('-')
    const [SupervisrosCount,setSupervisrosCount] = useState('-')
    const [PostsCount,setPostsCount] = useState('-')
    const [PendingCount,setPendingCount] = useState('-')
    const [assignmentsCount,setAssignmentsCount] = useState('-')
    useEffect(()=>{
        axios.get(Global.BackendURL+"/student/totalhomeworkcount?studentID="+localStorage.getItem('id')).then((res)=>{
            console.log("Error Stats res: ",res.status)
            setUserCount(res.data.count)
        }).catch((err)=>{
            console.log("Error Stats: ",err.response)
            // console.log(err)
        })
    })

    const lang = localStorage.getItem('lang')
    const compLang = {
        users:               lang === "en" ? "Users":"المستخدمين",
        supervisors:         lang === "en" ? "Supervisors":"المسئولون",
        posts:               lang === "en" ? "Total Posts":"المنشورات الكلية",
        Pending:             lang === "en" ? "Pending Posts":"المنشورات المعطلة"
        
    }
    return (
        <div className="row overviewBoxes">
            <div className='row'>
                
                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#d798eb'}}>
                        <FontAwesomeIcon icon="fa-solid fa-users" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["users"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{userCount}</h2>
                    </div>
                    
                </div>

                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#ee9981'}}>
                        <FontAwesomeIcon icon="fa-solid fa-user-tie" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["supervisors"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{SupervisrosCount}</h2>
                    </div>
                    
                </div>
            </div>
            <div className='row'>
                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#67a5e7'}}>
                    <FontAwesomeIcon icon="fa-solid fa-comments" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["posts"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{PostsCount}</h2>

                    </div>
                </div>
                <div className={'contentBoxSize1'}>
                    <div className='boxIcon' style={{backgroundColor:'#f4c075'}}>
                        <FontAwesomeIcon icon="fa-solid fa-clock" />
                    </div>
                    <div className='boxTitle'>
                        <p>{compLang["Pending"]}</p>
                    </div>
                    <div className='boxValue'>
                        <h2>{PendingCount}</h2>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OverviewBoxes;
