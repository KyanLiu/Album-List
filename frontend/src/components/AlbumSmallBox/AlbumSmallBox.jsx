import './AlbumSmallBox.css';
import { useState, useEffect } from 'react';

const AlbumSmallBox = ({ details, rating, clicked }) => {
    const [hasRated, setHasRated] = useState(false);

    const truncateString = (title) => {
        if(title.length <= 12) return title;
        return title.substring(0,10) + '...';
    }
    useEffect(() => {
        if(rating){
            setHasRated(true);
        }
    }, [])
    
    return (
        <>
            {hasRated && (<p>Rated {rating}</p>)}
            <div className='album' onClick={clicked}>
                <img src={details.images[0]?.url} className='albumBox' alt={details.name}></img>
                <h1 className='albumTitle' title={details.name}>{truncateString(details.name)}</h1>
            </div>
        </>
    )
}
export default AlbumSmallBox;