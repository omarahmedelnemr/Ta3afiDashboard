// import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import './TestChat.css';

import socket from './io';

function TestChatPage() {
    const [connecteState,setConnectState] = useState(false)
    const [chats,setChats] = useState(null)
    const [MessagesList,SetMessagesList] = useState(null)
    // Connect to the Socket.IO server
    // const socket = io('http://192.168.1.105:8000');
    // useEffect(()=>{
    var n;
    if (localStorage.getItem("id") === null){
        n = "no Users Connected"
    }else{
        n = `${localStorage.getItem("role")}${localStorage.getItem('id')} Connected` 
    }
        
    // },[])
    // Listen for connection events
    socket.on('connection', () => {
        console.log('Connected to Socket.IO server');
    });

    // Listen for disconnection events
    socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
    });

    socket.on("chatrooms",(data)=>{
        console.log(data)
        var recievedChats = []
        for(var i of data){
            recievedChats.push(
                <div className='chatroomItem'  onClick={getMessages}> 
                    <span>ChatID:<span className='chatID'>{i.id}</span></span>
                    <span>DoctorName:{i.doctor === undefined? i.patient.name:i.doctor.name}</span>
                </div>)
            
        }
        setChats(recievedChats)
    })

    socket.on("get_messages",(data)=>{
        console.log("Messages: ",data)
        const chatMessagesList = []
        for (var m of data){
            chatMessagesList.push(
                <div className={'message'+ (m.senderSide === document.getElementById("userRoleInput").value?" sent":" recieved")}>
                    <p>{m.text}</p>
                    <span>{m.sendDate}</span>
                </div>
            )
        }
        SetMessagesList(chatMessagesList)
    })

    socket.on("update",(data)=>{
        console.log("Update")
        socket.emit("chatrooms",{
            'userID':document.getElementById("userIDInput").value,
            'role':document.getElementById("userRoleInput").value
        })
        const chatID = localStorage.getItem("chatID")
        const role = document.getElementById("userRoleInput").value
        socket.emit("get_messages",{
            chatroomID:chatID,
            role:role
        })
        
    })
    socket.on("error",(data)=>{
        console.log("Error??\n",data)
    })

    useEffect(()=>{
        console.log("Changed")
        if(connecteState){
            socket.emit("chatrooms",{
                'userID':document.getElementById("userIDInput").value,
                'role':document.getElementById("userRoleInput").value
            })
            
        }
    },[connecteState])

    function UserConnect(){
        const id = document.getElementById("userIDInput").value
        const role = document.getElementById("userRoleInput").value
        localStorage.setItem("id",id)
        localStorage.setItem("role",role)
        console.log("Connecting")
        setConnectState(true)
        socket.emit("go_online",{"userRole":role,"userID":id})
    }

    function getMessages(event){
        console.log()
        const chatID = event.currentTarget.querySelector(".chatID").innerHTML
        const role = document.getElementById("userRoleInput").value
        // Store chatID in localStorage
        localStorage.setItem("chatID", chatID);
        socket.emit("get_messages",{
            chatroomID:chatID,
            role:role
        })
    }
    function sendMessage(){
        const message = document.getElementById("messageInputText").value
        const tempMesageList = []
        if (message !== ""){
            tempMesageList.push(
                <div className={'message sent'}>
                    <p>{message}</p>
                    <span>Sending</span>
                </div>
            )
            SetMessagesList(tempMesageList)
            socket.emit("send_message",{
                chatroomID:localStorage.getItem("chatID"),
                senderRole:document.getElementById("userRoleInput").value,
                text:message
            })
            document.getElementById("messageInputText").value = ''
            
        }

    }
    return (
        <div id="TestChat">
            <div>
                <input type='text'  id='userIDInput'/>
                <input type='text' id='userRoleInput'/>
                <button id={"ConnectButton"} onClick={UserConnect}>Connect</button>
            </div>
            <p>{n}</p>
            <div id='chatroomsList'>
                {/* <div className='chatroomItem' onClick={getMessages}>
                    <span>ChatID:<span className='chatID'>1</span></span>
                    <span className='docName'>DoctorName:1</span>
                </div> */}
                {chats}
            </div>
            <div id='Chatroom'>
                <div id='chatMessages'>
                    
                    {MessagesList}
                </div>
                <div id='ChatControl'>
                    <input type='text' id="messageInputText" placeholder='Write Your Message'/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default TestChatPage;
