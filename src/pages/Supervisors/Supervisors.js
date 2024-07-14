import React, {useState, useEffect} from 'react';
import './Supervisors.css';
import logoImage from '../../content/ta3afiLogo.png';
import SupervisorsCard from './components/SupervisorCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import globalVar from '../../public Func/globalVar'
import axios from 'axios';

function SupervisorsPage() {
    const [superList,setSuperList] = useState([])
   const [generatedSingupLink,setGeneratedLink] = useState("")
    useEffect(()=>{
        axios.get(globalVar.backendURL+"/super/supervisors-list").then((res)=>{
            console.log(res.data)
            const temp = []
            for(var i=0;i < res.data.length;i++){
                temp.push(
                    <div className='supervisorCard' id={res.data[i].id}>
                        <p>{res.data[i].name}</p>
                        <p className='email'>{res.data[i].email}</p>
                        <span className={res.data[i].active?"active":"NotActive"}>{res.data[i].active?"Active":"Not Active"}</span>
                        {Number(res.data[i].id) !== 1?
                        
                            <div className='superControlButton'>
                                <span className={'DeactiveButton' + (res.data[i].active?"":" hide")} onClick={DeactivateSupervisor}>Deactivate</span>
                                <span className={'ActiveButton' + (res.data[i].active?" hide":"")} onClick={ActivateSupervisor}>Activate</span>
                                <span> | </span>
                                <span className='deleteButton' onClick={DeleteSupervisor}>delete</span>
                                <span className='ConfirmDelete hide'>Confirm Delete? <span className='ConfirmYes' onClick={Yes}>Yes</span> / <span onClick={No} className='ConfirmNo'>No</span></span>

                            </div>
                        :''}

                    </div>

                )
            }
            setSuperList(temp)
        }).catch(err=>{
            console.log("Error!!\n",err)
        })
    },[])

     function generateSignupLink(event){
        const parent =  event.currentTarget.closest('.generateLink')
        const lin = parent.querySelector(".signupLink")
         
        axios.get(globalVar.backendURL+"/super/generatLoginJWT").then((res)=>{
            console.log(res.data)
            setGeneratedLink(globalVar.frontendURL+"/supersignup/"+res.data)
        }).catch(err=>{
            console.log("Error!!\n",err)
        })
        if (lin.style.height === '70px'){
           lin.style.height = '0px'
        }else{
            lin.style.height = '70px'
            parent.querySelector(".stillCopy").classList.remove("hide")
            parent.querySelector(".copied").classList.add("hide")
        }
    }

    function copyLink(event){
        const inputField = event.currentTarget.closest(".signupLink").querySelector(".generatedLink")
        inputField.disabled = false
        inputField.select()
        document.execCommand('copy');
        inputField.setSelectionRange(0, 0);
        inputField.disabled = false
        event.currentTarget.querySelector(".stillCopy").classList.add("hide")
        event.currentTarget.querySelector(".copied").classList.remove("hide")
    }

    async function ActivateSupervisor(event){
        const superID = event.currentTarget.closest('.supervisorCard').id
        const state   =  event.currentTarget.closest('.supervisorCard').querySelector('.NotActive')
        const actve   =  event.currentTarget.closest('.supervisorCard').querySelector('.DeactiveButton')
        const ntactve   =  event.currentTarget.closest('.supervisorCard').querySelector('.ActiveButton')
        axios.post(globalVar.backendURL+"/super/activate",{superID:superID,token : localStorage.getItem('token')})
        .then((res)=>{
            console.log(res)
            actve.classList.remove('hide')
            ntactve.classList.add('hide')
            state.innerHTML = 'Active'
            state.className = 'active'
        })
        .catch((err)=>{
            console.log("Error!!\n",err)
        })

    }
    async function DeactivateSupervisor(event){
        const superID = event.currentTarget.closest('.supervisorCard').id
        const state   =  event.currentTarget.closest('.supervisorCard').querySelector('.active')
        const actve   =  event.currentTarget.closest('.supervisorCard').querySelector('.DeactiveButton')
        const ntactve   =  event.currentTarget.closest('.supervisorCard').querySelector('.ActiveButton')
        axios.post(globalVar.backendURL+"/super/deactivate",{superID:superID,token : localStorage.getItem('token')})
        .then((res)=>{
            console.log(res)
            actve.classList.add('hide')
            ntactve.classList.remove('hide')
            state.innerHTML = 'Not Active'
            state.className = 'NotActive'
        })
        .catch((err)=>{
            console.log("Error!!\n",err)
        })

    }
    function DeleteSupervisor(event){
        const parent = event.currentTarget.closest('.superControlButton')
        parent.querySelector(".deleteButton").classList.add("hide")
        parent.querySelector(".ConfirmDelete").classList.remove("hide")
    }
    async function Yes(event){
        const superID = event.currentTarget.closest('.supervisorCard').id
        axios.delete(globalVar.backendURL+"/super/supervisor",{data:{superID:superID,token : localStorage.getItem('token')}})
        .then((res)=>{
            window.location.reload()
        })
        .catch((err)=>{
            console.log("Error!!\n",err)
        })
    }
    function No(event){
        const parent = event.currentTarget.closest('.superControlButton')
        parent.querySelector(".deleteButton").classList.remove("hide")
        parent.querySelector(".ConfirmDelete").classList.add("hide")
    }
    return (
        <div id="supervisorsPage">

            <div className='titleHeader'>
                <h2>Supervisors</h2>
                <div className='row generateLink'>
                    <div className='AddNewButton' onClick={generateSignupLink}>
                        <FontAwesomeIcon icon="fa-solid fa-plus" />
                        &nbsp; &nbsp;<p>Add New</p>
                    </div>
                    <div className='signupLink'>
                        <span className='comment'>This link is Valid For only 24 Hours</span>
                        <div className='row'>
                            <input type='text' className={"generatedLink"} value={generatedSingupLink} disabled={true}/>
                            <button onClick={copyLink}>
                                <FontAwesomeIcon icon="fa-solid fa-copy" className='stillCopy' />
                                <FontAwesomeIcon icon="fa-solid fa-check"  className='copied hide'/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='SupervisorsListSection'>
                
                {superList}
            </div>
            
        </div>
    );
}

export default SupervisorsPage;
