import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Comment.css';
import globalVar from '../../../public Func/globalVar';
import formatDate from '../../../public Func/DateFix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../public Func/axiosAuth';

function PostCommentBox({commentData}) {
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
        try{
            hideReportForm()

            const parent = document.getElementById('comment-' + commentData.id)
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
                axios.delete(globalVar.backendURL+"/super/post-comment",{data:{commentID:commentData.id,patientID:commentData.patientID,reason:reason}}).then((res)=>{
                    setTimeout(hideScroll, 100)
                    setTimeout(dissolve, 2000)
                }).catch((err)=>{
                    console.log("Error!!\n",err)
                })
            }
        }catch(err){
            console.log("Error!!\n",err)
        }

    }
    return (
        <div className='PostCommentBox' id={'comment-' + commentData.id}>
            <span className='hidden commentID'>{commentData.id}</span>
            <div className='CommentHeader'>
                <div  className='UserPic'>
                    <img src={commentData.authorProfileImage || commentData.patientProfileImage || commentData.doctorProfileImage}/>
                    {commentData.isDoctor && commentData.doctorID ? 
                        <a href={"./profile/doctor/"+commentData.doctorID} target="_blank" className='profileLink'></a> :
                        (commentData.patientID ? <a href={"./profile/patient/"+commentData.patientID} target="_blank" className='profileLink'></a> : '')
                    }
                </div>
                
            </div>
            <div className='CommentData'>
                <div className='NameAndDate'>
                    <p className='UserName'>
                        {commentData.authorName || commentData.doctorName || commentData.patientName}
                        {commentData.authorTitle || commentData.doctorTitle ? ` - ${commentData.authorTitle || commentData.doctorTitle}` : ''}
                    </p>
                    <span className='GrayText'>{formatDate(commentData.date)}</span>
                </div>
                <div className='CommentBody'>
                    <p>{commentData.comment}</p>
                </div>
                
            </div>
            <div className='PostCommentKeys'>
                <div className='PostCommentReport' onClick={ShowPopupReportForm}>
                    Report
                </div>
                <div className='PostCommentReactions'>
                    <FontAwesomeIcon icon="fa-solid fa-heart" /> {commentData.reactions}

                </div>
            </div>

            {showReportModal && ReactDOM.createPortal(
                <div className='ReportPopupWindow'>
                    <div className='backgroundBlock' onClick={hideReportForm}></div>
                    <div className='ReportForm'>
                        <h1 className='TitleReport'>Report Comment</h1>
                        <h3 className='ForNextPost'>Comment Content:</h3>
                        <p className='ReportMainPostText'>{commentData.comment}</p>
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

export default PostCommentBox;