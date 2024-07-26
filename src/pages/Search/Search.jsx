import { useState, useEffect, useRef, useContext } from 'react';
import './Search.css';
import searchIcon from '../../assets/img/search-icon.png';
import axios from 'axios';
import AlbumSmallBox from '../../components/AlbumSmallBox/AlbumSmallBox';
import AlbumDetails from '../../components/AlbumDetails/AlbumDetails';
import {UserLogin} from '../../App';


const Search = () => {
    const {loggedIn, setLoggedIn, username, setUsername, accessToken, setAccessToken} = useContext(UserLogin);

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
                    'Authorization': `Bearer ${accessToken}`
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
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            return response.data.tracks.items;
        }
        catch (error) {
            console.error('Error fetching album tracklist', error);
        }
    }
    const addedProfileAlert = () => {
        setHasClicked(false);
        alert('Album Added to Profile: ', username);
    }

    useEffect(() => {
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
                            <AlbumDetails profileAlert={addedProfileAlert} value={displayDetails} tracklist={fetchTrackList} loggedIn={loggedIn} userInfo={username}/>
                        </div>
                    ) : null}
            </div>
        </>
    )
}
export default Search;