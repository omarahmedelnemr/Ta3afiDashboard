import React from 'react';
import './Issus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function IssuesPage() {
    const sourceUser = "doctor"
    const userID = "1"
    function setActive(event){

        if (event.currentTarget.classList.contains("active")){
            event.currentTarget.classList.remove("active")
            event.currentTarget.parentElement.querySelector(".IssuesBody").style.height ="0px"
        }else{
            event.currentTarget.classList.add("active")
            event.currentTarget.parentElement.querySelector(".IssuesBody").style.height = event.currentTarget.parentElement.querySelector(".IssuesBody").scrollHeight+"px"
        }

    }
    
    return (
        <div id='IssuesPage'>
            <h1>Support Issues</h1>
            <div className='issuesContainer'>
                <div className='issue'>
                    <div className='issueHeader' onClick={setActive}>
                        <div className='left row'>
                            <a href={`/profile/${sourceUser}/${userID}`} ><img className='UserImage' src={"http://localhost:8000/profilepic/default.png"} /></a>
                            <p>Proplem With MY Login</p>
                        </div>
                        <div className='right row'>
                            <p className='IssueDate'>12/10 12:20 PM</p>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                        </div>
                    </div>
                    <div className='IssuesBody'>
                        <p>i have a Problem with my Login Page, Icant Login, and i tried Forget Password But it Didn't Send anyThing to My Mail</p>
                    </div>
                </div>
                <div className='issue'>
                    <div className='issueHeader' onClick={setActive}>
                        <div className='left row'>
                            <a href="#" ><img className='UserImage' src={"http://localhost:8000/profilepic/default.png"} /></a>
                            <p>Proplem With MY Login</p>
                        </div>
                        <div className='right row'>
                            <p className='IssueDate'>12/10 12:20 PM</p>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                        </div>
                    </div>
                    <div className='IssuesBody'>
                        <p>i have a Problem with my Login Page, Icant Login, and i tried Forget Password But it Didn't Send anyThing to My Mail</p>
                    </div>
                </div>
                <div className='issue'>
                    <div className='issueHeader' onClick={setActive}>
                        <div className='left row'>
                            <a href="#" ><img className='UserImage' src={"http://localhost:8000/profilepic/default.png"} /></a>
                            <p>Proplem With MY Login</p>
                        </div>
                        <div className='right row'>
                            <p className='IssueDate'>12/10 12:20 PM</p>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                        </div>
                    </div>
                    <div className='IssuesBody'>
                        <p>i have a Problem with my Login Page, Icant Login, and i tried Forget Password But it Didn't Send anyThing to My Mail</p>
                    </div>
                </div>
                <div className='issue'>
                    <div className='issueHeader' onClick={setActive}>
                        <div className='left row'>
                            <a href="#" ><img className='UserImage' src={"http://localhost:8000/profilepic/default.png"} /></a>
                            <p>Proplem With MY Login</p>
                        </div>
                        <div className='right row'>
                            <p className='IssueDate'>12/10 12:20 PM</p>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                        </div>
                    </div>
                    <div className='IssuesBody'>
                        <p>i have a Problem with my Login Page, Icant Login, and i tried Forget Password But it Didn't Send anyThing to My Mail</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IssuesPage;
