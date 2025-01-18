import './UserDisplay.css'
import guestPicture from '../../assets/img/profile.svg';
import AlbumList from '../../components/AlbumList/AlbumList';
import {Link} from 'react-router-dom';

const UserDisplay = ({ user }) => {
  return (
    <div className='profileContainer'>
      { user !== null ? (
        <>
          <div className='profileAbout'>
            <h1 className='profileUsername'>{user.username}</h1>
            <img src={guestPicture} className='imgProp'></img>
          </div>
          <div className='listContainer'>
            <AlbumList user={user}/>
          </div>
        </>
      ) : (
        <div>
            <p>Please Login First</p>
            <Link to="/join">Login</Link>
        </div>
      )}
    </div>
  )
}

export default UserDisplay