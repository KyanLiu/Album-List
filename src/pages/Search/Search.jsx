import { useState, useEffect } from 'react';
import './Search.css';
import searchIcon from '../../assets/img/search-icon.png';
import axios from 'axios';
import { Buffer } from 'buffer';

let ACCESS_TOKEN;

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event) => {
        setInputValue(event.target.value);
    }
    const fetchAlbums = async () => {
        console.log('here');
        try {
            //const client_id = await axios.get('https://localhost:5000/api/client-id')
            //const 
            /*const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(inputValue)}&type=album`, {
                headers: {
                    'Authorization': `Bearer ${}`,
                    'Content-Type': 'application/json'
                }
            })*/

            // use access_token to search api
            console.log('here')
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
            ACCESS_TOKEN = token.data.accses_token;
            //console.log(token.data.access_token);
        }
        fetchApiKey();
    }, [])

    return (
        <div className='searchContainer'>
            <h1 className='searchTitle'>Search</h1>
            <div className='searchBoxContainer'>
                <input onChange={handleChange} className='searchInput' placeholder='Enter Album Name'></input>
                <img src={searchIcon} className='searchIcon' onClick={fetchAlbums}></img>
            </div>
            
        </div>
    )
}
export default Search;