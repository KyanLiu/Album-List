import { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumSmallBox from '../AlbumSmallBox/AlbumSmallBox';
import './AlbumList.css';

const AlbumList = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [albumsUnrated, setAlbumsUnrated] = useState([]);
    const [albumsRated, setAlbumsRated] = useState([]);
    const [sortType, setSortType] = useState('')
    const [hasClicked, setHasClicked] = useState(false);
    const fetchAlbumSaved = async () => {
        try{
            const response = await axios.get('http://localhost:5000/api/profile/getAlbums', {
                params: { username: user.username, id: user.id}
            })
            return response.data;
        } catch (error) {
            console.error('There was an error retrieving user data', error);
        }
    }
    const fetchTrackDetails = async (albumids) => {
        try {
            let newAlbumList = [];
            for(let id of albumids.unrated) {
                const response = await axios.get('http://localhost:5000/api/profile/albumdetails', {
                    params: { albumId: id.albumId }
                })
                newAlbumList.push({data: response.data, date: id.date})
            }
            setAlbumsUnrated(newAlbumList);
            newAlbumList = [];
            for(let id of albumids.rated){
                const response = await axios.get('http://localhost:5000/api/profile/albumdetails', {
                    params: { albumId: id.albumId }
                })
                newAlbumList.push({data: response.data, rating: id.rating, date: id.date})
            }
            setAlbumsRated(newAlbumList);
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
        // re-render rated albums
        let newOrder = [...albumsRated];
        switch(sortType){
            case 'Highest Ratings':
                newOrder = newOrder.sort((a, b) => {
                    if(a.rating && b.rating){
                        return b.rating - a.rating;
                    }
                    return 0;
                })
                break;
            case 'Lowest Ratings':
                newOrder = newOrder.sort((a, b) => {
                    if(a.rating && b.rating){
                        return a.rating - b.rating;
                    }
                    return 0;
                })
                break;
            case 'Most Recently Rated':
                newOrder = newOrder.sort((a, b) => {
                    if(a.date && b.date){
                        return new Date(b.date) - new Date(a.date);
                    }
                })
                break;
            case  'Oldest Rated':
                newOrder = newOrder.sort((a, b) => {
                    if(a.date && b.date){
                        return new Date(a.date) - new Date(b.date);
                    }
                })
                break;
            default:
                break;
        }
        setAlbumsRated(newOrder);

    }, [sortType])

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetchAlbumSaved();
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
                    <div>
                        <h1 className='listTitle'>Albums to listen to:</h1>
                        {
                            albumsUnrated.map((value, key) => {
                                return <AlbumSmallBox user={user} id={key} details={value.data} date={value.date} clicked={handleClick} />
                            })
                        }
                    </div>
                    <div>
                        <h1 className='listTitle'>Albums Rated:</h1>
                        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                            <option>Sort</option>
                            <option>Highest Ratings</option>
                            <option>Lowest Ratings</option>
                            <option>Most Recently Rated</option>
                            <option>Oldest Rated</option>
                        </select>
                        {
                            albumsRated.map((value, key) => {
                                return <AlbumSmallBox user={user} id={key} details={value.data} rating={value.rating} date={value.date} clicked={handleClick} />
                            })
                        }
                    </div>
                    <div>
                        {hasClicked && (
                            <div>
                                <AlbumDetails profileAlert={addedProfileAlert} album={displayDetails} tracklist={fetchTrackList}/>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
export default AlbumList;