import './Join.css';
import { useAuth } from '../../hooks/useAuth';
import Login from '../../components/Login/Login';
import Logout from '../../components/Logout/Logout';

const Join = () => {
    const { user } = useAuth();
    return (
        <div className="joinPage">
            <div className='joinContainer'>
                {user === null ? <Login /> : <Logout />}
            </div>
        </div>
    )
}
export default Join;