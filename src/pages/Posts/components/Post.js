import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Post.css';
import CommentBox from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../../../public Func/DateFix';
import globalVar from '../../../public Func/globalVar';
import axios from '../../../public Func/axiosAuth';

function PostBox({post}) {
    // Validate For anonymous, admin, supervisor, or doctor
    var UserImage,UserName;
    if(post.hideIdentity){
        UserImage= <div className='anonymous'>
                        <FontAwesomeIcon icon="fa-solid fa-user-secret" />
                    </div>
        UserName = "Anonymous Member"
    }else if(post.isAdmin){
        UserImage= <div className='anonymous' style={{background: 'var(--primary-500)'}}>
                        <FontAwesomeIcon icon="fa-solid fa-user-shield" />
                    </div>
        UserName = post.userName || `Admin`
    }else if(post.isSupervisor){
        UserImage= <div className='anonymous' style={{background: 'var(--accent-purple)'}}>
                        <FontAwesomeIcon icon="fa-solid fa-user-tie" />
                    </div>
        UserName = post.userName || post.supervisorName || `Supervisor`
    }else if(post.isDoctor){
        UserImage= <img src={post.userProfileImage} alt={post.userName + " Profile Pic"}/>
        UserName = post.userName + (post.userTitle ? ` - ${post.userTitle}` : '')
    }else{
        UserImage= <img src={post.userProfileImage} alt={post.userName + " Profile Pic"}/>
        UserName = post.userName
    }

    // AI Rating Colors
    var RateColor = 'rateGreen'
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
    

    // Comments
    var [SeeCommentButton,setButtonText] = useState("See Comments")
    var [CommentButtenState,SetButtonState] = useState("enabled")
    const [commentList,setCommentList] = useState([]) 
    const [loadBlock,IncreaseLoadBlock] = useState(1) 

    if (post.commentsNumber ==0){
        SeeCommentButton   = "No Comments on This Post"
        CommentButtenState = "disabled"
    }
    
    // Load a Comment according to the Current LoadBlock
    async function loadComments(event){
        if(event.currentTarget.classList.contains("disabled")){
            return;
        }
        setButtonText("Loading ...")
        try{
            const res  = await axios.get(globalVar.backendURL+"/community/comment-list?loadBlock="+loadBlock+"&postID="+post.id)
            
            const TempCommentList = commentList
            for(var comment of res.data){
                TempCommentList.push(<CommentBox commentData = {comment}/>)
            }
            setCommentList(TempCommentList)
            console.log(res.data)
            IncreaseLoadBlock(loadBlock+1)
            setButtonText("See More Comments")
            if(res.data.length <2 || commentList.length >= post.commentsNumber){
                setButtonText("No More Comments")
                SetButtonState("disabled")
            }
        


        }catch(err){
            console.log("Error!!")
            console.log(err)
            setButtonText("See Comments")
        }
    }

    //// Report Part
    const [somthingElse,setsomthingElse] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    const [selectedReason, setSelectedReason] = useState(null)

    // Hiding the Popup Window
    function hideReportForm(){
        setShowReportModal(false)
        setTimeout(() => {
            setsomthingElse(false)
            setshowErrorMessage(null)
            setSelectedReason(null)
        }, 300)
    }

    // Showing the Popup Window
    function ShowPopupReportForm(){
        setShowReportModal(true)
        setsomthingElse(false)
        setshowErrorMessage(null)
        setSelectedReason(null)
    }

    // Choose a Reason
    function SelectReportReason(event){
        const reason = event.currentTarget.innerHTML
        setSelectedReason(reason)
        if(reason === 'Somthing Else'){
            setsomthingElse(true)
        }else{
            setsomthingElse(false)
        }
    }

    // Submit the Form
    const [showErrorMessage,setshowErrorMessage] = useState(null)
    const [isReporting, setIsReporting] = useState(false)
    async function submitReportForm(event){
        var reason = ''
        // Data Reading and Validation
        if (selectedReason === null){
            setshowErrorMessage('You Have To Choose a Reason')
            return;
        }
        reason = selectedReason
        if (selectedReason === 'Somthing Else'){
            const inputValue = event.currentTarget.parentElement.querySelector("input").value
            if (inputValue ==''){
                setshowErrorMessage('You Have To Write a Reason')
                return
            }
            reason = inputValue
        }
        setshowErrorMessage(null)
        setIsReporting(true)
        try{
            hideReportForm()

            const parent = document.getElementById(post.id)
            if (parent) {
                parent.style.height =  parent.scrollHeight+"px"
                function hideScroll(){
                    parent.style.height = '0px'
                    parent.style.padding = '0px'
                    parent.style.margin = '0px auto'
                }
                function dissolve(){
                    parent.style.display = 'none'
                }
                axios.delete(globalVar.backendURL+"/super/post",{data:{postID:post.id,reason:reason}}).then((res)=>{
                    setTimeout(hideScroll, 100)
                    setTimeout(dissolve, 2000)
                }).catch((err)=>{
                    console.log("Error!!\n",err)
                    setIsReporting(false)
                })
            }
        }catch(err){
            console.log("Error!!\n",err)
            setIsReporting(false)
        }

    }
    return (
        <div className="PostBox" id={post.id}>
            {isReporting && (
                <div className="post-loading-overlay">
                    <div className="post-loading-spinner">
                        <svg className="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" style={{opacity: 1}}>
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                style={{opacity: 0.25}}
                            />
                            <path
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                style={{opacity: 0.75}}
                            />
                        </svg>
                        <p>Reporting post...</p>
                    </div>
                </div>
            )}
            <span className='hidden postID'>{post.id}</span>
            <div className='PostHeader'>
                <div  className='UserPic'>
                    {UserImage}
                    {post.hideIdentity || post.isAdmin || post.isSupervisor ? '' : 
                        (post.isDoctor && post.doctorID ? 
                            <a href={"./profile/doctor/"+post.doctorID} className='profileLink' target="_blank"></a> :
                            (post.patientID ? <a href={"./profile/patient/"+post.patientID} className='profileLink' target="_blank"></a> : '')
                        )
                    }
                </div>
                <div className='NameAndDateAndData'>
                    <div className='left'>
                        <p>{UserName} {post.edited? <span className='GrayText'>(edited)</span>:''}</p>
                        <span className='GrayText'>{formatDate(post.date)}</span>
                        <span className={'aiRate ' + RateColor} title="AI Safety Rating">
                            <FontAwesomeIcon icon="fa-solid fa-robot" /> {post.AI_saftyRate}% - ({post.AI_saftyWord})
                        </span>
                    </div>
                    <div className='Tags right'>
                        <span className='Community'>{post.community}</span>
                        <span className={'Report' + (isReporting ? ' disabled' : '')} onClick={ShowPopupReportForm} style={{pointerEvents: isReporting ? 'none' : 'auto'}}>Report</span>
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
                    <span title='How Many Times the Post Was Displayed on a Screen'>
                        <FontAwesomeIcon icon="fa-solid fa-eye" /> {post.views}
                    </span>
                
                </div>
                <div className='right'>
                    <span title='How Many People Reacted To This Post'>
                        <FontAwesomeIcon icon="fa-solid fa-heart" /> {post.reactions}
                    </span>
                    <span title='Total Comment Number'>
                        <FontAwesomeIcon icon="fa-solid fa-comment" /> {post.commentsNumber}
                    </span>
                </div>
            </div>
            {commentList.length > 0 && (
                <div className='PostCommentSection'>
                    {commentList}
                </div>
            )}
            <div className={'PostCommentsButtons '+CommentButtenState} onClick={loadComments}>
                <p>{SeeCommentButton}</p>
            </div>

            {showReportModal && ReactDOM.createPortal(
                <div className='ReportPopupWindow'>
                    <div className='backgroundBlock' onClick={hideReportForm}></div>
                    <div className='ReportForm'>
                        <h1 className='TitleReport'>Report Post</h1>
                        <h3 className='ForNextPost'>Post Content:</h3>
                        <p className='ReportMainPostText'>{post.mainText}</p>
                        <div className='ReportTagOptions'>
                            <span className={'ReportTag' + (selectedReason === 'Spam' ? ' selected' : '')} onClick={SelectReportReason}>Spam</span>
                            <span className={'ReportTag' + (selectedReason === 'Nudity' ? ' selected' : '')} onClick={SelectReportReason}>Nudity</span>
                            <span className={'ReportTag' + (selectedReason === 'Scam' ? ' selected' : '')} onClick={SelectReportReason}>Scam</span>
                            <span className={'ReportTag' + (selectedReason === 'Illigal' ? ' selected' : '')} onClick={SelectReportReason}>Illigal</span>
                            <span className={'ReportTag' + (selectedReason === 'Sucide or Self-injury' ? ' selected' : '')} onClick={SelectReportReason}>Sucide or Self-injury</span>
                            <span className={'ReportTag' + (selectedReason === 'Violance' ? ' selected' : '')} onClick={SelectReportReason}>Violance</span>
                            <span className={'ReportTag' + (selectedReason === 'Hate Speech' ? ' selected' : '')} onClick={SelectReportReason}>Hate Speech</span>
                            <span className={'ReportTag' + (selectedReason === 'Somthing Else' ? ' selected' : '')} onClick={SelectReportReason}>Somthing Else</span>
                        </div>
                        <div className={'ReasonInputForm'+(somthingElse?" show":"")}>
                            <h2>Reason:</h2>
                            <p>Write a Simple Message For the Report Reason</p>
                            <input type='text' placeholder='Write the Message'/>
                        </div>
                        <button className='submutReportButton' onClick={submitReportForm}>Submit Report</button>
                        <p className={'ErrorMessage'+(showErrorMessage?" show":"")}>{showErrorMessage}</p>
                    </div>
                </div>,
                document.body
            )}
        </div>
  );
}

export default PostBox;