import { useEffect, useState } from 'react';
import './styles/IssuesBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function IssusBox({title,Data}) {
    const issuesList = []
    for(var issue of Data){
        issuesList.push(
            <div className='Issus' id={issue.id}>
                <p><FontAwesomeIcon icon="fa-solid fa-chevron-right" />  {issue.title}</p>
            </div>
        )
        console.log(issue)
    }
    console.log(issuesList)
    return (
        <div className="IssuesBox">
            <h3 className='BoxTitle'>{title}</h3>
            <hr/>
            <div className='IssusSection'>
                {issuesList}
                {/* <div className='Issus'>
                    <p>I had a Bad Feeling About How The App Look Like, How To Solve ...</p>
                </div>
                <div className='Issus'>
                    <p>I had a Bad Feeling About How The App Look Like, How To Solve ...</p>
                </div>
                <div className='Issus'>
                    <p>I had a Bad Feeling About How The App Look Like, How To Solve ...</p>
                </div>
                <div className='Issus'>
                    <p>I had a Bad Feeling About How The App Look Like, How To Solve ...</p>
                </div> */}
            </div>
            <a href={"/issues"}> See All <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></a>

        </div>
    );
}

export default IssusBox;
