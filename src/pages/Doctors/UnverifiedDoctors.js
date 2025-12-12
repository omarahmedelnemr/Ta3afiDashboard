import React, { useEffect, useState } from 'react';
import './Doctors.css';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { useNavigate } from 'react-router-dom';

function UnverifiedDoctors() {
    const [doctorList, setDoctorList] = useState([]);
    const [htmlDoctorList, setHTMLDoctorList] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState('shown');
    const navigate = useNavigate();

    // Getting Unverified Doctor List
    useEffect(() => {
        axios.get(globalVar.backendURL + "/admin/unverified-doctors").then((res) => {
            console.log(res.data);
            const data = res.data;
            setHTMLDoctorList(
                data.map(doctor =>
                    <div
                        className="doctorCard"
                        key={doctor['id']}
                        onClick={() => navigate(`/doctors/info/${doctor['id']}`)}
                    >
                        <img src={doctor['profileImage']} alt={doctor['name']} />
                        <h2 className='doctorName'>{doctor['name']}</h2>
                        <h4 className='doctorEmail'>{doctor['title']}</h4>
                        <p>{doctor['description']}</p>
                        <div className='doctorStats'>
                            <span className='statItem'>
                                <strong>Gender:</strong> {doctor['gender']}
                            </span>
                            <span className='statItem'>
                                <strong>Language:</strong> {doctor['language']}
                            </span>
                            <span className='statItem'>
                                <strong>Rating:</strong> {doctor['starRate']} ⭐
                            </span>
                            <span className='statItem'>
                                <strong>Sessions:</strong> {doctor['completedSessions']}
                            </span>
                        </div>
                        <div className='verificationBadge unverified'>
                            Pending Verification
                        </div>
                    </div>
                )
            );
            setDoctorList(data);
            setLoadingStatus("disabled");
        }).catch((err) => {
            console.log("Error!!");
            console.log(err);
            setLoadingStatus("disabled");
        });
    }, [navigate]);

    function Search(event) {
        const searchText = document.getElementById("doctorSearchInput").value.toLowerCase();
        const data = doctorList.filter(doctor => doctor.name.toLowerCase().includes(searchText));
        setHTMLDoctorList(
            data.map(doctor =>
                <div
                    className="doctorCard"
                    key={doctor['id']}
                    onClick={() => navigate(`/doctors/info/${doctor['id']}`)}
                >
                    <img src={doctor['profileImage']} alt={doctor['name']} />
                    <h2 className='doctorName'>{doctor['name']}</h2>
                    <h4 className='doctorEmail'>{doctor['title']}</h4>
                    <p>{doctor['description']}</p>
                    <div className='doctorStats'>
                        <span className='statItem'>
                            <strong>Gender:</strong> {doctor['gender']}
                        </span>
                        <span className='statItem'>
                            <strong>Language:</strong> {doctor['language']}
                        </span>
                        <span className='statItem'>
                            <strong>Rating:</strong> {doctor['starRate']} ⭐
                        </span>
                        <span className='statItem'>
                            <strong>Sessions:</strong> {doctor['completedSessions']}
                        </span>
                    </div>
                    <div className='verificationBadge unverified'>
                        Pending Verification
                    </div>
                </div>
            )
        );
    }

    return (
        <div id="SuperDoctorsPage">
            <div className={'LoadingScreen ' + loadingStatus}>
                <div className='loadingCircle'></div>
            </div>
            <div id='DoctorsSearchFilters'>
                <p>Unverified Doctors</p>
                <div className='row'>
                    <input
                        type='text'
                        id='doctorSearchInput'
                        className='SearchKeyWord'
                        placeholder='Search By Name'
                        onChange={Search}
                    />
                </div>
            </div>
            <div id='AdminDoctorsFeed'>
                {htmlDoctorList.length > 0 ? htmlDoctorList :
                    !loadingStatus && <div className='NoDoctorsToDisplay'>No Unverified Doctors</div>
                }
            </div>
        </div>
    );
}

export default UnverifiedDoctors;