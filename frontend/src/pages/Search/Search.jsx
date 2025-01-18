import { useState, useEffect, useRef, useContext } from 'react';
import './Search.css';
import searchIcon from '../../assets/img/search.svg';
import axios from 'axios';
import AlbumSmallBox from '../../components/AlbumSmallBox/AlbumSmallBox';
import AlbumDetails from '../../components/AlbumDetails/AlbumDetails';
import UserSmallBox from '../../components/UserSmallBox/UserSmallBox';
import UserDisplay from '../../components/UserDisplay/UserDisplay';
import { useAuth } from '../../hooks/useAuth';

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchPressed, setSearchPressed] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [hasClicked, setHasClicked] = useState(false);
    const [displayDetails, setDisplayDetails] = useState([]);
    const albumPopUp = useRef(null);
    const [searchType, setSearchType] = useState('albums')
    const { user } = useAuth()
    const toggleSearchMode = () => {
        setSearchType(prev => (prev == 'albums' ? 'users' : 'albums'))
    }
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
    const handleKeyDown = (event) => {
        if(event.key === 'Enter') fetchSearchData();
    }
    const fetchSearchData = async () => {
        try {
            setLoading(true);
            setAlbums([]), setSearchUsers([]);
            setSearchPressed(true);
            const searchResponse = await axios.get('http://localhost:5000/api/profile/search', {
                params: { type: searchType, query: inputValue }
            })
            if(searchType == 'users'){
                console.log(searchResponse)
                const res = searchResponse.data;
                console.log(res,'updated part')
                // change this to just return the names and id instead of also including the data
                // then do a backend call for the data
                setSearchUsers(res)
            }
            else{
                const data = searchResponse.data;
                console.log(data);
                setAlbums(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching albums', error);
        }
    }
    const fetchTrackList = async (albumID) => {
        try {
            const response = await axios.get('http://localhost:5000/api/profile/albumdetails', {
                params: { albumId: albumID }
            })
            return response.data.tracks.items;
        }
        catch (error) {
            console.error('Error fetching album tracklist', error);
        }
    }
    const addedProfileAlert = (username) => {
        setHasClicked(false);
        alert('Album Added to Profile: ', username);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeMenu);
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        }
    }, [])
    useEffect(() => {
        console.log(searchType)
    }, [searchType])
    return (
        <>
            <div className={`${hasClicked && 'displayBlur'}`}></div>
            <div className='pageContainer'>
                <div className={`searchContainer ${searchPressed && 'searchContainerEnabled'}`}>
                    <h1 className='searchTitle'>Search</h1>
                    <div className='searchBoxContainer'>
                        <input onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} className='searchInput' placeholder='Enter Album Name'></input>
                        <div className='searchFilter' onClick={toggleSearchMode}>
                            <button className={`${searchType == 'albums' ? 'searchSelect' : ''}`} onClick={() => setSearchType('albums')}>Albums</button>
                            <button className={`${searchType == 'users' ? 'searchSelect' : ''}`} onClick={() => setSearchType('users')}>Users</button>
                        </div>
                        <img src={searchIcon} className='searchIcon' onClick={fetchSearchData}></img>
                    </div>
                </div>
                <div className='albumDisplay'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className='albumDisplay'>
                            {albums.map((value, key) => {
                                return <AlbumSmallBox id={key} details={value} clicked={() => handleClick(value)} />
                            })}
                            {searchUsers.map((value) => {
                                return <UserSmallBox username={value.username} id={value.id} clicked={() =>  handleClick(value)}/>
                            })}
                        </div>
                    )}
                </div>
                {hasClicked && (
                    searchType == 'albums' ?
                        <div ref={albumPopUp}>
                            <AlbumDetails user={user} profileAlert={addedProfileAlert} album={displayDetails} tracklist={fetchTrackList}/>
                        </div>
                        :
                        <div className='userDispContainer' ref={albumPopUp}>
                            <UserDisplay user={displayDetails} />
                        </div>
                )}
            </div>
        </>
    )
}
export default Search;