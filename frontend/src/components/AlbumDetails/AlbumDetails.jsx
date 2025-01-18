import './AlbumDetails.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AlbumDetails = ({ user, profileAlert, album, tracklist}) => {
    const [ tracks, setTracks] = useState([]);
    const [ rating, setRating ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const artistNames = album.artists.map(val => val.name).join(', ');
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                setLoading(true);
                const response = await tracklist(album.id); 
                setTracks(response);
                setLoading(false);
            } catch (error) {
                console.error('Error Calling Track List Function', error);
            }
        }
        fetchTracks();
    }, []);
    const handleAddProfile = async () => {
        try {
            if(rating != 0){
                await axios.post('http://localhost:5000/api/profile/add', {username: user.username, albumId: album.id, rating: rating, date: new Date()});
            }
            else{
                await axios.post('http://localhost:5000/api/profile/add', {username: user.username, albumId: album.id, date: new Date()});
            }
            profileAlert(user.username);
        } catch (error) {
            console.error('There was an error adding an album to the profile via backend', error);
        }
    }

    return (
        <div className='detailsContainer detailsBlur'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className='rightContainer'>
                        <img src={album.images[0]?.url} className='detailsImage' alt={album.name}></img>
                        { user !== null && (
                            <div className='detailsOpt'>
                                <button className='addProfileBtn' onClick={handleAddProfile}>Add to Profile</button>
                                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option selected="selected" value={0}>Unrated</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5 (mid)</option>
                                    <option value={6}>6 (getting better)</option>
                                    <option value={7}>7 (decent)</option>
                                    <option value={8}>8 (great)</option>
                                    <option value={9}>9 (amazing)</option>
                                    <option value={10}>10 (perfect)</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className='leftContainer'>
                        <h1 className='albumDetailsTitle'>{album.name}</h1>
                        <div className='artistDetails'>
                            <h2 className='artistList'>{artistNames}</h2>
                            <h2 className='albumType'>{album.type}</h2>
                        </div>
                        <ol className='songList'>
                            {tracks.map((value) => {
                                return <li>{value.name}</li>
                            })}
                        </ol>
                    </div>
                </>
            )}
        </div>
    )
}
export default AlbumDetails;