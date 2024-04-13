import React, { useEffect, useState } from 'react';
import './Article.css';
import CommentBox from './ArticleComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../../../public Func/DateFix';
import globalVar from '../../../public Func/globalVar';
import axios from '../../../public Func/axiosAuth';

function ArticleBox({article}) {
    // Validate For anonymous
    var UserImage= <img src={globalVar.backendURL+"/profilepic/"+article.doctorProfileImage} alt={article.doctorName + " Profile Pic"}/>
    var UserName = article.doctorName
    

    // AI Rating Colors
    var RateColor = 'rateGreen'
    console.log(Number(article.AI_saftyRate))
    if (Number(article.AI_saftyRate)<50){
        RateColor = 'rateRed'
    }else if (Number(article.AI_saftyRate)<75){
        RateColor = 'rateYellow'
    }

    // // Comments
    // var [SeeCommentButton,setButtonText] = useState("See Comments")
    // var [CommentButtenState,SetButtonState] = useState("enabled")
    // const [commentList,setCommentList] = useState([]) 
    // if (article.commentsNumber ==0){
    //     // SeeCommentButton   = "No Comments on This Article"
    //     // CommentButtenState = "disabled"
    // }

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
        const ReportForm = event.currentTarget.closest(".ArticleBox").querySelector(".ReportPopupWindow")
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
        const parent = event.currentTarget.closest(".ArticleBox")
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

            parent.style.height =  parent.scrollHeight+"px"
            function hideScroll(){
                parent.style.height = '0px'
                parent.style.padding = '0px'
                parent.style.margin = '0px auto'
            }
            function dissolve(){
                parent.style.display = 'none'

            }
            axios.delete(globalVar.backendURL+"/super/article",{data:{articleID:article.id,reason:reason}}).then((res)=>{
                setTimeout(hideScroll, 100) 
                setTimeout(dissolve, 2000) 
            }).catch((err)=>{
                console.log("Error!!\n",err)
            })
        }catch(err){
            console.log("Error!!\n",err)
        }

    }
    return (
        <div className="ArticleBox" id={article.id}>
            <span className='hidden articleID'>{article.id}</span>
            <div className='ArticleHeader'>
                <div  className='UserPic'>
                    {UserImage}
                    <a href={"./profile/doctor/"+article.doctorID} className='profileLink' target="_blank"></a>
                </div>
                <div className='NameAndDateAndData'>
                    <div className='left'>
                        <p>{UserName} {article.edited? <span className='GrayText'>(edited)</span>:''}</p>
                        <span className='GrayText'>{formatDate(article.date)}</span>
                    </div>
                    <div className='center AIRate'>
                        <p>AI Rating: <span className={RateColor}>{article.AI_saftyRate}%</span> - ({article.AI_saftyWord})</p>
                    </div>
                    <div className='Tags right'>
                        <span className='Community'>{article.category}</span>
                        <span className='Report' onClick={ShowPopupReportForm}>Report</span>
                    </div>
                </div>
            </div>
            <div className='ArticleBody'>
                <div  className={'CoverImage '+(article.covorImage?'':'notShown')}>
                    <img src={globalVar.backendURL+"/file/"+article.covorImage} alt='Cover Image'/>
                </div>
                <h2>{article.title}</h2>
                <p>{article.mainText} ... </p>
                
            </div>
            <div className='ArticleReactions'>
                <div className='left'>
                    <span title='How Many Times the Article Was Displayed on a Screen'>
                        <FontAwesomeIcon icon="fa-solid fa-eye" /> {article.seenCount}
                    </span>
                
                </div>
                <div className='right'>
                    <span title='How Many People Reacted To This Article'>
                        <FontAwesomeIcon icon="fa-solid fa-heart" /> {article.upVotes}
                    </span>
                    <span title='Total Comment Number'>
                        <FontAwesomeIcon icon="fa-solid fa-comment" /> {article.commentsNumber}
                    </span>
                </div>
            </div>
            <div className='ArticleReadmoreButtons'>
                <a href={'/articles/'+article.id}><p>Read More</p></a>
            </div>

            <div className='ReportPopupWindow'>
                <div className='backgroundBlock' onClick={hideReportForm}></div>
                <div className='ReportForm'>
                    <h1 className='TitleReport'>Report</h1>
                    <h3 className='ForNextArticle'>The Article:</h3>
                    <p className='ReportMainArticleText'>{article.title}</p>
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

export default ArticleBox;