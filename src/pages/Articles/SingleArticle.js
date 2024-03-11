import React, { useRef, useEffect, useState } from 'react';
import './SingleArticle.css';
import ArticleBox from './components/Article';
// import randomizeData from '../../public Func/RandomData';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useSearchParams } from 'react-router-dom';
import formatDate from '../../public Func/DateFix';
import ArticleCommentBox from './components/ArticleComment';


function SingleArticlesPage() {
    const {articleID} = useParams()

    const [article,setArticleList] = useState([])
    const [isAtEnd, setIsAtEnd] = useState(true);
    const [loadingStatus,setLoadingStatus] = useState('shown')
    const divRef = useRef(null);
    const [RateColor,setRateColor] = useState("rateGreen")
    const [UserImage,setUserImage] = useState("")
    const [imageList,setImageList] = useState([])

    // Comments
    var [SeeCommentButton,setButtonText] = useState("See Comments")
    var [CommentButtenState,SetButtonState] = useState("enabled")
    const [commentList,setCommentList] = useState([]) 
    const [loadBlock,IncreaseLoadBlock] = useState(1) 


        

    // Sending To Get The Article
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await axios.get(
            globalVar.backendURL +
                "/blog/article?" +
                `articleID=${articleID}`

            );
            console.log(res.data)
            setArticleList(res.data)
            
            // Validate For anonymous
            setUserImage(<img src={globalVar.backendURL+"/profilepic/"+res.data.doctorProfileImage} alt={res.data.doctorName + " Profile Pic"}/>)
            
            // Uploaded Images
            const images = []
            for(var i of res.data.images){
                images.push(<img src={globalVar.backendURL+"/file/"+i.link}/>)
            }
            setImageList(images)

            // AI Rating Colors
            if (Number(res.data.AI_saftyRate)<50){
                setRateColor("rateYellow")
            }else if (Number(res.data.AI_saftyRate)<75){
                setRateColor("rateYellow")
            }
            setLoadingStatus("disabled")
        
            // Comments
            if (res.data.commentsNumber ==0){
                setButtonText("No Comments on This Post")
                SetButtonState("disabled")
            }

        } catch (err) {
            console.log("Error!!");
            console.log(err);
        }
        };
    
        fetchData();
    
        // Cleanup function to handle potential cancellation or cleanup tasks
        return () => {};
    }, [isAtEnd]);


    // Load a Comment according to the Current LoadBlock
    async function loadComments(event){
        if(event.currentTarget.classList.contains("disabled")){
            return;
        }
        setButtonText("Loading ...")
        try{
            const res  = await axios.get(globalVar.backendURL+"/blog/comment-list?loadBlock="+loadBlock+"&articleID="+articleID)
            
            const TempCommentList = commentList
            for(var comment of res.data){
                TempCommentList.push(<ArticleCommentBox commentData = {comment}/>)
            }
            setCommentList(TempCommentList)
            console.log("Hello")
            console.log(commentList)
            console.log(res.data)
            IncreaseLoadBlock(loadBlock+1)
            setButtonText("See More Comments")
            if(res.data.length <2 || commentList.length >= article.commentsNumber){
                setButtonText("No More Comments")
                SetButtonState("disabled")
            }
        


        }catch(err){
            console.log("Error!!")
            console.log(err)
            setButtonText("See Comments")
        }
    }
    useEffect(()=>{

    })
    return (
        <div className='SingleArticleBox'>
            <div className='ArticleHeader'>
                <div className='left'>
                    <span className='starRate' title={`${article.doctorName} Star Rating`}>
                        <FontAwesomeIcon icon="fa-solid fa-star" /> {article.doctorStarRate}
                    </span>
                    <span title={`The Number of Session ${article.doctorName} Had`}>
                        <FontAwesomeIcon icon="fa-solid fa-calendar-check" /> {article.doctorSessionNumber}
                    </span>
                </div>
                <div className='center'>
                    {UserImage}
                    <div className='AutherInfo'>
                        <p>{article.doctorName}</p>
                        <p>{article.doctorTitle}</p>
                        <p className='date'>{formatDate(article.date)}</p>
                    </div>
                </div>
                <div className='right'>
                    <div className='Tags'>
                        <span className='Community'>{article.category}</span>
                        <span className='Report' onClick={()=>{}}>Report</span>
                    </div>
                </div>
            </div>
            <div className='ArticleBody'>
                {article.covorImage?<div className='CoverImage'>
                    <img src={globalVar.backendURL+"/file/"+article.covorImage}/>
                </div>:''}
                <div className='ArticleText'>
                    <h1>{article.title}</h1>
                    <p>{article.mainText}</p>
                </div>
                <div className='ArticleImages'>
                    {imageList}
                </div>
            </div>
            <div className='Reactions'>
            <div className='left'>
                    <span title='How Many Times the Article Was Displayed on a Screen'>
                        <FontAwesomeIcon icon="fa-solid fa-eye" /> {article.views}
                    </span>
                
                </div>
                <div className='right'>
                    <span title='How Many People Reacted To This Article (Doctors and Patients)'>
                        <FontAwesomeIcon icon="fa-solid fa-heart" /> {article.upVotes+article.DoctorUpVotes}
                    </span>
                    <span title='Total Comment Number'>
                        <FontAwesomeIcon icon="fa-solid fa-comment" /> {article.commentsNumber}
                    </span>
                </div>
                
            </div>
            <div className='Comments'>
                <div className='CommentsBox'>
                    {commentList}
                </div>
                <div className={'CommentsButton '+CommentButtenState} onClick={loadComments}>
                    {SeeCommentButton}
                </div>
            </div>



            
        </div>
    );
}

export default SingleArticlesPage;
