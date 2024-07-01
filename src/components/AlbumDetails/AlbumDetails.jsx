import './AlbumDetails.css';

const AlbumDetails = (props) => {
    console.log(props.tracklist);
    return (
        <div className='detailsContainer'>
            <img src={props.value.images[0]?.url} className='detailsImage' alt={props.value.name}></img>
            <h1>{props.value.name}</h1>
            <h2>{props.value.type}</h2>
            <div>
                {props.value.artists.map((val, key) => {
                    return <p>{val.name}</p>
                })}
            </div>
            <div>
            </div>
        </div>
    )
}
export default AlbumDetails;