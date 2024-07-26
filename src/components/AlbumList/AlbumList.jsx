import { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumSmallBox from '../AlbumSmallBox/AlbumSmallBox';
import './AlbumList.css';

const AlbumList = (props) => {
    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState([]);
    const fetchAlbumId = async () => {
        try{
            const response = await axios.get('http://localhost:5000/api/profile/getAlbums', {
                params: { username: props.username}
            })
            //const newAlbumList = [];
            console.log(response.data);
            return response.data;
            /*response.data.forEach(async (value) => {
                const item = await fetchTrackDetails(value);
                newAlbumList.push(item);
            })*/
            console.log(newAlbumList, 'vals');
            //setAlbums(newAlbumList);
            //setLoading(false);
        } catch (error) {
            console.error('There was an error retrieving user data', error);
        }
    }
    const fetchTrackDetails = async (albumids) => {
        try {
            const newAlbumList = [];
            for (let value of albumids) {
                const response = await axios.get(`https://api.spotify.com/v1/albums/${value}`, {
                    headers: {
                        'Authorization': `Bearer ${props.accessToken}`
                    }
                })
                newAlbumList.push(response.data);
            }
            //return response.data;
            setAlbums(newAlbumList);
            setLoading(false);
        }
        catch (error) {
            console.error('Error fetching album tracklist', error);
        }
    }
    const handleClick = () => {
        console.log('Clicked');
    }
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetchAlbumId();
            if(response){
                await fetchTrackDetails(response);
            }
        }
        setLoading(true);
        fetchData();    
    }, [])

    return (
        <>
            { loading ? (
                <p>Loading...</p>
            ) : (
                <div className='albumDisplay'>
                    {albums.map((value, key) => {
                        return <AlbumSmallBox id={key} details={value} clicked={handleClick} />
                    })}
                </div>
            )}
        </>
    )
}
export default AlbumList;