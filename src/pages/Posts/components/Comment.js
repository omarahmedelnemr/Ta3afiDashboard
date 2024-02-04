import React from 'react';
import './Comment.css';
import globalVar from '../../../public Func/globalVar';
import formatDate from '../../../public Func/DateFix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostCommentBox({commentData}) {

  return (
    <div className='PostCommentBox'>
        <span className='hidden commentID'>{commentData.id}</span>
        <div className='CommentHeader'>
            <div  className='UserPic'>
                <img src={globalVar.backendURL+"/profilepic/"+commentData.patientProfileImage}/>
                <a href={"./profile/patient/"+commentData.patientID} target="_blank" className='profileLink'></a>
            </div>
            
        </div>
        <div className='CommentData'>
            <div className='NameAndDate'>
                <p className='UserName'>{commentData.patientName}</p>
                <span className='GrayText'>{formatDate(commentData.date)}</span>
            </div>
            <div className='CommentBody'>
                <p>{commentData.comment}</p>
            </div>
            
        </div>
        <div className='PostCommentKeys'>
            <div className='PostCommentReport'>
                Report
            </div>
            <div className='PostCommentReactions'>
                <FontAwesomeIcon icon="fa-solid fa-heart" /> {1}

            </div>
        </div>
        
        {/* <hr/> */}
    </div>
  );
}

export default PostCommentBox;