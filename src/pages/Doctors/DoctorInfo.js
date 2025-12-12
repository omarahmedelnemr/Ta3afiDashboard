import React, { useEffect, useState } from 'react';
import './DoctorInfo.css';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { useParams, useNavigate } from 'react-router-dom';

function DoctorInfo() {
    const { doctorID } = useParams();
    const navigate = useNavigate();
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [loginInfo, setLoginInfo] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState('shown');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    // Getting Doctor Info
    useEffect(() => {
        axios.get(globalVar.backendURL + "/admin/doctor-info", {
            params: { doctorID }
        }).then((res) => {
            console.log(res.data);
            setDoctorInfo(res.data.doctorInfo);
            setLoginInfo(res.data.loginInfo);
            setLoadingStatus("disabled");
        }).catch((err) => {
            console.log("Error!!", err);
            setLoadingStatus("disabled");
        });
    }, [doctorID]);

    const handleVerify = () => {
        if (window.confirm(`Are you sure you want to verify ${doctorInfo.name}?`)) {
            setActionLoading(true);
            axios.post(globalVar.backendURL + "/admin/verify-doctor", { doctorID })
                .then((res) => {
                    console.log(res.data);
                    alert(`Doctor ${doctorInfo.name} has been verified successfully!`);
                    navigate('/doctors/unverified');
                })
                .catch((err) => {
                    console.log("Error!!", err);
                    alert('Failed to verify doctor. Please try again.');
                    setActionLoading(false);
                });
        }
    };

    const handleReject = () => {
        if (!rejectionReason.trim()) {
            alert('Please provide a rejection reason.');
            return;
        }
        setActionLoading(true);
        axios.post(globalVar.backendURL + "/admin/reject-doctor", {
            doctorID,
            rejectionReason
        })
            .then((res) => {
                console.log(res.data);
                alert(`Doctor ${doctorInfo.name} has been rejected.`);
                setShowRejectModal(false);
                navigate(doctorInfo.verified ? '/doctors/verified' : '/doctors/unverified');
            })
            .catch((err) => {
                console.log("Error!!", err);
                alert('Failed to reject doctor. Please try again.');
                setActionLoading(false);
            });
    };

    if (loadingStatus === 'shown' || !doctorInfo) {
        return (
            <div id="DoctorInfoPage">
                <div className='LoadingScreen shown'>
                    <div className='loadingCircle'></div>
                </div>
            </div>
        );
    }

    return (
        <div id="DoctorInfoPage">
            <div className='doctorInfoContainer'>
                <div className='doctorInfoHeader'>
                    <button className='backButton' onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <h1>Doctor Information</h1>
                    <div className={`verificationStatus ${doctorInfo.verified ? 'verified' : 'unverified'}`}>
                        {doctorInfo.verified ? '✓ Verified' : '⏳ Pending Verification'}
                    </div>
                </div>

                {/* Main Info Section */}
                <div className='infoSection'>
                    <h2>Personal Information</h2>
                    <div className='infoGrid'>
                        <div className='infoCard'>
                            <img src={doctorInfo.profileImage} alt={doctorInfo.name} className='doctorProfileImage' />
                        </div>
                        <div className='infoCard'>
                            <div className='infoRow'>
                                <strong>Name:</strong>
                                <span>{doctorInfo.name}</span>
                            </div>
                            <div className='infoRow'>
                                <strong>Title:</strong>
                                <span>{doctorInfo.title}</span>
                            </div>
                            <div className='infoRow'>
                                <strong>Email:</strong>
                                <span>{loginInfo.email}</span>
                            </div>
                            <div className='infoRow'>
                                <strong>Gender:</strong>
                                <span>{doctorInfo.gender}</span>
                            </div>
                            <div className='infoRow'>
                                <strong>Birth Date:</strong>
                                <span>{new Date(doctorInfo.birthDate).toLocaleDateString()}</span>
                            </div>
                            <div className='infoRow'>
                                <strong>Language:</strong>
                                <span>{doctorInfo.language}</span>
                            </div>
                            <div className='infoRow'>
                                <strong>Online Status:</strong>
                                <span className={doctorInfo.online ? 'statusOnline' : 'statusOffline'}>
                                    {doctorInfo.online ? '🟢 Online' : '🔴 Offline'}
                                </span>
                            </div>
                            <div className='infoRow'>
                                <strong>Registration Date:</strong>
                                <span>{new Date(doctorInfo.registrationDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className='infoCard fullWidth'>
                        <div className='infoRow'>
                            <strong>Description:</strong>
                            <span>{doctorInfo.description}</span>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className='infoSection'>
                    <h2>Statistics</h2>
                    <div className='statsGrid'>
                        <div className='statCard'>
                            <div className='statValue'>{doctorInfo.starRate}</div>
                            <div className='statLabel'>⭐ Rating</div>
                        </div>
                        <div className='statCard'>
                            <div className='statValue'>{doctorInfo.completedSessions}</div>
                            <div className='statLabel'>Completed Sessions</div>
                        </div>
                        <div className='statCard'>
                            <div className='statValue'>{doctorInfo.pendingSessions}</div>
                            <div className='statLabel'>Pending Sessions</div>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                {doctorInfo.education && doctorInfo.education.length > 0 && (
                    <div className='infoSection'>
                        <h2>Education</h2>
                        <div className='listGrid'>
                            {doctorInfo.education.map(item => (
                                <div key={item.id} className='listItem'>
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Experience Section */}
                {doctorInfo.experience && doctorInfo.experience.length > 0 && (
                    <div className='infoSection'>
                        <h2>Experience</h2>
                        <div className='listGrid'>
                            {doctorInfo.experience.map(item => (
                                <div key={item.id} className='listItem'>
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications Section */}
                {doctorInfo.certifications && doctorInfo.certifications.length > 0 && (
                    <div className='infoSection'>
                        <h2>Certifications</h2>
                        <div className='listGrid'>
                            {doctorInfo.certifications.map(item => (
                                <div key={item.id} className='listItem'>
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags Section */}
                {doctorInfo.tags && doctorInfo.tags.length > 0 && (
                    <div className='infoSection'>
                        <h2>Specializations</h2>
                        <div className='tagsContainer'>
                            {doctorInfo.tags.map(item => (
                                <span key={item.id} className='tag'>
                                    {item.tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pricing Section */}
                {doctorInfo.pricing && doctorInfo.pricing.length > 0 && (
                    <div className='infoSection'>
                        <h2>Pricing</h2>
                        <div className='listGrid'>
                            {doctorInfo.pricing.map(item => (
                                <div key={item.id} className='pricingItem'>
                                    <strong>${item.moneyRate}</strong> for <strong>{item.minutesRate}</strong> minutes
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Available Days Section */}
                {doctorInfo.availableDays && doctorInfo.availableDays.length > 0 && (
                    <div className='infoSection'>
                        <h2>Available Days</h2>
                        <div className='daysContainer'>
                            {doctorInfo.availableDays.map(item => (
                                <span key={item.id} className='dayBadge'>
                                    {item.dayName}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Account Status */}
                <div className='infoSection'>
                    <h2>Account Status</h2>
                    <div className='infoCard'>
                        <div className='infoRow'>
                            <strong>Active:</strong>
                            <span className={loginInfo.active ? 'statusActive' : 'statusInactive'}>
                                {loginInfo.active ? '✓ Active' : '✗ Inactive'}
                            </span>
                        </div>
                        <div className='infoRow'>
                            <strong>Email Confirmed:</strong>
                            <span className={loginInfo.confirmed ? 'statusActive' : 'statusInactive'}>
                                {loginInfo.confirmed ? '✓ Confirmed' : '✗ Not Confirmed'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='actionButtons'>
                    {!doctorInfo.verified && (
                        <button
                            className='verifyButton'
                            onClick={handleVerify}
                            disabled={actionLoading}
                        >
                            {actionLoading ? 'Processing...' : '✓ Verify Doctor'}
                        </button>
                    )}
                    <button
                        className='rejectButton'
                        onClick={() => setShowRejectModal(true)}
                        disabled={actionLoading}
                    >
                        ✗ Reject Doctor
                    </button>
                </div>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className='modalOverlay' onClick={() => setShowRejectModal(false)}>
                    <div className='modalContent' onClick={(e) => e.stopPropagation()}>
                        <h2>Reject Doctor</h2>
                        <p>Please provide a reason for rejecting {doctorInfo.name}:</p>
                        <textarea
                            className='rejectionTextarea'
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder='Enter rejection reason...'
                            rows={5}
                        />
                        <div className='modalButtons'>
                            <button
                                className='modalCancelButton'
                                onClick={() => setShowRejectModal(false)}
                                disabled={actionLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className='modalRejectButton'
                                onClick={handleReject}
                                disabled={actionLoading}
                            >
                                {actionLoading ? 'Processing...' : 'Confirm Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DoctorInfo;