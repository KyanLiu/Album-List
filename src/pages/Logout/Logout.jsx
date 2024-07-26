import './Logout.css';
import { useContext } from 'react';
import {UserLogin} from '../../App';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {loggedIn, setLoggedIn, username, setUsername, accessToken, setAccessToken} = useContext(UserLogin);
    const navigate = useNavigate();

    const handleClick = () => {
        setLoggedIn(false);        
        setUsername('');
        localStorage.removeItem('username');
        navigate('/');
    }
    return (
        <div className="profileContainer">
            <button className="logOutBtn" onClick={handleClick}>Log Out</button>
        </div>
    )
}
export default Logout;