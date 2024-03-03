import React, { useState } from 'react';
import './ArticleComment.css';
import globalVar from '../../../public Func/globalVar';
import formatDate from '../../../public Func/DateFix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function ArticleCommentBox({commentData}) {
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
            const delResponse = await axios.delete(globalVar.backendURL+"/admin/article-comment",{data:{commentID:commentData.id,patientID:commentData.patientID,reason:reason}})
            console.log(delResponse.data)
            parent.querySelector('.backgroundBlock').click()
            parent.parentElement.style.display = 'none'
            console.log(parent)
        }catch(err){
            console.log("Error!!\n",err)
        }

    }
  return (
    <div className='ArticleCommentBox'>
        <span className='hidden commentID'>{commentData.id}</span>
        <div className='CommentHeader'>
            <div  className='UserPic'>
                <img src={globalVar.backendURL+"/profilepic/"+commentData.doctorProfileImage}/>
                <a href={"./profile/doctor/"+commentData.patientID} target="_blank" className='profileLink'></a>
            </div>
            
        </div>
        <div className='CommentData'>
            <div className='NameAndDate'>
                <p className='UserName'>{commentData.doctorName}</p>
                <span className='GrayText'>{formatDate(commentData.date)}</span>
            </div>
            <div className='CommentBody'>
                <p>{commentData.comment}</p>
            </div>
            
        </div>
        <div className='ArticleCommentKeys'>
            <div className='ArticleCommentReport' onClick={ShowPopupReportForm}>
                Report
            </div>
            <div className='ArticleCommentReactions'>
                <FontAwesomeIcon icon="fa-solid fa-heart" /> {commentData.likes}

            </div>
        </div>
        
        <div className='ReportPopupWindow'>
            <div className='backgroundBlock' onClick={hideReportForm}></div>
            <div className='ReportForm'>
                <h1 className='TitleReport'>Report</h1>
                <h3 className='ForNextArticle'>The Comment:</h3>
                <p className='ReportMainArticleText'>{commentData.comment}</p>
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

export default ArticleCommentBox;