import { useState } from "react";

const Upload = () => {
    const [inputDetails, setInputDetails] = useState('');

    const handleChange = (event) => setInputDetails(event.target.value);
    const addItem = () => {
        console.log(inputDetails);
        
    }


    return (
        <div>
            <h1>Add to your Wishlist</h1>
            <input onChange={handleChange}></input>
            <button onClick={addItem}>Add</button>
        </div>
    )
}
 export default Upload;