import React, { useEffect, useState } from 'react';
import './PostPending.css';
// import CommentBox from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../../../public Func/DateFix';
import globalVar from '../../../public Func/globalVar';
import axios from '../../../public Func/axiosAuth';

function PostBox({post}) {
    // Validate For anonymous
    var UserImage,UserName;
    if(post.hideIdentity){
        UserImage= <div className='anonymous'>
                        <FontAwesomeIcon icon="fa-solid fa-user-secret" />
                    </div>
        UserName = "Anonymous Member"
    }else{
        UserImage= <img src={globalVar.backendURL+"/profilepic/"+post.userProfileImage} alt={post.userName + " Profile Pic"}/>
        UserName = post.userName
    }

    // AI Rating Colors
    var RateColor = 'rateGreen'
    console.log(Number(post.AI_saftyRate))
    if (Number(post.AI_saftyRate)<50){
        RateColor = 'rateRed'
    }else if (Number(post.AI_saftyRate)<75){
        RateColor = 'rateYellow'
    }


    // Uploaded Images
    const images = []
    for(var i of post.images){
        images.push(<img src={globalVar.backendURL+"/file/"+i.link}/>)
    }
    

    //// Report Part
    const [somthingElse,setsomthingElse] = useState(false)
    
    // Hiding the Popup Window
    function hideReportForm(event){
        console.log("Hide Clicked")
        event.currentTarget.parentElement.style.display = 'none'
        event.currentTarget.parentElement.querySelector('.ReportForm').style.top = "100%"
    }

    // Showing the Popup Window
    function RejectPost(event){
        const ReportForm = event.currentTarget.parentElement.parentElement.parentElement.parentElement.querySelector(".ReportPopupWindow")
        ReportForm.style.display = 'flex'
        setTimeout(()=> {
            ReportForm.querySelector(".ReportForm").style.top = "0px";
          }, 100);

        // Clear the Window
        setsomthingElse(false)
        setshowErrorMessage(null)
        const selected = ReportForm.querySelector(".selected")
        if (selected !== null){
            selected.classList.remove("selected")
        }
    }

    // Choose a Reason
    function SelectReportReason(event){
        const selected = event.currentTarget.parentElement.querySelector(".selected")
        if (selected !== null){
            selected.classList.remove("selected")
        }
        event.currentTarget.classList.add("selected")
        if(event.currentTarget.innerHTML === 'Somthing Else'){
            setsomthingElse(true)
        }else{
            setsomthingElse(false)
        }
    }

    // Submit the Form
    const [showErrorMessage,setshowErrorMessage] = useState(null)
    async function submitReportForm(event){
        var reason = ''
        const parent = event.currentTarget.parentElement.parentElement
        // Data Reading and Validation
        const selected = event.currentTarget.parentElement.querySelector(".ReportTag.selected")
        if (selected === null){
            setshowErrorMessage('You Have To Choose a Reason')
            return;
        }
        reason = selected.innerHTML
        if (selected.innerHTML === 'Somthing Else'){
            const inputValue = event.currentTarget.parentElement.querySelector("input").value
            if (inputValue ==''){
                setshowErrorMessage('You Have To Write a Reason')
                return
            }
            reason = inputValue
        }
        setshowErrorMessage(null)
        try{
            parent.querySelector('.backgroundBlock').click()

            parent.parentElement.style.height =  parent.parentElement.scrollHeight+"px"
            function hid(){
                parent.parentElement.style.height = '0px'
                parent.parentElement.style.padding = '0px'
                parent.parentElement.style.margin = '0px auto'
            }

            axios.post(globalVar.backendURL+"/super/post-decision",{postID:post.id,approve:false,reason:reason}).then((res)=>{
                setTimeout(hid, 100).then(()=>{
                    parent.parentElement.style.display = 'none'
                }); 
            }).catch((err)=>{
                console.log("Error!!\n",err)
            })

        }catch(err){
            console.log("Error!!\n",err)
        }

    }

    async function AcceptPost(event){
        
        try{
            const parent = event.currentTarget.parentElement.parentElement.parentElement.parentElement
            parent.style.height =  parent.scrollHeight+"px"
            function hid(){
                parent.style.height = '0px'
                parent.style.padding = '0px'
                parent.style.margin = '0px auto'
            }

            axios.post(globalVar.backendURL+"/super/post-decision",{postID:post.id,approve:true}).then((res)=>{
                setTimeout(hid, 100).then(()=>{
                    parent.style.display = 'none'
                }); 
            }).catch((err)=>{
                console.log("Error!!\n",err)
            })
            

        }catch(err){
            console.log("Error!!\n",err)
        }
    }
    return (
        <div className="PendingPostBox" id={post.id}>
            <span className='hidden postID'>{post.id}</span>
            <div className='PostHeader'>
                <div  className='UserPic'>
                    {UserImage}
                    {post.hideIdentity?'':<a href={"./profile/patient/"+post.patientID} className='profileLink' target="_blank"></a>}
                </div>
                <div className='NameAndDateAndData'>
                    <div className='left'>
                        <p>{UserName} {post.edited? <span className='GrayText'>(edited)</span>:''}</p>
                        <span className='GrayText'>{formatDate(post.date)}</span>
                    </div>
                    <div className='center AIRate'>
                        <p>AI Rating: <span className={RateColor}>{post.AI_saftyRate}%</span> - ({post.AI_saftyWord})</p>
                    </div>
                    <div className='Tags right'>
                        <span className='Community'>{post.community}</span>
                        <span className='Accept' onClick={AcceptPost}>Accept</span>
                        <span className='Report' onClick={RejectPost}>Reject</span>
                    </div>
                </div>
            </div>
            <div className='PostBody'>
                <p>{post.mainText}</p>
                <div className='PostImageContainer one'>
                    {images}
                </div>
            </div>
            <div className='PostReactions'>
                <div className='left'>
                
                </div>
                <div className='right'>
                    
                    {/* <span title='How Many Times the Post Was Displayed on a Screen'>
                        <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                    </span> */}
                    <span title='How Many Times the Post Was Displayed on a Screen'>
                        <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                    </span>
                </div>
            </div>

            <div className='ReportPopupWindow'>
                <div className='backgroundBlock' onClick={hideReportForm}></div>
                <div className='ReportForm'>
                    <h1 className='TitleReport'>Reject</h1>
                    <h3 className='ForNextPost'>The Post:</h3>
                    <p className='ReportMainPostText'>{post.mainText}</p>
                    <div className='ReportTagOptions'>
                        <span className='ReportTag' onClick={SelectReportReason}>Spam</span>
                        <span className='ReportTag' onClick={SelectReportReason}>Nudity</span>
                        <span className='ReportTag' onClick={SelectReportReason}>Scam</span>
                        <span className='ReportTag' onClick={SelectReportReason}>Illigal</span>
                        <span className='ReportTag' onClick={SelectReportReason}>Sucide or Self-injury</span>
                        <span className='ReportTag' onClick={SelectReportReason}>Violance</span>
                        <span className='ReportTag' onClick={SelectReportReason}>Hate Speech</span>
                        <span className='ReportTag' onClick={SelectReportReason}>Somthing Else</span>
                    </div>
                    <div className={'ReasonInputForm'+(somthingElse?" show":"")}>
                        <h2>Reason:</h2>
                        <p>Write a Simple Message For the Reject Reason</p>
                        <input type='text' placeholder='Write the Message'/>
                    </div>
                    <button className='submutReportButton' onClick={submitReportForm}>Submit Reject</button>
                    <p className={'ErrorMessage'+(showErrorMessage?" show":"")}>{showErrorMessage}</p>
                </div>
            </div>
        </div>
  );
}

export default PostBox;