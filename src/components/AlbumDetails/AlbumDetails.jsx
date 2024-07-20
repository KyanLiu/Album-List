import './AlbumDetails.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AlbumDetails = (props) => {
    const [ tracks, setTracks] = useState([]);
    const artistNames = props.value.artists.map(val => val.name).join(', ');
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await props.tracklist(props.value.id);   
                //console.log(response);
                setTracks(response);
            } catch (error) {
                console.error('Error Calling Track List Function', error);
            }
        }
        fetchTracks();
    }, []);
    const handleAddProfile = async () => {
        //console.log(props.value);
        try {
            const response = await axios.post('http://localhost:5000/api/profile/add', {username: props.userInfo, albumId: props.value.id});
        } catch (error) {
            console.error('There was an error adding an album to the profile via backend', error);
        }
    }

    return (
        <div className='detailsContainer'>
            <img src={props.value.images[0]?.url} className='detailsImage' alt={props.value.name}></img>
            <div className='leftContainer'>
                <h1 className='albumDetailsTitle'>{props.value.name}</h1>
                <h2 className='artistList'>{artistNames}</h2>
                <h2 className='albumType'>{props.value.type}</h2>
                <ol className='songList'>
                    {tracks.map((value, key) => {
                        return <li>{value.name}</li>
                    })}
                </ol>
            { props.loggedIn ? (
                <button className='addProfileBtn' onClick={handleAddProfile}>Add to Profile</button>
            ) : null }
            </div>
        </div>
    )
}
export default AlbumDetails;