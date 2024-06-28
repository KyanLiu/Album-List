import { useState, useEffect } from 'react';
import './Search.css';
import searchIcon from '../../assets/img/search-icon.png';
import axios from 'axios';
import { Buffer } from 'buffer';
import AlbumSmallBox from '../../components/AlbumSmallBox/AlbumSmallBox';

let ACCESS_TOKEN;

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [albums, setAlbums] = useState([]);
    const [hasSearched, setHasSearched] = useState(false); // use this to determine where the search bar should be

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
            console.log(searchResponse.data.albums.items);
            const data = searchResponse.data.albums.items;
            setAlbums(data);

        } catch (error) {
            console.error('Error fetching albums', error);
        }
    }

    useEffect(() => {
        const fetchApiKey = async () => {
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
        fetchApiKey();
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
                        return <AlbumSmallBox id={key} details={value} />
                    })}
                </div>
            </div>
        </>
    )
}
export default Search;