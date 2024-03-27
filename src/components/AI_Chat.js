import './styles/AI_Chat.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {useState} from 'react'
import globalVar from '../public Func/globalVar';
function AI_Chat({route,text,icon,active=false}) {

    function open_chat_box(event){
        document.getElementById("AI_Chat_Box").style.height = "430px"
    }
    function close_chat_box(event){
        document.getElementById("AI_Chat_Box").style.height = "0px"
    }

    const [messageList,setMessageList] = useState([])
    const [messageLoading,setMessageLoading] = useState(false)
    function sendMessage(event){
        const inputText =  event.currentTarget.parentElement.querySelector("input").value
        if (inputText === ''){
            return
        }
        event.currentTarget.parentElement.querySelector("input").value = ''
        setMessageList([
            <div className='chatMessage sent'>
                <span>{inputText}</span>
            </div>,...messageList])
        // setMessageLoading(true)
        axios.get(globalVar.backendURL+`/ai/prompt?prompt=${inputText}`).then((res)=>{
            setMessageList([
                <div className='chatMessage recieved'>
                    <span>{res.data}</span>
                </div>,
                <div className='chatMessage sent'>
                    <span>{inputText}</span>
                </div>,
                ...messageList])
            setMessageLoading(false)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    }
    return (
        <div id="AIChat">
            
            <div id='AI_Chat_Box'>
                <div className='ChatBoxheader'>
                    <span>Talk With AI</span>
                    <button className='closeButton' onClick={close_chat_box}><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
                </div>
                <span className='upperMessage'>Messages Will Disappear When You Close the Page</span>
                <div className='chatBox'>
                    {messageLoading?
                    <div className='chatMessage recieved loading'>
                        <span><FontAwesomeIcon icon="fa-solid fa-circle" /> <FontAwesomeIcon icon="fa-solid fa-circle" /> <FontAwesomeIcon icon="fa-solid fa-circle" /></span>
                    </div>
                    :''}
                    {messageList}
                    
                    <div className='chatMessage recieved'>
                        <span>Hello, I am Ta3afi Chat Bot Powered By AI, Feel Free To Ask me Any Question You Want</span>
                    </div>
                </div>
                <div className='chatInputs'>
                    <input type='text' placeholder='Write Your Message'/>
                    <button onClick={sendMessage}><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></button>
                </div>
            </div>
            <div id="AI_Chat_Icon" onClick={open_chat_box}>
                <FontAwesomeIcon icon="fa-solid fa-robot" />
            </div>
        </div>
    );
}

export default AI_Chat;
