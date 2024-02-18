import React, { useEffect, useState } from 'react';
import './Post.css';
import CommentBox from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../../../public Func/DateFix';
import globalVar from '../../../public Func/globalVar';
import axios from 'axios';

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
    
    // Hiding the Popup Window
    function hideReportForm(event){
        console.log("Hide Clicked")
        event.currentTarget.parentElement.style.display = 'none'
        event.currentTarget.parentElement.querySelector('.ReportForm').style.top = "100%"
    }

    // Showing the Popup Window
    function ShowPopupReportForm(event){
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
            const delResponse = await axios.delete(globalVar.backendURL+"/admin/post",{data:{postID:post.id,reason:reason}})
            console.log(delResponse.data)
            parent.querySelector('.backgroundBlock').click()
            parent.parentElement.style.display = 'none'
            console.log(parent)
        }catch(err){
            console.log("Error!!\n",err)
        }

    }
    return (
        <div className="PostBox" id={post.id}>
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

                    <div className='Tags right'>
                        <span className='Community'>{post.community}</span>
                        <span className='Report' onClick={ShowPopupReportForm}>Report</span>
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
            <div className='PostCommentSection'>
                {commentList}
            </div>
            <div className={'PostCommentsButtons '+CommentButtenState} onClick={loadComments}>
                <p>{SeeCommentButton}</p>
            </div>

            <div className='ReportPopupWindow'>
                <div className='backgroundBlock' onClick={hideReportForm}></div>
                <div className='ReportForm'>
                    <h1 className='TitleReport'>Report</h1>
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
                        <p>Write a Simple Message For the Report Reason</p>
                        <input type='text' placeholder='Write the Message'/>
                    </div>
                    <button className='submutReportButton' onClick={submitReportForm}>Submit Report</button>
                    <p className={'ErrorMessage'+(showErrorMessage?" show":"")}>{showErrorMessage}</p>
                </div>
            </div>
        </div>
  );
}

export default PostBox;