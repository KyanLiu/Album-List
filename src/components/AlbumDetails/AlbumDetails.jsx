import './AlbumDetails.css';
import { useState, useEffect } from 'react';

const AlbumDetails = (props) => {
    const [ tracks, setTracks] = useState([]);
    const artistNames = props.value.artists.map(val => val.name).join(', ');
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await props.tracklist(props.value.id);   
                console.log(response);
                setTracks(response);
            } catch (error) {
                console.error('Error Calling Track List Function', error);
            }
        }
        fetchTracks();
    }, []);

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
            </div>
        </div>
    )
}
export default AlbumDetails;