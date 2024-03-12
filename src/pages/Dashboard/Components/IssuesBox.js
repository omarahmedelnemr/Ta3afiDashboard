import { useEffect, useState } from 'react';
import './styles/IssuesBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function IssusBox({title}) {
    
    return (
        <div className="IssuesBox">
            <h3 className='BoxTitle'>{title}</h3>
            <hr/>
            <div className='IssusSection'>
                <div className='Issus'>
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
                </div>
            </div>
            <a> See All <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></a>

        </div>
    );
}

export default IssusBox;
