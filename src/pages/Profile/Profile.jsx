import './Profile.css';
import guestPicture from '../../assets/img/guest.png';
import AlbumList from '../../components/AlbumList/AlbumList';
import {useContext} from 'react';
import {UserLogin} from '../../App';
import {Link} from 'react-router-dom';

const Profile = () => {
    const {loggedIn, setLoggedIn, username, setUsername, accessToken, setAccessToken} = useContext(UserLogin);
    const profileUsername =  username;
    const about = 'Hello :3';
    const joinDate = 'MM/DD/YY';

    return (
        <div className="profileContainer">
            { loggedIn ? (
                <>
                    <div className='profileAbout'>
                        <h1 className='profileUsername'>{profileUsername}</h1>
                        <img src={guestPicture} className='imgProp'></img>
                        <div className='aboutTag'>
                            <p>{about}</p>
                        </div>
                        <div className='aboutTag'>
                            <p>Joined:</p>
                            <p>{joinDate}</p>
                        </div>
                    </div>
                    <div className='listContainer'>
                        <h1 className='listTitle'>Albums to listen to:</h1>
                        <AlbumList accessToken={accessToken} username={username} />
                    </div>
                </>
            ) : (
                <div>
                    <p>Please Login First</p>
                    <Link to="/">Login</Link>
                </div>
            )}
        </div>
    )
}
export default Profile;