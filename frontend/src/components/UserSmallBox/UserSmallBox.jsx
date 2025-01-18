import './UserSmallBox.css'
import guestPicture from '../../assets/img/profile.svg';

const truncateString = (title) => {
    if(title.length <= 12) return title;
    return title.substring(0,10) + '...';
}

const UserSmallBox = ({username, id, clicked }) => {
  return (
    <div className='album' onClick={clicked}>
        <img src={guestPicture} className='albumBox' alt={username}></img>
        <h1 className='albumTitle' title={username}>{truncateString(username)}</h1>
    </div>
  )
}

export default UserSmallBox