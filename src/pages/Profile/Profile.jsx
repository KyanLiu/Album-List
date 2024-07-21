import './Profile.css';
import guestPicture from '../../assets/img/guest.png';
import AlbumList from '../../components/AlbumList/AlbumList';
import {useContext} from 'react';
import {UserLogin} from '../../App';
import {Link} from 'react-router-dom';

const Profile = () => {
    const {loggedIn, setLoggedIn, username, setUsername} = useContext(UserLogin);
    const profileUsername =  username || 'Sikelol';
    const profilePicture = '';
    const about = 'Hello :3';
    const joinDate = 'MM/DD/YY';

    /*const fetchTrackDetails = async (albumID) => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${albumID}`, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            })
            return response.data;
        }
        catch (error) {
            console.error('Error fetching album tracklist', error);
        }
    }*/
    return (
        <div className="profileContainer">
            { loggedIn ? (
                <div>
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
                        <AlbumList />
                    </div>
                </div>
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