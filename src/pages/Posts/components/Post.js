import React from 'react';
import './Post.css';
import CommentBox from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../../../public Func/DateFix';
import globalVar from '../../../public Func/globalVar';

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

    // Reactions
    var reactionCount=0
    for(var r of post.reactions){
        reactionCount+=Number(r.count)
    }

    // Comments
    const testComment = [
        {
           id: 4,
           comment: "great Job",
           date: "2023-11-05T04:39:25.000Z",
           patientID: 2,
           patientName: "Kariem",
           patientProfileImage: "default.png",
           "reactions": []
        },
        {
           id: 5,
           comment: "Amazing Work, Looking Forward To Waork Wihth You In Much More Comlex Props",
           date: "2023-11-05T04:39:25.000Z",
           patientID: 1,
           patientName: "Kariem",
           patientProfileImage: "default.png",
           "reactions": []
        }
     ]

    return (
        <div class="PostBox">
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
                        <span className='Report'>Report</span>
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
                    <span>
                        <FontAwesomeIcon icon="fa-solid fa-eye" /> {post.views}
                    </span>
                
                </div>
                <div className='right'>
                    <span>
                        <FontAwesomeIcon icon="fa-solid fa-heart" /> {reactionCount}
                    </span>
                    <span>
                        <FontAwesomeIcon icon="fa-solid fa-comment" /> {post.commentsNumber}
                    </span>
                </div>
            </div>
            <div className='PostCommentSection'>
                <CommentBox commentData = {testComment[0]}/>
                <CommentBox commentData = {testComment[1]}/>

            </div>
            <div className='PostCommentsButtons'>
                <p>See Comments</p>
            </div>
        </div>
  );
}

export default PostBox;