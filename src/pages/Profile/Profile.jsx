import './Profile.css';
import guestPicture from '../../assets/img/guest.png';
import AlbumList from '../../components/AlbumList/AlbumList';

const Profile = () => {
    const username = 'Sikelol';
    const profilePicture = '';
    const about = 'Hello :3';
    const joinDate = 'MM/DD/YY';

    return (
        <div className="profileContainer">
            <div className='profileAbout'>
                <h1 className='profileUsername'>{username}</h1>
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
    )
}
export default Profile;