import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/profile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [userRequests, setUserRequests] = useState([]);
    const [userResellData, setUserResellData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:4000/userProfile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);

                // ✅ Extract email and use it to fetch requests
                if (response.data.email) {
                    fetchUserRequests(response.data.email);
                    fetchResellRequests(response.data.email);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchUserRequests = async (email) => {
            try {
                const request = await axios.get(`http://localhost:4000/userServiceRequests?email=${email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserRequests(request.data);
            } catch (error) {
                console.error('Error fetching user requests:', error);
            }
        };

        const fetchResellRequests = async (email) => {
            try {
                const request = await axios.get(`http://localhost:4000/userSellRequests?email=${email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserResellData(request.data);
            } catch (error) {
                console.error('Error fetching user Resell requests:', error);
            }
        };

        if (token) {
            fetchUserProfile();
        }
    }, []);

    if (!user) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">User Profile</h1>
            
            <div className="profile-card">
                <div className="profile-info">
                    <div className="info-row">
                        <h3 className="info-label">Name:</h3>
                        <p className="info-value">{user.name}</p>
                    </div>
                    <div className="info-row">
                        <h3 className="info-label">Email:</h3>
                        <p className="info-value">{user.email}</p>
                    </div>
                    <div className="info-row">
                        <h3 className="info-label">Phone:</h3>
                        <p className="info-value">{user.phone}</p>
                    </div>
                    <div className="info-row">
                        <h3 className="info-label">Address:</h3>
                        <p className="info-value">{user.address}</p>
                    </div>
                </div>
                <div className="edit-button-container">
                    <Link to="/EditUserProfile" className="edit-button">
                        Edit Profile
                    </Link>
                </div>
            </div>
            
            <div className="section-divider"></div>
            
            <div className="requests-section">
                <h2 className="section-title">Know the status of your Service Request</h2>
                <div className="requests-card">
                    <ul className="requests-list">
                        {userRequests.length > 0 ? (
                            userRequests.map((request) => (
                                <li key={request._id} className="request-item">
                                    <p><span className="field-label">Name:</span> {request.name}</p>
                                    <p><span className="field-label">Service:</span> {request.serviceType}</p>
                                    <p><span className="field-label">Status:</span> <span className={`status-badge status-${request.status.toLowerCase()}`}>{request.status}</span></p>
                                </li>
                            ))
                        ) : (
                            <li className="no-requests">No service requests found</li>
                        )}
                    </ul>
                </div>
            </div>
            
            <div className="section-divider"></div>
            
            <div className="requests-section">
                <h2 className="section-title">Know the status of your Resell Request</h2>
                <div className="requests-card">
                    <ul className="requests-list">
                        {userResellData.length > 0 ? (
                            userResellData.map((request) => (
                                <li key={request._id} className="request-item">
                                    <p><span className="field-label">Name:</span> {request.name}</p>
                                    <p><span className="field-label">Service:</span> {request.serviceType}</p>
                                    <p><span className="field-label">Status:</span> <span className={`status-badge status-${request.status.toLowerCase()}`}>{request.status}</span></p>
                                </li>
                            ))
                        ) : (
                            <li className="no-requests">No resell requests found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
