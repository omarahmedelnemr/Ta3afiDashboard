import React from 'react';
import './TestChat.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
function Firebaselogin() {

// TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyDt6B8l2jaynh4qPLYJXO4bR8grd5MmSVM",
    authDomain: "ta3afi-d63c0.firebaseapp.com",
    projectId: "ta3afi-d63c0",
    storageBucket: "ta3afi-d63c0.appspot.com",
    messagingSenderId: "746643967201",
    appId: "1:746643967201:web:705f6de44820839441bba0",
    measurementId: "G-LTX5R19F0T"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    function login(event){
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        signInWithPopup(auth,provider).then((data)=>{
            console.log("Data: ",data.user)
            console.log("Data: ",)
            localStorage.setItem("token",data.user.accessToken)
            const myData = {
                token:data.user.accessToken,
                birthDate:"2024-06-23 23:45:34",
                gender:"male",
                title:"doctor",
                description:"Hello this is me"
            }
            axios.post(globalVar.backendURL+"/auth/patient-signup",myData).then((res)=>{
                console.log("Response:")
                console.log(res)
            }).catch(err=>{console.log("Errrrror:",err)})
            // axios.get(globalVar.backendURL+"/checkauth")
        })

    }
    function checkAuth(event){
        axios.get(globalVar.backendURL+"/checkauth")

    }
    return (
        <div id="TestChat">
            <h2>
                hello
            </h2>
            <button onClick={login}>
                Login With Google
            </button>
            <button onClick={checkAuth}>Send Again</button>
        </div>
    );
}

export default Firebaselogin;
