import { useState, useEffect, useRef } from 'react';
import './Search.css';
import searchIcon from '../../assets/img/search-icon.png';
import axios from 'axios';
import { Buffer } from 'buffer';
import AlbumSmallBox from '../../components/AlbumSmallBox/AlbumSmallBox';
import AlbumDetails from '../../components/AlbumDetails/AlbumDetails';

let ACCESS_TOKEN;

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [albums, setAlbums] = useState([]);
    const [hasSearched, setHasSearched] = useState(false); // use this to determine where the search bar should be
    const [hasClicked, setHasClicked] = useState(false);
    const [displayDetails, setDisplayDetails] = useState([]);
    const albumPopUp = useRef(null);

    const closeMenu = (event) => {
        if(!albumPopUp.current?.contains(event.target)){
            setHasClicked(false);
        }
    }
    const handleClick = (value) => {
        setHasClicked(prev => {
            return !prev;
        });
        setDisplayDetails(value);
    }
    const handleChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleKeyDown = (event) => {
        if(event.key === 'Enter') fetchAlbums();
    }
    const fetchAlbums = async () => {
        setHasSearched(true);
        try {
            const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    q: inputValue,
                    type: 'album'
                },
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            })
            const data = searchResponse.data.albums.items;
            setAlbums(data);
        } catch (error) {
            console.error('Error fetching albums', error);
        }
    }
    const fetchTrackList = async (albumID) => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${albumID}`, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            })
            return response.data.tracks.items;
        }
        catch (error) {
            console.error('Error fetching album tracklist', error);
        }
    }

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/client-id');
                const client_id = response.data.clientId, client_secret = response.data.clientSecret;
                const authString = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
                const token = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
                    grant_type: 'client_credentials'
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${authString}`
                    }
                })
                ACCESS_TOKEN = token.data.access_token;
            }
            catch (error) {
                console.error('Error getting Access Key', error);
            }
        }
        fetchApiKey();
        document.addEventListener('mousedown', closeMenu);
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        }
    }, [])

    return (
        <>
            <div className='pageContainer'>
                <div className={ hasSearched ? 'searchContainer searchContainerEnabled' : 'searchContainer'}>
                    <h1 className='searchTitle'>Search</h1>
                    <div className='searchBoxContainer'>
                        <input onChange={handleChange} onKeyDown={handleKeyDown} className='searchInput' placeholder='Enter Album Name'></input>
                        <img src={searchIcon} className='searchIcon' onClick={fetchAlbums}></img>
                    </div>
                </div>
                <div className='albumDisplay'>
                    {albums.map((value, key) => {
                        return <AlbumSmallBox id={key} details={value} clicked={() => handleClick(value)} />
                    })}
                </div>
                    {hasClicked ? (
                        <div ref={albumPopUp}>
                            <AlbumDetails value={displayDetails} tracklist={fetchTrackList} />
                        </div>
                    ) : null}
            </div>
        </>
    )
}
export default Search;