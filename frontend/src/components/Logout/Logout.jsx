import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <div>
            <h1>Log Out</h1>
            <button className="logOutBtn" onClick={handleLogout}>Confirm</button>
        </div>
    )
}

export default Logout