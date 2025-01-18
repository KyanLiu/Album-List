import './Profile.css';
import { useAuth } from '../../hooks/useAuth';
import UserDisplay from '../../components/UserDisplay/UserDisplay';

const Profile = () => {
    const { user } = useAuth();  

    return (
        <div className="profilePage">
            <UserDisplay user={user} />
        </div>
    )
}
export default Profile;