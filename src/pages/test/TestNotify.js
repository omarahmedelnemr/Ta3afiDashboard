// import React, { useEffect } from 'react';
import React from 'react';
import './TestChat.css';
import socket from './io';

function TestNotifyPage() {
    // Connect to the Socket.IO server

    // Listen for connection events
    socket.on('connection', () => {
        console.log('Connected to Socket.IO server');
    });

    // Listen for disconnection events
    socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
    });
    socket.on("update_notify",(data)=>{
        socket.emit("get_all_notification",{patientID:2})
    })
    socket.on("get_all_notification",(data)=>{
        console.log("Sent, ",data)
    })

    socket.on("error",(data)=>{
        console.log("Error??\n",data)
    })

    function SendNotify(){
        // const target = document.getElementById("targetNotifyInput").value
        // const text = document.getElementById("NotifyBodyInput").value
        // console.log("Connecting")
        // socket.emit("send_notification",{"target":target,"text":text})
        socket.emit("get_all_notification",{patientID:2})
   
    }



    return (
        <div id="TestChat">
            <div>
                <input type='text'  id='targetNotifyInput' placeholder='For Who'/>
                <input type='text' id='NotifyBodyInput' placeholder='What in Notify'/>
                <button id={"ConnectButton"} onClick={SendNotify}>Send</button>
            </div>
        </div>
    );
}

export default TestNotifyPage;
